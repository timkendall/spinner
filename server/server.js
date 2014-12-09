var http = require('http'),
  connect = require('connect'),
  serveStatic = require('serve-static');

/*
 * Setup simple static file server
 */
var app = connect();

app.use(serveStatic(__dirname));


/*
 * Setup socket.io server
 */
var server = http.createServer(app).listen(3000); // get http.Server instance
var io = require('socket.io')(server);

io.on('connection', function (socket) {
  socket.emit('test', { hello: 'world' });

  var socket = socket;
  socket.on('accel data', function (data) {
     // console.log(data);
     socket.broadcast.emit('accel data', data);
  });
});
