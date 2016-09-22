mysql = require('mysql');
var sqlInfo={
	host     : '127.0.0.1',
	user     : 'root',
	password : 'password',
	database : 'node_app',	
	};
/*
 * Serve JSON to our AngularJS client
 */

exports.name = function (req, res) {
  res.json({
    name: 'Node.js'
  });
};

exports.userslist = function (req, res) { 
 
  var connection = mysql.createConnection(sqlInfo);
  connection.connect(function(err) {
	if (err) {		
	 console.error('error connecting: ' + err.stack);
	 return;
	}
	
		connection.query('SELECT * from users', function(err, rows, fields) {
		if (err) throw err;
		//console.log('The solution is: ', rows);
		res.json({"msg":"Success",rows:rows});
		//res.end('Hello');
		});
		connection.end();
	
	});
  
};

exports.register = function (req, res) {
  var User=req.body;
  var connection = mysql.createConnection(sqlInfo);
  connection.connect(function(err) {
	if (err) {		
	 console.error('error connecting: ' + err.stack);
	 return;
	}
	
	connection.query('INSERT INTO users(name,email,password,mobile_no,address) VALUE(?,?,?,?,?)',
		[User.name,User.email,User.password,User.mobile_no,User.address], 
		function(err, resp) {
		if (err) throw err;
		
			connection.end();	
			console.log(resp);
			res.json({"success":true});
			//res.render('index');
		 
		});
	
	}); 
 //res.json({"User":req.body});
};

exports.userdetail = function (req, res) { 
  //console.log(req.body);
  var id =req.body.id;
  var connection = mysql.createConnection(sqlInfo);
  connection.connect(function(err) {
	if (err) {		
	 console.error('error connecting: ' + err.stack);
	 return;
	}
	
		connection.query('SELECT * from users where id ='+id+' limit 1 ', function(err, rows, fields) {
		if (err) throw err;
		//console.log('The solution is: ', rows);
		res.json({"success":true,rows:rows[0]});
		//res.end('Hello');
		});
		connection.end();
	
	});  
};

exports.edit_user = function (req, res) {
  var User=req.body;
  var connection = mysql.createConnection(sqlInfo);
  connection.connect(function(err) {
	if (err) {		
	 console.error('error connecting: ' + err.stack);
	 return;
	}
		
	connection.query('UPDATE users SET name = ?, email = ?, mobile_no = ?, address = ? WHERE id = ?', [User.name,User.email,User.mobile_no,User.address,User.id],		
		function(err, resp) {
		if (err) throw err;
		
			connection.end();	
			console.log(resp);
			res.json({"success":true});
			//res.render('index');
		 
		});
	
	}); 
 //res.json({"User":req.body});
};
