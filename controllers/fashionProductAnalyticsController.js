const FashionProduct = require("../models/fashionProduct");

// Calculer la moyenne des évaluations pour une catégorie donnée
const getAverageRatingByCategory = async (req, res) => {
	const category = req.params.category;

	try {
		const averageRating = await FashionProduct.aggregate([
			{ $match: { category } },
			{ $group: { _id: null, avgRating: { $avg: "$average_rating" } } },
		]);

		if (averageRating.length === 0) {
			return res
				.status(404)
				.json({ message: "No products found for the specified category" });
		}

		res.json({ averageRating: averageRating[0].avgRating });
	} catch (error) {
		console.error("Error calculating average rating by category:", error);
		res.status(500).send("Internal Server Error");
	}
};

// Récupérer les produits avec la meilleure évaluation
const getBestRatedProducts = async (req, res) => {
	try {
		const bestRatedProducts = await FashionProduct.find()
			.sort({ average_rating: -1 })
			.limit(5);
		res.json(bestRatedProducts);
	} catch (error) {
		console.error("Error fetching best-rated fashion products:", error);
		res.status(500).send("Internal Server Error");
	}
};

// Récupérer le nombre total de produits dans la base de données
const getProductCount = async (req, res) => {
	try {
		const productCount = await FashionProduct.countDocuments();
		res.json({ count: productCount });
	} catch (error) {
		console.error("Error fetching product count:", error);
		res.status(500).send("Internal Server Error");
	}
};

// Récupérer les produits triés par ordre de réduction
const getProductsSortedByDiscount = async (req, res) => {
	try {
		const products = await FashionProduct.find({
			discount: { $ne: null },
		}).sort({ discount: -1 });
		res.json(products);
	} catch (error) {
		console.error("Error fetching fashion products sorted by discount:", error);
		res.status(500).send("Internal Server Error");
	}
};

// Récupérer les produits avec une réduction supérieure à un certain pourcentage
const getProductsDiscountGreaterThan = async (req, res) => {
	const percentage = parseFloat(req.params.percentage);

	try {
		const products = await FashionProduct.find({
			discount: { $gt: percentage },
		});
		res.json(products);
	} catch (error) {
		console.error(
			"Error fetching fashion products with discount greater than specified percentage:",
			error
		);
		res.status(500).send("Internal Server Error");
	}
};

module.exports = {
	getAverageRatingByCategory,
	getBestRatedProducts,
	getProductCount,
	getProductsSortedByDiscount,
	getProductsDiscountGreaterThan,
};
