const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const { populate } = require('../models/Post');
const Post = require('../models/Post');

router.get('/allpost', auth, async (req, res) => {
	try {
		let posts = await Post.find()
			.populate('postedBy', '_id name')
			.populate('comments.postedBy', '_id name');

		if (!posts) {
			return res.status(400).json({ error: 'No post' });
		}

		console.log('Post view');
		res.json(posts);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});


// @route      GET api/post
// @desc       Post Post
// @access     Private
router.get('/getmyfollowingpost', auth, async (req, res) => {
	try {
		// To get the post of all the users am following
		let posts = await Post.find({postedBy: {$in:req.user.following}})
			.populate('postedBy', '_id name')
			.populate('comments.postedBy', '_id name');

		if (!posts) {
			return res.status(400).json({ error: 'No post' });
		}

		console.log('Post view');
		res.json(posts);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

router.get('/mypost', auth, async (req, res) => {
	try {
		let myPost = await Post.find({ postedBy: req.user.id }).populate(
			'postedBy',
			'_id name'
		);

		if (!myPost) {
			return res.status(400).json({ error: 'No Post' });
		}

		console.log(req.user + ' Viewed her post');

		res.json(myPost);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

router.post('/createpost', auth, async (req, res) => {
	const { title, body, pic } = req.body;
	console.log(title, body, pic);
	if (!title || !body || !pic) {
		return res.status(400).json({ error: 'Please add all the fields' });
	}

	//console.log('The user details are ' + req.user);
	// res.send('Ok');

	// Not to include the password
	req.user.password = undefined;

	try {
		const newPost = new Post({
			title,
			body,
			photo: pic,
			postedBy: req.user,
		});

		const post = await newPost.save();
		console.log('New Post have been created by ' + req.user);

		res.json(post);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route      PUT api/post
// @desc       Post Likes
// @access     Private
router.put('/like', auth, (req, res) => {
	Post.findByIdAndUpdate(
		req.body.postId,
		{
			$push: { likes: req.user.id },
		},
		{
			useFindAndModify: false,
			new: true,
		}
	)
		.populate('postedBy', '_id name')
		.populate('comments.postedBy', '_id name')
		.exec((err, result) => {
			if (err) {
				return res.status(422).json({ error: err });
			} else {
				res.json(result);
			}
		});
});

// @route      PUT api/post
// @desc       Post Likes
// @access     Private
router.put('/unlike', auth, (req, res) => {
	Post.findByIdAndUpdate(
		req.body.postId,
		{
			$pull: { likes: req.user.id },
		},
		{
			useFindAndModify: false,
			new: true,
		}
	)
		.populate('postedBy', '_id name')
		.populate('comments.postedBy', '_id name')
		.exec((err, result) => {
			if (err) {
				return res.status(422).json({ error: err });
			} else {
				res.json(result);
			}
		});
});

// @route      PUT api/post
// @desc       Make a Comment on a post
// @access     Private
router.put('/comment', auth, (req, res) => {
	const comment = {
		text: req.body.text,
		postedBy: req.user.id,
	};
	Post.findByIdAndUpdate(
		req.body.postId,
		{
			$push: { comments: comment },
		},
		{ useFindAndModify: false, new: true }
	)
		.populate('comments.postedBy', '_id name')
		.populate('postedBy', '_id name')
		.exec((err, result) => {
			if (err) {
				return res.status(422).json({ error: err });
			} else {
				return res.json(result);
			}
		});
});

// @route      DELETE api/post
// @desc       Delete post
// @access     Private

router.delete('/deletepost/:postId', auth, (req, res) => {
	console.log(req.user);
	Post.findOne({ id: req.params.postId })
		.populate('postedBy', '_id')
		.exec((err, post) => {
			if (err || !post) {
				return res.status(422).json({
					error: 'Post does not exist or it seems something is wrong somewhere',
				});
			}
			if (post.postedBy._id.toString() === req.user._id.toString()) {
				post
					.remove()
					.then((result) => {
						console.log(result);
						res.json(result);
						// res.json({ message: 'Post was successfully deleted' });
					})
					.catch((err) => {
						console.log(err);
					});
			}
		});
});

module.exports = router;
