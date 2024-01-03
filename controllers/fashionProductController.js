const FashionProduct = require("../models/fashionProduct");

// Example controller to get all fashion products

const getAllFashionProducts = async (req, res) => {
	try {
		console.log("Fetching all fashion products...");

		//const products = await FashionProduct.find();
		//limit(10);
		const products = await FashionProduct.find();
		//console.log("Fetched products:", products);
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

	try {
		const deletedProduct = await FashionProduct.findByIdAndDelete(productId);

		if (!deletedProduct) {
			return res.status(404).json({ message: "Product not found" });
		}

		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		console.error("Error deleting fashion product by ID:", error);
		res.status(500).send("Internal Server Error");
	}
};

module.exports = {
	getAllFashionProducts,
	getFirstFashionProduct,

	getFashionProductById,
	addFashionProduct,
	updateFashionProductById,
	deleteFashionProductById,
	// Ajoutez d'autres méthodes au besoin
};
