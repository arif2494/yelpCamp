var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require('../middleware');

//*INDEX - This shows all cmapgrounds
router.get('/', function(req, res) {
	// console.log(req.user);
	//`geather all campground data from db
	Campground.find({}, function(err, allCampgrounds) {
		if (err) {
			console.log(err);
			console.log('Something went wrong');
		} else {
			res.render('campgrounds/campgrounds', { campgrounds: allCampgrounds });
		}
	});
});

//*New - Show a form to create new campground
router.get('/new', middleware.isLoggedIn, function(req, res) {
	res.render('campgrounds/new');
});

//*CREATE - Add newcampground to database
router.post('/', middleware.isLoggedIn, function(req, res) {
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCampground = { name: name, price: price, image: image, description: desc, author: author };

	//?Create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated) {
		if (err) {
			req.flash('error', "Can't create the campground");
			res.redirect('/campgrounds');
		} else {
			req.flash('success', 'Created the new campground...');
			res.redirect('/campgrounds');
		}
	});
});

//?*SHOW - (Show routes)Show more info in single campground
router.get('/:id', function(req, res) {
	//?Find the campground with provided ID
	Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			res.render('campgrounds/show', { campground: foundCampground });
		}
	});
});

//*EDIT-Cmapground Route
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res) {
	Campground.findById(req.params.id, function(err, foundCampground) {
		if (err) {
			req.flash('error', 'Something went wrong!');
			res.redirect('/campgrounds');
		} else {
			res.render('campgrounds/edit', { campground: foundCampground });
		}
	});
});

//*UPDATE - Campground Route
router.put('/:id', middleware.checkCampgroundOwnership, function(req, res) {
	//?find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
		if (err) {
			req.flash('error', 'Something went wrong!');
			redirect('/campgrounds');
		} else {
			req.flash('success', 'Successfully updated the campground...');
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
	//?redirect to somewhere(Show page)
});

//*DESTROY CAmpground Route With comment
router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res) {
	Campground.findById(req.params.id, function(err, campground) {
		Comment.remove(
			{
				_id: {
					$in: campground.comments
				}
			},
			function(err) {
				if (err) {
					req.flash('error', "Can't delete the campground");
					res.redirect('/campgrounds');
				} else {
					campground.deleteOne();
					req.flash('success', 'Successfully deleted the campground...');
					res.redirect('/campgrounds');
				}
			}
		);
	});
});

module.exports = router;
