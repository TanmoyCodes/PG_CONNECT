const express = require("express");
const router = express.Router();

const PgController = require("../controllers/pg-controllers");

// Route to create a new PG
//  api/v1/pg/create
router.post("/create", PgController.createPG);

// Existing route (get all PGs)
//  api/v1/pgallpg
router.get("/allpg", PgController.getAllPGs);


// 🔧 Add this route to get a single PG by ID
//  api/v1/pg/byid/:id
router.get("/byid/:id", PgController.getPGById);

module.exports = router;