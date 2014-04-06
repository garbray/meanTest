var express = require('express'),
		stylus = require('stylus'),
		mongoose = require('mongoose');


console.log(process.env);

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path) {
	return stylus(str).set('filename', path);
}

app.configure(function() {
	//configuration for views 
	app.set('views', __dirname+'/server/views');
	app.set('view engine', 'jade');
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(stylus.middleware({
		src: __dirname+'/public',
		compile: compile
	}));

	app.use(express.static(__dirname+'/public'));

});

if(env === 'development') {
	mongoose.connect('mongodb://localhost/meanTest');
} else {
	mongoose.connect('mongodb://garbray:meantest@oceanic.mongohq.com:10016/meanTest');
}

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error.... '));

db.once('open',function () {
	console.log('meanTest db opened');
});

var messageSchema = mongoose.Schema({
	message: String
});

var Message = mongoose.model('Message', messageSchema);

Message.findOne().exec(function(err, messageDoc) {
	mongoMessage = messageDoc.message;
});

console.log(__dirname);
app.get('/partials/:partialPath', function(request, response) {
	response.render('partials/'+ request.params.partialPath);
});

app.get('*', function(request, response) {
	response.render('index', {
		mongoMessage: mongoMessage
	});
});

var port = process.env.PORT || 3030;

app.listen(port);

console.log('server listen on port '+port+' ...');