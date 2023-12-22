import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const brandSchema = new Schema({
	brand_name: { type: String, require: true },
	display_brand_name: { type: String, require: true },
	brand_desc: { type: String },
	createdBy: { type: Schema.Types.ObjectId, require: true },
	createdAt: { type: Date, default: Date.now },
	updatedBy: { type: Schema.Types.ObjectId },
	updatedAt: { type: Date },
	deletedBy: { type: Schema.Types.ObjectId },
	deletedAt: { type: Date },
	isDeleted: { type: Boolean, default: false },
});

const BrandBase = mongoose.model('Brand', brandSchema);

export default BrandBase;
