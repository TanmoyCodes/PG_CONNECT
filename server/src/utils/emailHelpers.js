const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});
(async () => {
    try {
        await transporter.verify();
        console.log("-------- MAIL Server is ready! -----------");
    } catch (err) {
        console.log("-------- ❌ MAIL Server is Error! -----------");
        console.log(err.message);
    }
})();

const sendOtpMail = async (email, message) => {
    console.log("--> inside sendOtpMail", email, message);
    try {
        await transporter.sendMail({
            from: email, // sender address
            to:process.env.SMTP_USER , // list of receivers
            subject: "Contact Us PgHunter-->", // Subject line
            html: `
                <html>
                    <head>
                        <style>
                            main{
                                height: 500px;
                                width: 500px;
                                margin: auto;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                background-color: black;
                                color: white;
                                font-size: 28px;
                            }
                        </style>
                    </head>
                    <body>
                        <main>
                            <h2>${message}</h2>
                        </main>
                    </body>
                </html>
            `,
        });
        console.log("---> email sent!");
    } catch (err) {
        console.log("------------ 🔴 Could not send email", err.message);
        throw "Error in sending Email!";
    }
};

module.exports = { sendOtpMail };
