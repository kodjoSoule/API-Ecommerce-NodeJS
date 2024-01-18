const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	authTokens: [
		{
			authToken: {
				type: String,
				required: true,
			},
		},
	],
});

// Utilisez une fonction asynchrone pour comparer les mots de passe
userSchema.methods.comparePassword = async function (candidatePassword) {
	try {
		// Utilisez bcrypt pour comparer les mots de passe
		const isMatch = await bcrypt.compare(candidatePassword, this.password);
		return isMatch;
	} catch (error) {
		throw new Error("Erreur lors de la comparaison des mots de passe");
	}
};

userSchema.pre("save", async function () {
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 10);
	}
});

const User = mongoose.model("User", userSchema);

module.exports = User;
