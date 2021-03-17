const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const User = require('../models/User');

// @route      PUT api/follow/follow
// @desc       follow a user
// @access     Private

router.put('/follow', auth, (req, res) => {
	User.findByIdAndUpdate(
		req.body.followerId,
		{
			$push: { followers: req.user._id },
		},
		{ useFindAndModify: false, new: true },
		(err, result) => {
			if (err) {
				return res.status(422).json({ error: err });
			}
			User.findByIdAndUpdate(
				req.user._id,
				{
					$push: { following: req.body.followerId },
				},
				{ useFindAndModify: false, new: true }
			)
				.select('-password')
				.then((result) => {
					res.json(result);
				})
				.catch((err) => {
					return res.status(422).json({ error: err });
				});
		}
	);
});

// @route      PUT api/unfollow/unfollow
// @desc       unfollow a user
// @access     Private

router.put('/unfollow', auth, (req, res) => {
	User.findByIdAndUpdate(
		req.body.unfollowId,
		{ $pull: { followers: req.user._id } },
		{ useFindAndModify: false, new: true },
		(err, result) => {
			if (err) {
				return res.status(422).json({ error: err });
			}
			User.findByIdAndUpdate(
				req.user._id,
				{ $pull: { following: req.body.unfollowId } },
				{ useFindAndModify: false, new: true }
			)
				.select('-password')
				.then((result) => {
					res.json(result);
				})
				.catch((err) => {
					return res.status(422).json({ error: err });
				});
		}
	);
});

module.exports = router;
