import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = new Schema({
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
	moneyGivenByCustomer: {
		type: Number,
		require: true,
	},
	checkOutBy: {
		type: Schema.Types.ObjectId,
		require: true,
	},
	checkOutAt: { type: Date, default: Date.now },
});

const OrderBase = mongoose.model('Order', orderSchema);

export default OrderBase;
