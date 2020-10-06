const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../key');
const User = require('../models/User');

module.exports = (req, res, next) => {
	const { authorization } = req.headers;
	// console.log(authorization);

	if (!authorization) {
		res
			.status(401)
			.json({ error: 'Authorization Denied, You must be logged in' });
	}
	const token = authorization.replace('Bearer ', '');

	// console.log(token);

	jwt.verify(token, JWT_SECRET, (err, payload) => {
		if (err) {
			return res.status(401).json({ error: 'You must be logged in' });
		}

		const { id } = payload;

		// console.log('The id of the token ' + id);

		User.findById(id).then((userData) => {
			req.user = userData;
			next();
		});
	});

	// try {
	// 	const decoded = jwt.verify(token, JWT_SECRET);
	// 	req.user = decoded.user;
	// 	next();
	// } catch (err) {
	// 	res.status(401).json({ error: 'Token is not valid' });
	// }
};
