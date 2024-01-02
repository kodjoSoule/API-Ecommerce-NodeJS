const express = require("express");
const router = express.Router();
const fashionProductController = require("../controllers/fashionProductController");
const fashionProductQueryController = require("../controllers/fashionProductQueryController");
const fashionProductAnalyticsController = require("../controllers/fashionProductAnalyticsController");
const userController = require("../controllers/userController");
// const { generateToken } = require("../config/auth");
const { verifyToken } = require("../utils/jwt");
// Routes d'authentification
// Route pour l'enregistrement d'un nouvel utilisateur
router.post("/register", userController.registerUser);
// Route pour la connexion d'un utilisateur
router.post("/login", userController.loginUser);

//router.post("/logout", userController.logout);
//router.post("/token", userController.refreshToken);

// Routes CRUD
router.get("/products", fashionProductController.getAllFashionProducts);
router.get("/products/:id", fashionProductController.getFashionProductById);
router.post("/products/", fashionProductController.addFashionProduct);
router.put("/products/:id", fashionProductController.updateFashionProductById);
router.delete(
	"products/:id",
	fashionProductController.deleteFashionProductById
);

// Routes d'interrogation simples
router.get(
	"/category/:category",
	fashionProductQueryController.getProductsByCategory
);

router.get("/brand/:brand", fashionProductQueryController.getProductsByBrand);

router.get("/onSale", fashionProductQueryController.getProductsOnSale);

// Routes d'interrogation analytiques
router.get(
	"/category/:category/averageRating",
	fashionProductAnalyticsController.getAverageRatingByCategory
);
router.get(
	"/bestRated",
	fashionProductAnalyticsController.getBestRatedProducts
);
router.get("/count", fashionProductAnalyticsController.getProductCount);
router.get(
	"/sortedByDiscount",
	fashionProductAnalyticsController.getProductsSortedByDiscount
);
router.get(
	"/discountGreaterThan/:percentage",
	fashionProductAnalyticsController.getProductsDiscountGreaterThan
);

module.exports = router;
