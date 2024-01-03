const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
	url: { type: String, required: true },
});

const productDetailSchema = new mongoose.Schema({
	style_code: String,
	closure: String,
	pockets: String,
	fabric: String,
	pattern: String,
	color: String,
});

const fashionProductSchema = new mongoose.Schema(
	{
		//_id: mongoose.Schema.Types.ObjectId,
		//_id: { type: String, required: true, unique: true }, ok
		_id: {
			type: String,
			default: () => new mongoose.Types.ObjectId().toString(),
		},
		actual_price: { type: String },
		average_rating: String,
		brand: String,
		category: String,
		crawled_at: String,
		description: String,
		discount: String,

		images: { imageSchema },
		out_of_stock: { type: Boolean, default: false },
		pid: { type: String },

		product_details: [productDetailSchema],

		seller: String,
		selling_price: String,
		sub_category: String,
		title: { type: String },
		url: String,
	},
	{ collection: "fashionProducts" }
);

const FashionProduct = mongoose.model("fashionProducts", fashionProductSchema);

module.exports = FashionProduct;
