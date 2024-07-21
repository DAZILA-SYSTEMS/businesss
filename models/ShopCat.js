const Sequelize = require("sequelize");
const db = require("../config/database");

const ShopCat = db.define("shopCat", {
	name: {
		type: Sequelize.STRING,
	},
	details: {
		type: Sequelize.STRING,
	},
	trace: {
		type: Sequelize.STRING,
	},
	live: {
		type: Sequelize.STRING,
	},
	linker: {
		type: Sequelize.STRING,
	},
	status: {
		type: Sequelize.STRING,
	},
	instLinker: {
		type: Sequelize.STRING,
	},
	credLinker: {
		type: Sequelize.STRING,
	},
	deleted: {
		type: Sequelize.STRING,
	},
});

ShopCat.sync().then(() => {
	console.log("shopCat table created");
});
module.exports = ShopCat;
