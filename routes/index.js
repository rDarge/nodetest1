var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
  res.render('helloworld', { title: 'Hello, World!' });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({},{},function(e,docs) {
		res.render('userlist', {
			"userlist" : docs
		});
	});
});

/* GET New User page. */
router.get('/newuser', function(req,res) {
	res.render('newuser', {title: 'Add New User'});
});

/* POST to Add User Service */
router.post('/adduser', function(req,res) {
	//set our db
	var db = req.db;

	//get form vals
	var userName = req.body.username;
	var userEmail = req.body.useremail;

	//set collection
	var collection = db.get('usercollection');

	//Submit to db
	collection.insert({
		"username" : userName,
		"email" : userEmail
	}, function (err, doc) {
		if(err) {
			//if it failed, return error
			res.send("There was a problem servicing your request. Please double-check your input, thanks!");		
		} else {
			//if it worked, set the header so the address bar doesn't still say /adduser
			res.location('userlist');
			//and forward to success page
			res.redirect('userlist');
		}
	});
});

module.exports = router;
