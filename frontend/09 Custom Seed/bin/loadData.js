/**
 * Created by dkandpal on 7/7/17.
 */
const dataLocation  = "/Users/dkandpal/Code/Repo/backup23/09\ Custom\ Seed/bin/data.csv";
const elasticsearch = require('elasticsearch');
var esClient = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});


    var countr = 0;
    var startDate = 1499699490526;
    var incrBy = 60000;
    var counter = 10;

function searchData(socket) {
    console.log('Searching data');
    const application = 'aaqx_prd_POD24';//params.application;
    const pl1 = "Overall Application Performance";
    const pl2 = "Average Response Time";
    //const currentTime = Date.now();
    //const endTime = currentTime - (8 * 60 * 60 * 1000);
    const endDate = startDate - (8 * 60 * 60 * 1000);

    esClient.search({
        index: 'apm-original',
        q : 'application:' + application,
        body : {
            "query": {
                "bool": {
                    "must": [
                        { "match": { "application": application} }
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
var counterNew = 1;
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
module.exports = searchData;