const express = require("express");
const connectDB = require("./config/database");
const fashionProductRoutes = require("./routes/fashionProductRoutes");
const PORT = process.env.PORT || 3000;
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = express();

const YAML = require("yamljs");
const swaggerDocument = YAML.load("./config/swagger.yaml");

//

// Middleware
const LoggerMiddleware = (req, res, next) => {
	console.log(`Logged  ${req.url} ${req.method} -- ${new Date()}`);
	console.log(`Tested ✅`);
	//pour passer au middleware suivant
	// res.json({ message: "Hello World" });
	next();
};
// app.use(cors());
// app.use(bodyParser.json());

// utilisation de la fonction middleware
app.use(LoggerMiddleware);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Appel pour établir la connexion à la base de données
connectDB();

app.use("/", fashionProductRoutes);

// Start the server
app.listen(PORT, () => {
	console.log(
		`Server is running and listening on port  http://localhost:${PORT}`
	);
});
