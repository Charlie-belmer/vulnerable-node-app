# vulnerable-nodejs-app

A purposely vulnerable NodeJS and MongoDB application

Multiple ways to do NoSQL Injection on Mongo. More to be added.

## Starting the app


### Using Docker
Docker is the simplest way to get the app running. Just run the following

```bash
docker-compose build
docker-compose up
```

navigate to http://localhost:4000

### Running manually

You'll need to install and run a local Mongo instance. On Ubuntu, it's as simple as apt install mongodb. Once running, you may have to specify the db path, or update the config.

```bash
$ sudo mongod --dbpath /var/lib/mongodb
```

Add environment variables MONGO_PORT and MONGO_HOST if not running on localhost and default port. Once mongo is running successfully, start nodemon

```bash
cd app; nodemon server
```

Navigate to http://localhost:4000

### Load data
Click on the populate / reset data link on the homepage to load in some users.

## Good learning links
https://blog.websecurify.com/2014/08/hacking-nodejs-and-mongodb.html
https://scotch.io/@401/mongodb-injection-in-nodejs
https://isc.sans.edu/forums/diary/Attacking+NoSQL+applications/21787/