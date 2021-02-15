var express = require('express');
var router = express.Router({ mergeParams: true });
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require('../middleware');

//*COmments form Route
//?Comment GET Route
router.get('/new', middleware.isLoggedIn, function(req, res) {
	//`find campground by id
	Campground.findById(req.params.id, function(err, campground) {
		if (err) {
			console.log(err);
		} else {
			res.render('comments/new', { campground: campground });
		}
	});
});

//*POST a comment Through this route
//?Comment POST Route
router.post('/', middleware.isLoggedIn, function(req, res) {
	//`Lookup campground using ID
	Campground.findById(req.params.id, function(err, campground) {
		if (err) {
			console.log(err);
			res.redirect('/campgrounds');
		} else {
			//`create new comment
			Comment.create(req.body.comment, function(err, comment) {
				if (err) {
					req.flash('error', 'Something went wrong!');
					console.log(err);
				} else {
					//`add username & id to the comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//`Save commanet
					comment.save();
					//`Connect new comment to campground
					campground.comments.push(comment);
					campground.save();
					// console.log(comment);
					//`redirect campground Show
					req.flash('success', 'Successfully created the comment...');
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
});

//*Comment Edit
router.get('/:comment_id/edit', middleware.checkCommentOwnership, function(req, res) {
	Comment.findById(req.params.comment_id, function(err, foundComment) {
		if (err) {
			req.flash('error', 'Something went wrong!');
			res.redirect('back');
		} else {
			res.render('comments/edit', { campground_id: req.params.id, comment: foundComment });
		}
	});
});

//*Comment UPDATE!
router.put('/:comment_id', middleware.checkCommentOwnership, function(req, res) {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
		if (err) {
			req.flash('error', 'Something went wrong!');
			res.redirect('back');
		} else {
			req.flash('success', 'Successfully updated the comment...');
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});

//*Comment DElete Route
router.delete('/:comment_id', middleware.checkCommentOwnership, function(req, res) {
	Comment.findByIdAndDelete(req.params.comment_id, function(err) {
		if (err) {
			req.flash('error', 'Something went wrong!');
			res.redirect('back');
		} else {
			req.flash('success', 'Successfully deleted the comment...');
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});

module.exports = router;
