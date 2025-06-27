
const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.config();
const PORT = process.env.PORT || 4000;
const DB = require('./src/config/database')

app.use(express.json());
const cors = require('cors');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin: true, //put frontend url in arr
    credentials: true, // This allows cookies to be sent
    optionsSuccessStatus: 200 // For older browsers compatibility
}));

app.use(express.urlencoded({ extended: true })); //for get from HTML form submissions



//API Mount

const AllRoutes=require('./src/routes');

app.use('/api',AllRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to Expense Tracker API!');
});

//start Server

app.listen(PORT, () => {
    console.log(`Server is running successfully on port: http://localhost:${PORT}`);
    DB();
})