const express = require("express");
const router = express.Router();

const PgController = require("../controllers/pg-controllers");
const { authMiddleware, isAdmin } = require("../middlewares/auth-middleware");

// Route to create a new PG
//  api/v1/pg/createpg
router.post("/createpg", PgController.createPG);

// Existing route (get all PGs)
//  api/v1/pgallpg
router.get("/allpg", PgController.getAllPGs);

router.get("/update",authMiddleware,isAdmin, PgController.getAllPGs);


// 🔧 Add this route to get a single PG by ID
//  api/v1/pg/byid/:id
router.get("/byid/:id", PgController.getPGById);

// api/v1/pg/upload/img
router.post('/upload/img',PgController.uploadImageController)

module.exports = router;