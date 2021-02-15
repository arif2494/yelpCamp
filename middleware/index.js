var Campground = require('../models/campground');
var Comment = require('../models/comment');
//*All the middle are goes here.....
var middlewareObj = {};

//?CHECK CAMPGROUND OWNERSHIP
middlewareObj.checkCampgroundOwnership = function(req, res, next) {
	//?IS USER LOGGED IN?
	if (req.isAuthenticated()) {
		Campground.findById(req.params.id, function(err, foundCampground) {
			if (err) {
				req.flash('error', 'Campground not found!');
				res.redirect('back');
			} else {
				//?Does user own the campground?
				//`(foundCampground.author.id) is an object and (req.user._id) is a string thats why can't use (===)
				if (foundCampground.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash('error', "You don't have permission to do that!");
					res.redirect('back');
				}
			}
		});
	} else {
		req.flash('error', 'You need to be logged in to do that!');
		res.redirect('back');
	}
};

//?CHECK COMMENT OWNERSHIP
middlewareObj.checkCommentOwnership = function(req, res, next) {
	//?IS USER LOGGED IN?
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function(err, foundComment) {
			if (err) {
				res.redirect('back');
			} else {
				//?Does user own the comment?
				//`(foundComment.author.id) is an object and (req.user._id) is a string thats why can't use (===)
				if (foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash('error', "You don't have permission to do that!");
					res.redirect('back');
				}
			}
		});
	} else {
		req.flash('error', 'You need to be logged in to do that!');
		res.redirect('back');
	}
};

//?Log out logic to use anywhere
middlewareObj.isLoggedIn = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash('error', 'You need to be logged in to do that!');
	res.redirect('/login');
};

module.exports = middlewareObj;
