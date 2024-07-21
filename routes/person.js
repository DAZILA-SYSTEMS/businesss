const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
const Person = require("../models/Person");
const verifyAdmin = require("../middleware/verifyAdmin");
const { Op } = require("sequelize");

//register a person
router.post("/add", verifyToken, verifyAdmin, (req, res) => {
	Person.create({
		name: req.body.name,
		email: req.body.email,
		contact: req.body.contact,
		details: req.body.details,
		customer: req.body.customer,
		supplier: req.body.supplier,
		creditor: req.body.creditor,
		debtor: req.body.debtor,
		live: 1,
		trace: req.body.trace,
		linker: req.body.linker,
		instLinker: req.body.instLinker,
		credLinker: req.credLinker,
		status: req.body.status,
		deleted: 0,
	})
		.then((person) => {
			req.io
				.to(req.body.instLinker)
				.emit("message", { ...person, messageType: "person" });
			res.json({ person, status: 201 });
		})
		.catch((err) => res.json({ status: "500", message: "Error has occured" }));
});

//edit a person
router.post("/edit", verifyToken, verifyAdmin, (req, res) => {
	Person.findOne({
		where: { id: req.body.id, instLinker: req.body.instLinker },
	})
		.then((person) => {
			if (person) {
				person.name = req.body.name ? req.body.name : person.name;
				person.email = req.body.email ? req.body.email : person.email;
				person.contact = req.body.contact ? req.body.contact : person.contact;
				person.details = req.body.details ? req.body.details : person.details;
				person.supplier = req.body.supplier
					? req.body.supplier
					: person.supplier;
				person.customer = req.body.customer
					? req.body.customer
					: person.customer;
				person.creditor = req.body.creditor
					? req.body.creditor
					: person.creditor;
				person.debtor = req.body.debtor ? req.body.debtor : person.debtor;
				person.credLinker = req.credLinker;
				person.trace = req.body.trace ? req.body.trace : person.trace;
				person.live = 1;
				person.deleted = req.body.deleted ? req.body.deleted : person.deleted;
				person.save();
				req.io
					.to(req.body.instLinker)
					.emit("message", { ...person, messageType: "person" });
				res.json({ person, status: 200 });
			} else {
				res.json({ status: 404, message: "person not found" });
			}
		})
		.catch((err) =>
			res.json({
				status: 500,
				message: "person couldn't be edited",
			})
		);
});

//get persons
router.post("/get", verifyToken, verifyAdmin, (req, res) => {
	Person.findAll({
		where: {
			instLinker: req.body.instLinker,
			trace: { [Op.gt]: req.body.online },
			/*[Op.or]: [
        {
          admin: 1,
        },
        {
          medical: 1,
        },
        {
          finance: 1,
        },
      ],*/
		},
	})
		.then((persons) => {
			res.json({ persons, status: 200 });
		})
		.catch((err) =>
			res.json({
				status: 500,
				message: "Unknown error",
			})
		);
});
module.exports = router;
