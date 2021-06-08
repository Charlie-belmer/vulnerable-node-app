const express = require('express');
const qs = require('querystring');
const app = express();
const userRoutes = express.Router();

let User = require('../models/User');

userRoutes.route('/lookup').get(function(req, res) {
	let username = req.query.username;
	console.log("request " + JSON.stringify(username));
	if (typeof username !== 'undefined' && username != "") {
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
		res.render('userlookup', { title: 'User Lookup', users:[]});
	}	
});

/** Allow a similar query using POST and JSON
  * Similar to above, inject data like
  * {"username":"' || '2'=='2"}

  Sample default CURL request::
	curl -X POST http://localhost:4000/user/lookup -H 'Content-Type: application/json' -d '{"username": "guest"}'
  And Injection (need to escape our injected single quotes for CURL only):
	curl -X POST http://localhost:4000/user/lookup -H 'Content-Type: application/json' -d '{"username": "guest'\'' || '\''2'\''=='\''2"}'
  */
userRoutes.route('/lookup').post(function(req, res) {
	let username = req.body.username;
	console.log("request " + JSON.stringify(username));
	if (typeof username !== 'undefined') {
		query = { $where: `this.username == '${username}'` }
		console.log("Mongo query: " + JSON.stringify(query));
		User.find(query, function (err, users) {
			if (err) {
				console.log(err);
				res.json(err);
			} else {
				console.log("Data Retrieved: " + users);
				res.json({users});
			}
		});
	}
	else {
		res.json({});
	}	
});

userRoutes.route('/lookup2').get(function(req, res) {
	res.render('userlookup2', { title: 'User Lookup 2'});
});

userRoutes.route('/lookup2').post(function(req, res) {
	let query = req.body;
	let username = req.body.username;
	//let query = 
	console.log("request " + JSON.stringify(query));

		console.log("Mongo query: " + JSON.stringify(query));
		User.find(query, function (err, users) {
			if (err) {
				console.log(err);
				res.json(err);
			} else {
				console.log("Data Retrieved: " + users);
				res.render('userlookup2', { title: 'User Lookup 2', users: users });
			}
		});

});

userRoutes.route('/lookup3').get(function(req, res) {
	res.render('userlookup3', { title: 'User Lookup 3'});
});

userRoutes.route('/lookup3').post(function(req, res) {
	//let query = req.body;
	let usernameData = req.body.username;
	let query = `{"username": "${usernameData}"}`
	query = JSON.parse(query)
	console.log("request " + JSON.stringify(query));
	query = {username: query.username}
	console.log("request " + JSON.stringify(query));

		console.log("Mongo query: " + JSON.stringify(query));
		User.find(query, function (err, users) {
			if (err) {
				console.log(err);
				res.json(err);
			} else {
				console.log("Data Retrieved: " + users);
				res.render('userlookup2', { title: 'User Lookup 2', users: users });
			}
		});

});

userRoutes.route('/login').get(function(req, res) {
	res.render('userlogin', { title: 'User Login', role: "None"});
});

/*
* This is injectable since we are passing json.
* The following payload will log you in as the specified user
* {"username":"admin","password":{"$ne": 1}}
*
* You can iterate through users using something like:
* {"username":{"$gt": "h"},"password":{"$ne": 1}}
* 
* Submitting this probably requires a proxy (or browser interception), since by default
* the form password value will become a string, but an object needs to be passed.
*/
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
			if (user.length >= 1) {
				var msg = "Logged in as user " + user[0].username + " with role " + user[0].role;
				res.json({role: user[0].role, username: user[0].username, msg: msg });
			}
			else
				res.json({role: "invalid", msg: "Invalid username or password."});
		}
	});
	
});


module.exports = userRoutes;
