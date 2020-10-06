const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const Post = require('../models/Post');

router.get('/allpost', async (req, res) => {
	try {
		let posts = await Post.find().populate('postedBy', 'id name');

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
			'id name'
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
	const { title, body } = req.body;
	if (!title || !body) {
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

module.exports = router;
