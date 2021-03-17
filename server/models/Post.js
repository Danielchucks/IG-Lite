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
		required: true,
	},
	likes: [{ type: ObjectId, ref: 'user' }],
	comments: [
		{
			text: String,
			postedBy: { type: ObjectId, ref: 'user' },
		},
	],
	postedBy: {
		type: ObjectId,
		ref: 'user',
		// type: mongoose.Schema.Types.ObjectId,
		// ref: 'users',
	},
});

module.exports = mongoose.model('post', PostSchema);
