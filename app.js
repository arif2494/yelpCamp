var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var expressSession = require('express-session');
var methodOverride = require('method-override');
//*Requaring Models
var Comment = require('./models/comment');
var Campground = require('./models/campground');
var User = require('./models/user');
var seedDB = require('./seeds');
//*Requaring Routes
var commentRoutes = require('./routes/comments');
var campgroundRoutes = require('./routes/campgrounds');
var indexRoutes = require('./routes/index');

//*connect mongoose to the database
mongoose.connect('mongodb://localhost:27017/yelp_camp', {
	//?for decrypted warning
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());
//*execute the seed function
// seedDB();

//*passport configaration
app.use(
	expressSession({
		secret: 'Have faith on Allah',
		resave: false,
		saveUninitialized: false
	})
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//*navbar log in or logout button for all page
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});
//*routes form separated file
app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

//*servers
app.listen(700, function() {
	console.log('-----YelpCamp server started at 700-----');
});
