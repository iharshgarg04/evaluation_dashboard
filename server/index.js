const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const dotenv = require("dotenv");

const studentRoute = require('./routes/studentRoute');
const mentorRoute = require('./routes/mentorRouter');

const app = express();
app.use(express.json());
app.use(cors({
    origin:"*",
}))
dotenv.config();

const PORT = process.env.PORT || 4000;

app.use('/student',studentRoute);
app.use('/mentor',mentorRoute);
const connectDb = async()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected successfully");
    }catch(error){
        console.log("Error while connectting to db");
        console.log(error);
    }
}
connectDb();


app.listen(PORT,()=>{
    console.log(`server is successfully running on port ${PORT}`);
})