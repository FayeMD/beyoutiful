var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var nicknames = [];
var bodyparser = require('body-parser');
var pg = require('pg');
var session = require('express-session');
var swig = require('swig');
var sess;
app.use(session({secret: 'sshhhh'}));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views/');

var conString = "postgres://postgres:McLearn87@localhost/beyoutiful";
	
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.get('/signin.html', function(req, res){
	res.sendFile(__dirname + '/signin.html');
});

var urlparser = bodyparser.urlencoded({extended: false});
app.post('/register', urlparser, function(req, res) {
	var client = new pg.Client(conString);
	client.connect(function(err) {
	  if(err) {
	    return console.error('could not connect to postgres', err);
	  }
	  client.query('INSERT INTO users(username, birthdate, firstname, lastname, email, password) VALUES($1, $2, $3, $4, $5, $6)', [req.body.username, req.body.bday, req.body.firstname, req.body.lastname, req.body.email, req.body.password], function(err, result) {
	    if(err) {
	      return console.error('error running query', err);
	    }
	    sess = req.session;
	    console.log(sess);
	    sess.email = req.body.email;
	    sess.password = req.body.password;


	    res.sendFile(__dirname + '/profile.html');

	    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
	    client.end();
	  });
	});
});



app.get('/newacct.html', function(req, res){
	sess = req.session;
	if (sess != undefined) {
		if (sess.email != undefined && sess.password != undefined) {

			//verify that the user is correct by confirming their login
			//information.  (select the user from database based off of their login info)

			//res.sendFile(__dirname + '/profile.html');
			res.render(__dirname + '/views/profile.html', {
				name: sess.email
			});
			//res.render('profile.html', tData);
		}
		else {
			res.sendFile(__dirname + '/newacct.html');
		}
	}
	else {
		res.sendFile(__dirname + '/newacct.html');
	}
	
});

app.get('/describe.html', function(req, res){
	res.sendFile(__dirname + '/describe.html');
});

app.get('/fans.html', function(req, res){
	res.sendFile(__dirname + '/fans.html');
});

app.get('/faves.html', function(req, res){
	res.sendFile(__dirname + '/faves.html');
});

app.get('/feeling.html', function(req, res){
	res.sendFile(__dirname + '/feeling.html');
});

app.get('/feelings.html', function(req, res){
	res.sendFile(__dirname + '/feelings.html');
});

app.get('/newsfeed.html', function(req, res){
	res.sendFile(__dirname + '/newsfeed.html');
});

app.get('/profile.html', function(req, res){
	res.sendFile(__dirname + '/profile.html');
});

app.get('/search.html', function(req, res){
	res.sendFile(__dirname + '/search.html');
});

app.get('/signin.html', function(req, res){
	res.sendFile(__dirname + '/signin.html');
});



app.use("/css/", express.static(__dirname + '/css/'));




//app.use("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css");
//app.use("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap-theme.min.css");


/*
io.on('connection', function(socket){
	socket.on('new user', function(data, callback){
		if (nicknames.indexOf(data) != -1){
			callback(false);
		} else{
			callback(true);
			socket.nickname = data;
			nicknames.push(socket.nickname);
			updateNicknames();
		}
	});

	function updateNicknames(){
		io.sockets.emit('usernames', nicknames);
	}

	client.get('app name', function(err, reply){
		console.log('app name is', reply);
	});
	client.hgetall('history', function(err, replies) {
		console.log('history', replies);
		socket.emit('history', replies);
	});

	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
	socket.on('chat message', function(msg){ //listening for event
		console.log('message: ' + msg);
		io.emit('chat message', {msg: msg, nick: socket.nickname});
		client.incr('msg_id', function(err, msg_id) {
			console.log('msg_id', msg_id);
			client.hset('history', msg_id,('<span>' + socket.nickname + ': </span>'+ msg));
		});
		//client.hset("history", "hashtest 1", "some value")
		client.set('last message', msg);
	});

	socket.on('disconnect', function(data){
		if(!socket.nickname) return;
		nicknames.splice(nicknames.indexOf(socket.nickname), 1);
		updateNicknames();
	});
});
*/

http.listen(3000, function(){
	console.log('listening on *:3000');
});


