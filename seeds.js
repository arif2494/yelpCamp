var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
	{
		name: 'Sajek Valley',
		image: 'https://source.unsplash.com/y8Ngwq34_Ak/1080x720',
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name: 'Coxs Bazar',
		image: 'https://source.unsplash.com/re2LZOB2XvY/1080x720',
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name: 'Himchori',
		image: 'https://source.unsplash.com/qelGaL2OLyE/1080x720',
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	}
];

function seedDB() {
	//*Remove all camoground
	Campground.deleteMany({}, function(err) {
		// if (err) {
		// 	console.log(err);
		// } else {
		// 	console.log('removed campround');
		// 	//*add a few campgrounds
		// 	data.forEach(function(seed) {
		// 		Campground.create(seed, function(err, campground) {
		// 			if (err) {
		// 				console.log(err);
		// 			} else {
		// 				console.log('added a campground');
		// 				//*Create a comment
		// 				Comment.create(
		// 					{
		// 						text: 'This place is great, But I wish there was internet',
		// 						author: 'Nayeem'
		// 					},
		// 					function(err, comment) {
		// 						if (err) {
		// 							console.log(err);
		// 						} else {
		// 							campground.comments.push(comment);
		// 							campground.save();
		// 							console.log('Created new comment');
		// 						}
		// 					}
		// 				);
		// 			}
		// 		});
		// 	});
		// }
	});

	//*add a few comments
}
module.exports = seedDB;
