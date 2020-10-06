const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const PostSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	body: {
		type: String,
		require: true,
	},
	photo: {
		type: String,
		default: 'No Photo',
	},
	postedBy: {
		type: ObjectId,
		ref: 'user',
		// type: mongoose.Schema.Types.ObjectId,
		// ref: 'users',
	},
});

module.exports = mongoose.model('post', PostSchema);
