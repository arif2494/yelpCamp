var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

//*ROOT ROUTE
router.get('/', function(req, res) {
	res.render('landing');
});

//?==============
//*Auth Routes
//?==============

//?Register route
router.get('/register', function(req, res) {
	res.render('register');
});

//?Signup Logic
router.post('/register', function(req, res) {
	var newUser = new User({ username: req.body.username });
	User.register(newUser, req.body.password, function(err, user) {
		if (err) {
			req.flash('error', err.message);
			res.redirect('back');
		} else {
			passport.authenticate('local')(req, res, function() {
				req.flash('success', 'Welcome to YelpCamp ' + user.username);
				res.redirect('/campgrounds');
			});
		}
	});
});

//?Log in Route
router.get('/login', function(req, res) {
	res.render('login');
});

//?Login Logic
router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/campgrounds',
		failureRedirect: '/login'
	}),
	function(req, res) {}
);

//?Log Out Route
router.get('/logout', function(req, res) {
	req.logOut();
	req.flash('success', 'Logged you out!');
	res.redirect('/campgrounds');
});

module.exports = router;
