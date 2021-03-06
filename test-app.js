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