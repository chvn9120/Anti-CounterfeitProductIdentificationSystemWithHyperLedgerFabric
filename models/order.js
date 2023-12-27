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
	checkOutAt: { type: Date, default: Date.now },
});

const OrderBase = mongoose.model('Order', orderSchema);

export default OrderBase;
