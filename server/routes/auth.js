const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../key');
const auth = require('../middleware/auth');

const User = require('../models/User');

// @route      GET api/get
// @desc       Get logged in user
// @access     Private

router.get('/signin', auth, async (req, res) => {
	//console.log(req.user);
	console.log('The user details are ' + req.user);
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.messaga);
		res.status(500).json('Server Error');
	}
	//res.send('hello User');
	// Protected route
});

// @route      POST api/get
// @desc       Auth user and get token
// @access     Public

router.post('/signin', async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({ error: 'Please add email or password' });
	}

	try {
		let user = await User.findOne({ email });

		if (!user) {
			return res.status(422).json({
				error: "Invalid Credentials, Email doesn't exist in the database",
			});
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res
				.status(422)
				.json({ error: 'Oh! Invalid Credentials, Wrong password' });
		}

		// res.status(200).json({ message: 'Successful login ' });
		//console.log(user.id);

		const token = jwt.sign({ id: user.id }, JWT_SECRET);
		const { id, name, followers, following, pic } = user;
		res.json({ token, user: { id, name, email, followers, following, pic } });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
	console.log(`${user.name} with detailer ${user} signed in, a post request`);
});

module.exports = router;
