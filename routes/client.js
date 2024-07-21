const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
const Invoice = require("../models/Invoice");
const Payment = require("../models/Payment");
const verifyPatient = require("../middleware/verifyPatient");

//get invoices
router.post("/invoices", verifyToken, verifyPatient, (req, res) => {
	Invoice.findAll({
		where: {
			instLinker: req.body.instLinker,
			customerLinker: req.credLinker,
		},
	})
		.then((invoices) => {
			res.json({ invoices, status: 200 });
		})
		.catch((err) =>
			res.json({
				status: 500,
				message: "Unknown error",
			})
		);
});

//get payments
router.post("/payments", verifyToken, verifyPatient, (req, res) => {
	Payment.findAll({
		where: {
			instLinker: req.body.instLinker,
			customerLinker: req.credLinker,
		},
	})
		.then((payments) => {
			res.json({ payments, status: 200 });
		})
		.catch((err) =>
			res.json({
				status: 500,
				message: "Unknown error",
			})
		);
});

module.exports = router;
