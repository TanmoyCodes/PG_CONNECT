const express = require("express");
const router = express.Router();

const PgRoutes=require("./pgRoutes");
const AuthRoutes = require("./authRoutes");
const {sendOtpMail}=require('../utils/emailHelpers');


// api/v1/pg
router.use("/v1/pg",PgRoutes);

// api/v1/auth
router.use("/v1/auth", AuthRoutes);


// api/v1/contactus
router.post("/v1/contactus", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Basic validation
        if (!name || !email || !message) {
            return res.status(400).json({ error: "All fields are required." });
        }

        await sendOtpMail(email,message);
        // Respond with a success message
        res.status(200).json({ message: "Thank you for your message! We will get back to you soon.",success:true,data:{} });
    } catch (error) {
        console.error("Error in contact us route:", error.message);
        res.status(500).json({ error: "An error occurred while sending your message."});     
    }
});

module.exports = router;
