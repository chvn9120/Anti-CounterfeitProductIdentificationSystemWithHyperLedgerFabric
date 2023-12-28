import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = new Schema({
    p_id: { type: String, require: true },
    p_name: { type: String, require: true },
    p_quantity: { type: Number, require: true, default: 10 },
    p_desc: { type: String },
    // p_size: { type: Number, require: true },
    p_price: { type: Number, require: true },
    p_thumbnail_image: { type: String, require: true },
    brand_id: { type: Schema.Types.ObjectId, require: true },
    brand_name: { type: String, require: true },
    p_assetID: [{ type: String, require: true }],
    createdBy: { type: Schema.Types.ObjectId, require: true },
    createdAt: { type: Date, default: Date.now },
    updatedBy: { type: Schema.Types.ObjectId },
    updatedAt: { type: Date },
    deletedBy: { type: Schema.Types.ObjectId },
    deletedAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
});

const ProductBase = mongoose.model('Product', productSchema);

export default ProductBase;
