
const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.config();
const PORT = process.env.PORT || 4000;
const DB = require('./src/config/database')
const fileUpload = require('express-fileupload');
app.use(fileUpload());
require('./src/utils/emailHelpers'); // Import email helpers to initialize the transporter

app.use(express.json());
const cors = require('cors');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin: ['http://localhost:5173', 'https://www.pghunter.in','https://adminpgconnect.vercel.app','https://pg-connect-chi.vercel.app/'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    secure:process.env.PROD=='production',
    credentials: true, // This allows cookies to be sent
    optionsSuccessStatus: 200 // For older browsers compatibility
}));

app.use(express.urlencoded({ extended: true })); //for get from HTML form submissions



//API Mount

const AllRoutes=require('./src/routes');

app.use('/api',AllRoutes);

app.get('/', (req, res) => {
    res.send('Server is Running!!!!!!!!!!!!!!!!');
});

//start Server

app.listen(PORT, () => {
    console.log(`Server is running successfully on port: http://localhost:${PORT}`);
    DB();
})