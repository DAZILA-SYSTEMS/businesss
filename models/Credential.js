const Sequelize = require("sequelize");
const db = require("../config/database");

const Credential = db.define("credential", {
	customerReg: {
		type: Sequelize.STRING,
	},
	staffReg: {
		type: Sequelize.STRING,
	},
	firstname: {
		type: Sequelize.STRING,
	},
	lastname: {
		type: Sequelize.STRING,
	},
	surname: {
		type: Sequelize.STRING,
	},
	contact: {
		type: Sequelize.STRING,
	},
	email: {
		type: Sequelize.STRING,
	},
	refLinker: {
		type: Sequelize.STRING,
	},
	credLinker: {
		type: Sequelize.STRING,
	},
	instLinker: {
		type: Sequelize.STRING,
	},
	staff: {
		type: Sequelize.TEXT,
	},
	admin: {
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
	deleted: {
		type: Sequelize.STRING,
	},
	token: {
		type: Sequelize.STRING,
	},
	socket: {
		type: Sequelize.STRING,
	},
	status: {
		type: Sequelize.STRING,
	},
});

Credential.sync().then(() => {
	console.log("credential table created");
});
module.exports = Credential;
