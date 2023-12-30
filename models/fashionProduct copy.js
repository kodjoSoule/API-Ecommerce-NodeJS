const mongoose = require("mongoose");

// Sous-schema pour les images
// const imageSchema = new mongoose.Schema({
// 	url: { type: String, required: true },
// });
const imageSchema = new mongoose.Schema({
	url: String,
});

// Sous-schema pour les détails du produit
const productDetailSchema = new mongoose.Schema({
	style_code: String,
	closure: String,
	pockets: String,
	fabric: String,
	pattern: String,
	color: String,
});

const fashionProductSchema = new mongoose.Schema({
	_id: { type: String, required: true },
	actual_price: { type: String, required: true },
	average_rating: { type: String },
	brand: { type: String },
	category: { type: String },
	crawled_at: { type: String },
	description: { type: String },
	discount: { type: String },

	//images: [imageSchema], // Utilisation du sous-schema pour les images
	images: [String],
	out_of_stock: { type: Boolean, default: false },
	pid: { type: String, required: true },

	product_details: [productDetailSchema], // Utilisation du sous-schema pour les détails du produit

	seller: { type: String },
	selling_price: { type: String },
	sub_category: { type: String },
	title: { type: String, required: true },
	url: { type: String },
});

const FashionProduct = mongoose.model("FashionProduct", fashionProductSchema);

module.exports = FashionProduct;
