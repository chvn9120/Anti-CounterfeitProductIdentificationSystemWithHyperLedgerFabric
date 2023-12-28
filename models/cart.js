import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const cartSchema = new Schema({
	product_and_quantity: [
		{
			pid: {
				type: Schema.Types.ObjectId,
			},
			quantity: {
				type: Number,
				default: 1,
			},
		},
	],
	owner: {
		type: Schema.Types.ObjectId,
		require: true,
	},
});

const CartBase = mongoose.model('Cart', cartSchema);

export default CartBase;
