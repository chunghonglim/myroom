var http = require('http');
var fs = require('fs');
var webSocket = require('socket.io');





var server = http.createServer(function(req,res){
    var html = fs.readFileSync('./index.html');
    res.end(html);
});

server.listen('3000');

var io = webSocket(server);

var user = 0;

io.on('connection',function(client){
    user ++;
    console.log('当前人数'+user)
    client.on('disconnect',function(){
        user --;
        console.log('当前人数'+user)
    })

    client.on('message',function(mes){
        io.emit('message',mes);
    });
})