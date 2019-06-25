const express = require('express');
const app = express();
const defaultRoutes = express.Router();

let User = require('../models/User');

defaultRoutes.route('/').get(function(req, res) {
	res.render('index', { title: 'Home', message: 'A Vulnerable Node & Mongo App' })
});

defaultRoutes.route('/reset').get(function(req, res) {
	User.deleteMany({}, function (err) {});
	users = [
		{
			username: "admin",
			password: "2TR6uTRAuMUr5vARs9fYgdqY",
			first_name: "",
			last_name: "",
			role: "admin",
			email: "admin@nullsweep.com"
		},
		{
			username: "guest",
			password: "password",
			first_name: "",
			last_name: "",
			role: "guest",
			email: "guest@nullsweep.com"
		},
		{
			username: "ghost",
			password: "abc123",
			first_name: "Scary",
			last_name: "Ghost",
			role: "user",
			email: "ghost@mailinator.com"
		},
		{
			username: "jsmith",
			password: "SuPeRsEcR3T",
			first_name: "John",
			last_name: "Smoth",
			role: "user",
			email: "jsmith@gmail.com"
		},
		{
			username: "angryPrism58736",
			password: "L1g7tM3Up!",
			first_name: "Gary",
			last_name: "Jorgen",
			role: "user",
			email: "prismman@yahoo.com"
		}
	];
	console.log(users[0]);

	for (var i=0; i < users.length; i++) {

		user = new User(users[i]);
		user.save()
			.then(item => {
				console.log("added user " + u.username)
			})
			.catch(err => {
				console.log("Error adding user " + u.username)
			});
	}

	res.render('reset', { title: 'Reset DB', message: 'Added ' + users.length + ' users.' })
});

module.exports = defaultRoutes;