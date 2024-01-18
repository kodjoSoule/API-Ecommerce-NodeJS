const FashionProduct = require("../models/fashionProduct");

// Calculer la moyenne des évaluations pour une catégorie donnée
const getAverageRatingByCategory2 = async (req, res) => {
	const category = req.params.category;

	try {
		const averageRatingResult = await FashionProduct.aggregate([
			{ $match: { category: category, average_rating: { $exists: true } } },
			{ $group: { _id: null, "Total ": { $sum: 1 } } },
		]);

		if (averageRatingResult.length === 0) {
			return res
				.status(404)
				.json({ message: "Aucun produit trouvé pour la catégorie spécifiée" });
		}

		res.json(averageRatingResult);
	} catch (error) {
		console.error(
			"Erreur lors du calcul de la note moyenne par catégorie :",
			error
		);
		res.status(500).send("Erreur interne du serveur");
	}
};
const getAverageRatingByCategory = async (req, res) => {
	const category = req.params.category;

	try {
		const averageRatingResult = await FashionProduct.aggregate([
			{
				$match: {
					category: category,
					average_rating: { $exists: true, $ne: "" },
				},
			},
			{
				$group: {
					_id: null,
					totalProducts: { $sum: 1 },
					avgRating: { $avg: { $toDouble: "$average_rating" } },
				},
			},
			{
				$project: {
					_id: 0,
					totalProducts: 1,
					avgRating: 1,
				},
			},
		]);

		if (averageRatingResult.length === 0) {
			return res
				.status(404)
				.json({ message: "Aucun produit trouvé pour la catégorie spécifiée" });
		}

		const { totalProducts, avgRating } = averageRatingResult[0];
		res.json({ totalProducts, avgRating });
	} catch (error) {
		console.error(
			"Erreur lors du calcul de la note moyenne par catégorie :",
			error
		);
		res.status(500).send("Erreur interne du serveur");
	}
};

// Récupérer les 5 produits avec la meilleure évaluation
const getBestRatedProducts = async (req, res) => {
	try {
		const bestRatedProducts = await FashionProduct.find()
			.sort({ average_rating: -1 })
			.limit(5);
		res.json(bestRatedProducts);
	} catch (error) {
		console.error(
			"Erreur lors de la récupération des produits de mode les mieux notés :",
			error
		);
		res.status(500).send("Erreur interne du serveur");
	}
};

// Récupérer le nombre total de produits dans la base de données
const getProductCount = async (req, res) => {
	try {
		const productCount = await FashionProduct.countDocuments();
		res.json({ count: productCount });
	} catch (error) {
		console.error(
			"Erreur lors de la récupération du nombre de produits :",
			error
		);
		res.status(500).send("Erreur interne du serveur");
	}
};
// Récupérer le nombre de produits dans une catégorie spécifique
const getProductCountByCategory = async (req, res) => {
	const category = req.params.category;

	try {
		const productCount = await FashionProduct.countDocuments({
			category: category,
		});
		res.json({ count: productCount });
	} catch (error) {
		console.error(
			"Erreur lors de la récupération du nombre de produits :",
			error
		);
		res.status(500).send("Erreur interne du serveur");
	}
};

module.exports = {
	getProductCountByCategory,
	getAverageRatingByCategory,
	getBestRatedProducts,
	getProductCount,
};
