const express = require("express");
const router = express.Router();

const PgRoutes=require("./pgRoutes");
const AuthRoutes = require("./authRoutes");


// api/v1/pg
router.use("/v1/pg",PgRoutes);

// api/v1/auth
router.use("/v1/auth", AuthRoutes);

module.exports = router;
