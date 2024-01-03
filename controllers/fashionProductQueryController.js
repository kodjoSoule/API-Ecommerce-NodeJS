const FashionProduct = require("../models/fashionProduct");

// Récupérer tous les produits d'une catégorie spécifique
const getCategories = async (req, res) => {
	try {
		const categories = await FashionProduct.distinct("category");
		res.json(categories);
	} catch (error) {
		console.error("Error fetching categories:", error);
		res.status(500).send("Internal Server Error");
	}
};

const getProductsByCategory = async (req, res) => {
	const category = req.params.category;

	try {
		const products = await FashionProduct.find({ category: category });

		if (!products || products.length === 0) {
			return res
				.status(404)
				.json({ message: `No products found in category: ${category}` });
		}

		res.json(products);
	} catch (error) {
		console.error(`Error fetching products in category ${category}:`, error);
		res.status(500).send("Internal Server Error");
	}
};

// Récupérer tous les produits d'une marque spécifique
const getBrands = async (req, res) => {
	try {
		const brands = await FashionProduct.distinct("brand");
		if (!brands || brands.length === 0) {
			return res.status(404).json({ message: `No brands found` });
		}
		res.json(brands);
	} catch (error) {
		console.error("Error fetching brands:", error);
		res.status(500).send("Internal Server Error");
	}
};
const getProductsByBrand = async (req, res) => {
	const brand = req.params.brand;
	try {
		const products = await FashionProduct.find({ brand: brand });
		res.json(products);
	} catch (error) {
		console.error("Error fetching fashion products by brand:", error);
		res.status(500).send("Internal Server Error");
	}
};

// Récupérer tous les produits en promotion
const getProductsOnSale = async (req, res) => {
	try {
		const products = await FashionProduct.find({
			discount: { $ne: null },
		}).limit(5);
		if (!products || products.length === 0) {
			return res.status(404).json({ message: `No products on sale` });
		}
		res.json(products);
	} catch (error) {
		console.error("Error fetching on-sale fashion products:", error);
		res.status(500).send("Internal Server Error");
	}
};
//

module.exports = {
	getProductsByCategory,
	getBrands,
	getProductsByBrand,
	getProductsOnSale,
	getCategories,
};
