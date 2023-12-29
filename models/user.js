import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		type: String,
		require: true,
		unique: true,
	},
	fullname: String,
	email: {
		type: String,
	},
	password: {
		type: String,
		require: true,
		min: 6,
		max: 255,
	},
	avatar: String,
	role: {
		type: String,
		default: 'user',
	},
	orders: [{ type: Schema.Types.ObjectId }],
	assets: [{ type: String }],
	isDeleted: { type: Boolean, default: false },
});

const UserBase = mongoose.model('User', userSchema);

export default UserBase;
