const mongoose = require("mongoose");
const User = require("../models/User");

const registerUser = async (req, res) => {
	const { username, password } = req.body;

	try {
		// si l'utilisateur existe déjà
		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(400).json({ message: "Cet utilisateur existe déjà" });
		}

		//
		const newUser = new User({ username, password });

		const savedUser = await newUser.save();

		res.status(200).json({ user: savedUser });
	} catch (error) {
		console.error("Erreur lors de la création de l'utilisateur:", error);
		res
			.status(500)
			.json({ message: "Erreur lors de la création de l'utilisateur" });
	}
};

const loginUser = async (req, res) => {
	const { username, password } = req.body;

	try {
		// Vérifiez si l'utilisateur existe
		const user = await User.findOne({ username });
		if (!user) {
			return res
				.status(401)
				.json({ message: "Nom d'utilisateur ou mot de passe incorrect" });
		}

		// Utilisez la méthode comparePassword pour vérifier le mot de passe
		const isMatch = await user.comparePassword(password);

		if (!isMatch) {
			return res.status(401).json({
				message: "Nom d'utilisateur ou mot de passe incorrect",
				isAuth: false,
			});
		}

		res.status(200).json({ message: "Authentification réussie", isAuth: true });
	} catch (error) {
		console.error("Erreur lors de l'authentification de l'utilisateur:", error);
		res
			.status(500)
			.json({ message: "Erreur lors de l'authentification de l'utilisateur" });
	}
};

// Exportez les fonctions du contrôleur
module.exports = {
	registerUser,
	loginUser,
};
