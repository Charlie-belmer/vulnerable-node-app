const express = require('express');
const qs = require('querystring');
const app = express();
const userRoutes = express.Router();

let User = require('../models/User');

userRoutes.route('/lookup').get(function(req, res) {
	let username = req.query.username;
	console.log("request " + JSON.stringify(username));
	if (typeof username !== 'undefined') {
		query = { $where: `this.username == '${username}'` }
		//Simple injection: pass in "' || '2'=='2" (without double quotes)
		// This will return all records
		//
		// JS injection is also possible here, because the where clause evaluates a JS expression
		console.log("Mongo query: " + JSON.stringify(query));
		User.find(query, function (err, users) {
			if (err) {
				console.log(err);
				res.json(err);
			} else {
				console.log("Data Retrieved: " + users);
				res.render('userlookup', { title: 'User Lookup', users: users });
			}
		});
	}
	else {
		res.render('userlookup', { title: 'User Lookup'});
	}	
});

userRoutes.route('/login').get(function(req, res) {
	res.render('userlogin', { title: 'User Login', role: "None"});
});

userRoutes.route('/login').post(function(req, res) {
	let uname = req.body.username;
	let pass = req.body.password;
	console.log("Login request " + JSON.stringify(req.body));
	let query = { 
		username: uname,
		password: pass 
	}

	console.log("Mongo query: " + JSON.stringify(query));
	User.find(query, function (err, user) {
		if (err) {
			console.log(err);
			res.json(err);
		} else {
			console.log(user);
			console.log(user.role);
			if (user.length >= 1)
				res.render('userlogin', { title: 'User Login', role: user[0].role, username: user[0].username});
			else
				res.render('userlogin', { title: 'User Login', role: "invalid"});
		}
	});
	
});


module.exports = userRoutes;