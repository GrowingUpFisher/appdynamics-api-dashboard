


var app = require('../app');
var http = require('http');
var loadData = require('./loadData');
//searchData();


/**
 * Create Http Server.
 */
var server = http.createServer(app);

/**
 * Create WebSocket.
 */
var socketIO = require('socket.io').listen(server);

socketIO.serveClient(true);

socketIO.on('connection', function(socket)  {


    socket.on('message', function(message) {

        socket.emit('reply', 'Hello Back first time!');
        var i = 0;
        setInterval(function() {

            socket.emit('reply', 'Hi ' + i);
            i++;
        }, 5000);

    });

    socket.on('average response time', function(message) {
        console.log("message received : " + message);
        loadData.searchData(socket);
        //searchData(socket);
        //console.log('result : ' + result);
        //socket.emit('average response time reply', result);
        // console.log('Emitted result!');
    });

    socket.on('metrics', function(messageData){
        const requestData = getRequestData(messageData);
        loadData.retrieveMetricData(socket, requestData);
    });


});

function getRequestData(messageData) {

    //const startDate = new Date();
    const startDate = 1499699490526;
    const requestData = {
        searchQuery : getSearchQuery(messageData.application, messageData.path),
        filterQuery : getFilterQuery(startDate),
        startDate : startDate,
        channelName : messageData.channelName
    }
    return requestData;
}

// send path as an array - reversed from what you are capturing
function getSearchQuery(application, path) {
    const queries = [];
    queries.push(
    { "match": { "application": application} }
    );
    for(var i=0; i< path.length; i++) {
        const outerObj = {};
        const innerObj = {};
        innerObj["pl" + (i+1)] = path[i];
        outerObj["match"] = innerObj;
        queries.push(outerObj);

    }
    return queries;

}

function getFilterQuery(startDate) {
    const filterQuery = [];
    filterQuery.push( { "range": { "timestamp": {"lte" : startDate}}});
    return filterQuery;
}
module.exports.server = server;