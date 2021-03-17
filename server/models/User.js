const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	date: {
		type: String,
		default: Date.now,
	},
	pic: {
		type: String,
		default: "https://res.cloudinary.com/dandyd/image/upload/v1610799813/images_we4jhp.png"
	},

	followers: [{ type: ObjectId, ref: 'user' }],
	following: [{ type: ObjectId, ref: 'user' }],
});

module.exports = mongoose.model('user', UserSchema);
