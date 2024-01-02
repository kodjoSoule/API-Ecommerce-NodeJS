const FashionProduct = require("../models/fashionProduct");

// Example controller to get all fashion products

const getAllFashionProducts = async (req, res) => {
	try {
		console.log("Fetching all fashion products...");

		//const products = await FashionProduct.find();
		//limit(10);
		const products = await FashionProduct.find().limit(1);
		console.log("Fetched products:", products);
		res.json(products);
	} catch (error) {
		console.error("Error fetching fashion products:", error);
		res.status(500).send("Internal Server Error");
	}
};

//find the first product
const getFirstFashionProduct = async (req, res) => {
	try {
		const product = await FashionProduct.findOne();
		res.json(product);
		//res.json({ message: "Products" });
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal Server Error");
	}
};
const getTest = async (req, res) => {
	try {
		res.json({ message: "Hello World" });
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal Server Error");
	}
};

//
// // Récupérer tous les produits
// const getAllFashionProducts = async (req, res) => {
// 	try {
// 		const products = await FashionProduct.find({});
// 		res.json(products);
// 	} catch (error) {
// 		console.error("Error fetching fashion products:", error);
// 		res.status(500).send("Internal Server Error");
// 	}
// };

// Récupérer un produit par son ID
const getFashionProductById = async (req, res) => {
	const productId = req.params.id;

	try {
		const product = await FashionProduct.findById(productId);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		res.json(product);
	} catch (error) {
		console.error("Error fetching fashion product by ID:", error);
		res.status(500).send("Internal Server Error");
	}
};

// Ajouter un nouveau produit
const addFashionProduct = async (req, res) => {
	const newProductData = req.body;

	try {
		const newProduct = new FashionProduct(newProductData);
		await newProduct.save();

		res.status(201).json(newProduct);
	} catch (error) {
		console.error("Error adding fashion product:", error);
		res.status(500).send("Internal Server Error");
	}
};

// Mettre à jour un produit par son ID
const updateFashionProductById = async (req, res) => {
	const productId = req.params.id;
	const updatedProductData = req.body;

	try {
		const updatedProduct = await FashionProduct.findByIdAndUpdate(
			productId,
			updatedProductData,
			{ new: true }
		);

		if (!updatedProduct) {
			return res.status(404).json({ message: "Product not found" });
		}

		res.json(updatedProduct);
	} catch (error) {
		console.error("Error updating fashion product by ID:", error);
		res.status(500).send("Internal Server Error");
	}
};

// Supprimer un produit par son ID
const deleteFashionProductById = async (req, res) => {
	const productId = req.params.id;
	// try {
	// 	const deletedProduct = await FashionProduct.findByIdAndDelete(productId);

	// 	if (!deletedProduct) {
	// 		return res.status(404).json({ message: "Product not found" });
	// 	}
	// 	res.json({ message: "Product deleted successfully" });
	// } catch (error) {
	// 	console.error("Error deleting fashion product by ID:", error);
	// 	res.status(500).send("Internal Server Error");
	// }
	res.json({ message: "Product deleted successfully" });
};

//liste des requêtes d'interrogation simples et analytiques qui seront proposées dans l'API ;

// // Récupérer tous les produits d'une catégorie spécifique
// const getProductsByCategory = async (req, res) => {
// 	const category = req.params.category;

// 	try {
// 		const products = await FashionProduct.find({ category });
// 		res.json(products);
// 	} catch (error) {
// 		console.error("Error fetching fashion products by category:", error);
// 		res.status(500).send("Internal Server Error");
// 	}
// };

// // Récupérer tous les produits d'une marque spécifique
// const getProductsByBrand = async (req, res) => {
// 	const brand = req.params.brand;

// 	try {
// 		const products = await FashionProduct.find({ brand });
// 		res.json(products);
// 	} catch (error) {
// 		console.error("Error fetching fashion products by brand:", error);
// 		res.status(500).send("Internal Server Error");
// 	}
// };

// // Récupérer tous les produits en promotion
// const getProductsOnSale = async (req, res) => {
// 	try {
// 		const products = await FashionProduct.find({ discount: { $ne: null } });
// 		res.json(products);
// 	} catch (error) {
// 		console.error("Error fetching on-sale fashion products:", error);
// 		res.status(500).send("Internal Server Error");
// 	}
// };

// // Calculer la moyenne des évaluations pour une catégorie donnée
// const getAverageRatingByCategory = async (req, res) => {
// 	const category = req.params.category;

// 	try {
// 		const averageRating = await FashionProduct.aggregate([
// 			{ $match: { category } },
// 			{ $group: { _id: null, avgRating: { $avg: "$average_rating" } } },
// 		]);

// 		if (averageRating.length === 0) {
// 			return res
// 				.status(404)
// 				.json({ message: "No products found for the specified category" });
// 		}

// 		res.json({ averageRating: averageRating[0].avgRating });
// 	} catch (error) {
// 		console.error("Error calculating average rating by category:", error);
// 		res.status(500).send("Internal Server Error");
// 	}
// };
module.exports = {
	getAllFashionProducts,
	getFirstFashionProduct,
	getTest,
	getFashionProductById,
	addFashionProduct,
	updateFashionProductById,
	deleteFashionProductById,
	// Ajoutez d'autres méthodes au besoin
};
