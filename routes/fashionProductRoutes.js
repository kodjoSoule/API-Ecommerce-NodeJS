const express = require("express");
const router = express.Router();
const fashionProductController = require("../controllers/fashionProductController");
const fashionProductQueryController = require("../controllers/fashionProductQueryController");
const fashionProductAnalyticsController = require("../controllers/fashionProductAnalyticsController");
const userController = require("../controllers/userController");

// Route pour l'enregistrement d'un nouvel utilisateur
router.post("/register", userController.registerUser);
// Route pour la connexion d'un utilisateur
router.post("/login", userController.loginUser);

// Routes CRUD✅
router.get("/products", fashionProductController.getAllFashionProducts);
router.get("/products/:id", fashionProductController.getFashionProductById);
router.post("/products/", fashionProductController.addFashionProduct);
router.put("/products/:id", fashionProductController.updateFashionProductById);
router.delete(
	"/products/:id",
	fashionProductController.deleteFashionProductById
);

// Routes d'interrogation simples
//Catégories✅
router.get("/categories", fashionProductQueryController.getCategories);
router.get(
	"/categories/:category",
	fashionProductQueryController.getProductsByCategory
);

// brand✅
router.get("/brands", fashionProductQueryController.getBrands);
router.get("/brands/:brand", fashionProductQueryController.getProductsByBrand);
// onSale✅
router.get("/onSale", fashionProductQueryController.getProductsOnSale);

// Routes d'interrogation analytiques
//✅
router.get(
	"/category/:category/averageRating",
	fashionProductAnalyticsController.getAverageRatingByCategory
);
//✅

router.get(
	"/bestRated",
	fashionProductAnalyticsController.getBestRatedProducts
);

//✅

router.get(
	"/category/:category/count",
	fashionProductAnalyticsController.getProductCountByCategory
);
//✅

router.get("/count", fashionProductAnalyticsController.getProductCount);

module.exports = router;
