

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

async function connect() {
	mongoose
		.connect(process.env.DB_CONNECTION_STRING, {
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log("Connexion à MongoDB réussie ✅ !");
			console.log("Nom de la base de données:", mongoose.connection.name);
			console.log("URL de connexion:", mongoose.connection.host);
		})
		.catch(() => console.log("Connexion à MongoDB échouée !"));
}

module.exports = connect;
