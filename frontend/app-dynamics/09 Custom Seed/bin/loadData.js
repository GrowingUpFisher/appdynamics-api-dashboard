/**
 * Created by dkandpal on 7/7/17.
 */
const dataLocation  = "/Users/dkandpal/Code/Repo/backup23/09\ Custom\ Seed/bin/data.csv";
const elasticsearch = require('elasticsearch');
const activeChannels = [];
var esClient = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});
var socketConnection;

setInterval(function() {
    sendMessageToChannels();
}, 10000);

    var countr = 0;
    var startDate = 1499699490526;
    var incrBy = 60000;
    var counter = 10;
    var counterNew = 1;

exports.searchData = function(socket) {


    console.log('Searching data');
    const application = 'aaqx_prd_POD24';//params.application;
    const pl1 = "Overall Application Performance";
    const pl2 = "Average Response Time";
    //const currentTime = Date.now();
    //const endTime = currentTime - (8 * 60 * 60 * 1000);
    const endDate = startDate - (8 * 60 * 60 * 1000);

    esClient.search({
        index: 'apm-original',
       // q : 'application:' + application,
        body : {
            "query": {
                "bool": {
                    "must": [
                        { "match": { "application": application} },
                        { "match": { "pl1": pl1} },
                        { "match": { "pl2": pl2} }
                    ],
                    "filter": [
                        { "range": { "timestamp": {"lte" : startDate}}}
                    ]
                }
            },
            "sort" : [{"timestamp" : "asc"}],
            "size" : "8"
        },
        _source : ["timestamp", "value"]
    }, function(error, response) {
        if(error) {
            console.error("Error occured while retrieving result : " + error);
        }
        if(response) {
            const totalHits = response.hits.hits.map(function(el) { return el._source});

            socket.emit('average response time reply', totalHits);

            setInterval(function() {
                timer(socket);
            }, 10000);
        }
    });

}




exports.retrieveMetricData = function(socket, requestData) {
    if(typeof  socketConnection === 'undefined') {
        console.log('Defining Socket Now!');
        socketConnection = socket;
    } else {
        console.log('Socket already defined!');
    }

    const searchQuery = requestData.searchQuery;
    const filterQuery = requestData.filterQuery;
    const channelName = requestData.channelName;
    const startDate = requestData.startDate;

    esClient.search({
        index: 'apm-original',
        body : {
            "query": {
                "bool": {
                    "must": searchQuery,
                    "filter": filterQuery
                }
            },
            "sort" : [{"timestamp" : "asc"}],
            "size" : "8"
        },
        _source : ["timestamp", "value"]
    }, function(error, response) {
        if(error) {
            console.error("Error occured while retrieving result : " + error);
        }
        if(response) {
            const totalHits = response.hits.hits.map(function(el) { return el._source});
            saveChannel(channelName, searchQuery, startDate);
            const responseObj = {
                channelName : channelName,
                data : totalHits
            }
            socket.emit('data', responseObj);

        }
    });

}

function queryElasticSearch(searchQuery, filterQuery) {
    return esClient.search({
        index: 'apm-original',
        body : {
            "query": {
                "bool": {
                    "must": searchQuery,
                    "filter": filterQuery
                }
            },
            "sort" : [{"timestamp" : "asc"}],
            "size" : "8"
        },
        _source : ["timestamp", "value"]
    });
}

// channel name is whole path
function sendMessageToChannels() {
    for(var i=0; i< activeChannels.length; i++) {
        const currentChannelObj = activeChannels[i];
        queryElasticSearch(currentChannelObj.searchQuery, currentChannelObj.filterQuery).then(function(response) {
            const totalHits = response.hits.hits.map(function(el) { return el._source});
            const responseObj = {
                channelName : currentChannelObj.channelName,
                // data : totalHits
                data : [{timestamp : 1499613990526 + (counterNew * 60000) , value : 100 + Math.floor(Math.random() * 1500)}]
            }
            counterNew++;
            socketConnection.emit('data', responseObj);
            console.log('Pushing data!!');
        }, function(err) {
            console.error("!!! Error Retrieving consecutive socket data form ES : " + err);
        });

    }
}






function saveChannel(channelName, searchQuery, startDate) {
    const newChannelObj = {
        channelName : channelName,
        searchQuery : searchQuery,
        filterQuery : [
            { "range": { "timestamp": {"gt" : startDate}}}
        ]
    }
    activeChannels.push(newChannelObj);
}



function timer(socket) {
    var out = [];
    var obj = {timestamp : 1499613990526 + (counterNew * 60000) , value : 100 + Math.floor(Math.random() * 1500)}
    counterNew++;
    out.push(obj);
    socket.emit('average response time reply', out);
}

function loadData() {

        const fs = require('fs');
        const csv = require('fast-csv');
        var stream = fs.createReadStream(dataLocation);
        var csvStream = csv().on('data', function(data) {
            storeData(data);
        }).on("end", function() {
            console.log("End of file !!!");
        });
        stream.pipe(csvStream);


}


function storeData(data) {

        counter++;
        const timestamp = startDate - (countr * incrBy);
        countr = countr + 1;
        const metricValue = 100 + Math.floor(Math.random() * 500);

        esClient.index({
            index: 'apm-original',
            type: 'appd',
           // id: counter,
            body: {
                "application" : "aaqx_prd_POD24",
                "pl1" : "Overall Application Performance",
                "pl2" : "Average Response Time",
                "pl3" : "",
                "pl4" : "",
                "pl5" : "",
                "pl6" : "",
                "pl7" : "",
                "pl8" : "",
                "timestamp" : timestamp,
                "value" : Number(metricValue)
            }
        }, function (error, response) {
            if(error)
                console.error("Failed to insert" + error);
            else
                console.log("Inserted successfully" + response);

        });

}
//module.exports = searchData;