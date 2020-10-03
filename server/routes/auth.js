const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/User');

router.post('/signin', async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(400).json({ error: 'Please add email or password' });
	}

	try {
		let user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({
				msg: "Invalid Credentials, Email doesn't exist in the database",
			});
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(400).json({ msg: 'Invalid Credentials password' });
		}

		res.status(200).json({ message: 'Successful login ' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
