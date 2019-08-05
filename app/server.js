
const express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	mongoose = require('mongoose'),
	config = require('./db');

const userRoute = require('./routes/user.route');
const defaultRoute = require('./routes/default.route');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true}).then(
	() => {console.log('Database is connected')},
	err => {console.log('DB error: ' + err)}
);

const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static('static'));
app.set('view engine', 'pug')

var whitelist = ['http://localhost:4200', 'http://localhost:4000', 'http://node-backend:4000', 'http://angular-frontend:4200']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));
app.use('/user', userRoute);
app.use('/', defaultRoute);

let port = process.env.PORT || 4000;

const server = app.listen(port, function() {
	console.log('Listening on port ' + port);
});