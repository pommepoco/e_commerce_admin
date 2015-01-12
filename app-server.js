var express = require('express');
var	app = express();
var server = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(server);
var settings = require('./settings');
var db = require('./models/databases.js');
var sessionSocket = require('session.socket.io');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var connect = require('connect');

/*
**	SERVER INIT
*/

app.use(express.static(path.join(__dirname, '/public')));


server.listen(settings.express.port);

server.listen(settings.express.port, function(){
	if (settings.debug.info)
		console.log('Express listenning on port ' + settings.express.port);
});

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

/*
**	SOCKETS
*/

io.on('connection', function (socket) {
	socket.isAdmin = false;
	if (settings.debug.isActiv)
		console.log("connection: " + socket.id);
	socket.on('authAtempt', function(info) {
		if (settings.debug.isActiv) {
			console.log('authAtempt:');
			console.log(info);
		}
		if (info === null || !info.login || !info.password)
			return;
		db.users.findOne({
			login: info.login,
			password: info.password,
		})
		.select()
		.exec(function(err, user) {
			if (err) {
				if (settings.debug.isActiv)
					console.log('login fail' + info.login);
				socket.emit('authConf', null);
			}
			else {
				socket.emit('authConf', user);
				socket.isAdmin = true;
				socket.join('admin');
			}
		});
	});

});
