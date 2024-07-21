const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
const ShopCat = require("../models/ShopCat");
const verifyStaff = require("../middleware/verifyStaff");
const { Op } = require("sequelize");

router.post("/add", verifyToken, verifyStaff, (req, res) => {
	//create a shopCat
	ShopCat.create({
		name: req.body.name,
		details: req.body.details,
		credLinker: req.credLinker,
		instLinker: req.body.instLinker,
		live: 1,
		linker: req.body.linker,
		trace: req.body.trace,
		deleted: req.body.deleted || 0,
		status: 0,
	})
		.then((shopCat) => {
			req.io
				.to(req.body.instLinker)
				.emit("message", { ...shopCat, messageType: "shopCat" });
			res.json({ shopCat, status: 201 });
		})
		.catch((err) =>
			res.json({
				status: 500,
				message: "ShopCat couldn't be created",
			})
		);
});

//edit shopCat
router.post("/edit", verifyToken, verifyStaff, (req, res) => {
	ShopCat.findOne({
		where: { id: req.body.id, instLinker: req.body.instLinker },
	})
		.then((shopCat) => {
			if (shopCat) {
				shopCat.name = req.body.name ? req.body.name : shopCat.name;
				shopCat.details = req.body.details ? req.body.details : shopCat.details;
				shopCat.credLinker = req.credLinker;
				shopCat.trace = req.body.trace ? req.body.trace : shopCat.trace;
				shopCat.live = 1;
				shopCat.deleted = req.body.deleted ? req.body.deleted : shopCat.deleted;
				shopCat.save();
				req.io
					.to(req.body.instLinker)
					.emit("message", { ...shopCat, messageType: "shopCat" });
				res.json({ shopCat, status: 200 });
			} else {
				res.json({ status: 404, message: "ShopCat not found" });
			}
		})
		.catch((err) =>
			res.json({
				status: 500,
				message: "ShopCat couldn't be edited",
			})
		);
});

//get shopCats
router.post("/get", verifyToken, verifyStaff, (req, res) => {
	ShopCat.findAll({
		where: {
			instLinker: req.body.instLinker,
			trace: { [Op.gt]: req.body.online },
		},
	})
		.then((shopCats) => {
			res.json({ shopCats, status: 200 });
		})
		.catch((err) =>
			res.json({
				status: 500,
				message: "Unknown error",
			})
		);
});

module.exports = router;
