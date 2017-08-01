


var app = require('../app');
var http = require('http');
var loadData = require('./loadData');
const commonUtility = require('../utility/common-utility');
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

    socket.on('average response time', function(message) {
        console.log("message received : " + message);
        loadData.searchData(socket);
    });

    socket.on('metrics', function(messageData){
        const requestData = getTimeSeriesRequestData(messageData);
        loadData.retrieveTimeSeriesMetricData(socket, requestData);
    });


});


function getTimeSeriesRequestData(messageData) {

    //const startDate = new Date();
    const startDate = 1499699490526;
    const requestData = {
        searchQuery : commonUtility.getSearchQuery(messageData.application, messageData.path),
        filterQuery : commonUtility.getFilterQuery({
            "criteria1" : {
                "range": {
                    "timestamp": {
                        "lte" : messageData.startDate
                    }
                }
            }
        }),
        startDate : startDate,
        channelName : messageData.channelName
    }
    return requestData;
}

// send path as an array - reversed from what you are capturing



module.exports.server = server;