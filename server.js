const express = require("express");
const connectDB = require("./config/database");
const cors = require("cors");

const fashionProductRoutes = require("./routes/fashionProductRoutes");

const PORT = process.env.PORT || 3000;

const swaggerUi = require("swagger-ui-express");
const app = express();
const morgan = require("morgan");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./config/swagger.yaml");
const bodyParser = require("body-parser");

// Utiliser le middleware CORS
app.use(cors());
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

connectDB();

app.use("/api/v1/", fashionProductRoutes);

app.listen(PORT, () => {
	console.log(` Démarrage du serveur sur le port  http://localhost:${PORT}`);
});
