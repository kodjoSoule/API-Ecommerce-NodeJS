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
		_id: { type: String, required: true },
		actual_price: { type: String, required: true },
		average_rating: String,
		brand: String,
		category: String,
		crawled_at: String,
		description: String,
		discount: String,

		images: { imageSchema },
		out_of_stock: { type: Boolean, default: false },
		pid: { type: String, required: true },

		product_details: [productDetailSchema],

		seller: String,
		selling_price: String,
		sub_category: String,
		title: { type: String, required: true },
		url: String,
	},
	{ collection: "fashionProducts" }
);

const FashionProduct = mongoose.model("fashionProducts", fashionProductSchema);

module.exports = FashionProduct;
