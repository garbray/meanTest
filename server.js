var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

app.configure(function() {
	//configuration for views 
	app.set('views', __dirname+'/server/views');
	app.set('view engine', 'jade');

	app.use(express.static(__dirname+'public'));

});


app.get('*', function(request, response) {
	response.render('index');
});


var port = 3030;

app.listen(port);

console.log('server listen on port'+port+'...');