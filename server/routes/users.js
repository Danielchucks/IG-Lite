const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/User');

// @route      POST api/users
// @desc       Register a user
// @access     Public
router.post('/signup', async (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		console.log(req.body);
		return res.status(400).json({ error: 'Please fill all the fields' });
	}
	// console.log(req.body);

	try {
		let user = await User.findOne({ email });

		if (user) {
			return res
				.status(400)
				.json({ message: 'User with the email already exists' });
		}

		// Send verification link or code to the unique provided during registeration

		// create a new instance of a User in the database but have not been save yet
		user = new User({
			name,
			email,
			password,
		});

		// Hashing the  password before saving it
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);

		// save the user in the database
		await user.save();
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}

	res.status(200).json({ message: 'Sucessfully sent' });
});

module.exports = router;
