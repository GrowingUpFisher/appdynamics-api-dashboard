


var app = require('../app');
var http = require('http');
var searchData = require('./loadData');
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
        searchData(socket);
        //console.log('result : ' + result);
        //socket.emit('average response time reply', result);
        // console.log('Emitted result!');
    });

});

module.exports.server = server;