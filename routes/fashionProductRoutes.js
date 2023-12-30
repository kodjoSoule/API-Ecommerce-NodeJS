const express = require("express");
const router = express.Router();
const fashionProductController = require("../controllers/fashionProductController");
const fashionProductQueryController = require("../controllers/fashionProductQueryController");
const fashionProductAnalyticsController = require("../controllers/fashionProductAnalyticsController");

// Routes CRUD
router.get("/", fashionProductController.getAllFashionProducts);
router.get("/:id", fashionProductController.getFashionProductById);
router.post("/", fashionProductController.addFashionProduct);
router.put("/:id", fashionProductController.updateFashionProductById);
router.delete("/:id", fashionProductController.deleteFashionProductById);

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
