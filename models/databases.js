var mongoose = require('mongoose');
var settings = require('../settings');
var usersSchema = require('./schema_users');
var productsSchema = require('./schema_products');

mongoose.connect('mongodb://' +
					settings.mongodb.host +
					'/' +
					settings.mongodb.db_name);

var users = mongoose.model('users', usersSchema);

module.exports = {
	users: users,
}
