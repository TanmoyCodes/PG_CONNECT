const mongoose=require('mongoose');


const dbConnection=async()=>{
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        console.log('connection Enstablist');
    } catch (error) {
        console.log('error in db connection',error);
    }
}


module.exports=dbConnection;