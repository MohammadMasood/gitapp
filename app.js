express = require('express'),
bodyParser = require('body-parser');  
methodOverride = require('method-override'),
errorHandler = require('errorhandler'),
morgan = require('morgan'),
routes = require('./routes'),
api = require('./routes/api'),
http = require('http'),
path = require('path');
mysql = require('mysql');

var sqlInfo={
	host     : '127.0.0.1',
	user     : 'root',
	password : 'password',
	database : 'node_app',	
	};

var app = module.exports = express();
// OR var app = express();
var urlencodedParser = bodyParser.json();
/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));

app.use(methodOverride());
app.use(express.static('public'));
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
  //app.use(express.errorHandler());
  app.use(errorHandler());
}

// production only
if (env === 'production') {
  // TODO
}


/** * Routes * **/

// serve index and view partials
app.get('/', routes.index);
app.get('/pages/:name', routes.pages);
app.get('/pages/:name/:id', routes.pages);


/* GET home page. */
app.get('/home', function(req, res, next) {

	res.render("index", { title:'Home'});
	
});

app.post('/api/userslist',urlencodedParser, api.userslist);
app.post('/api/register',urlencodedParser, api.register);
app.post('/api/userdetail',urlencodedParser, api.userdetail);
app.post('/api/edit_user',urlencodedParser, api.edit_user);
// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});


