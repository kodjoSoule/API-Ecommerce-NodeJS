const express = require("express");
const connectDB = require("./config/database");

const LoggerMiddleware = require("./middleware/loggerMiddleware");
const fashionProductRoutes = require("./routes/fashionProductRoutes");
const PORT = process.env.PORT || 3000;

const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./config/swaggerSpecs");
const app = express();
const morgan = require("morgan");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./config/swagger.yaml");
const bodyParser = require("body-parser");
// const { verifyToken } = require("./config/auth");

// Middleware
// const LoggerMiddleware = (req, res, next) => {
// 	console.log(`Logged  ${req.url} ${req.method} -- ${new Date()}`);
// 	console.log(`Tested ✅`);
// 	//log dans un fichier
// 	fs.appendFile(
// 		"log.txt",
// 		`Logged  ${req.url} ${req.method} -- ${new Date()}`,
// 		function (err) {
// 			if (err) throw err;
// 			console.log("Saved!");
// 		}
// 	);
// 	//pour passer au middleware suivant
// 	// res.json({ message: "Hello World" });
// 	next();
// };

// app.use(cors());

// utilisation de la fonction middleware
//app.use(LoggerMiddleware);
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
// Appel pour établir la connexion à la base de données
connectDB();

app.use("/api/v1/", fashionProductRoutes);
// Exemple de route protégée avec vérification du token
// app.get("/api/v1/protected", verifyToken, (req, res) => {
// 	res.json({ message: "Route protégée, utilisateur autorisé", user: req.user });
// });
// Start the server
app.listen(PORT, () => {
	console.log(` Démarrage du serveur sur le port  http://localhost:${PORT}`);
});
