const FashionProduct = require("../models/fashionProduct");

// Récupérer tous les produits d'une catégorie spécifique
const getProductsByCategory = async (req, res) => {
	const category = req.params.category;

	try {
		const products = await FashionProduct.find({ category });
		res.json(products);
	} catch (error) {
		console.error("Error fetching fashion products by category:", error);
		res.status(500).send("Internal Server Error");
	}
};

// Récupérer tous les produits d'une marque spécifique
const getProductsByBrand = async (req, res) => {
	const brand = req.params.brand;

	try {
		const products = await FashionProduct.find({ brand });
		res.json(products);
	} catch (error) {
		console.error("Error fetching fashion products by brand:", error);
		res.status(500).send("Internal Server Error");
	}
};

// Récupérer tous les produits en promotion
const getProductsOnSale = async (req, res) => {
	try {
		const products = await FashionProduct.find({ discount: { $ne: null } });
		res.json(products);
	} catch (error) {
		console.error("Error fetching on-sale fashion products:", error);
		res.status(500).send("Internal Server Error");
	}
};

module.exports = {
	getProductsByCategory,
	getProductsByBrand,
	getProductsOnSale,
};
