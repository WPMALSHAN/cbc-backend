import express from 'express';
import mongoose from 'mongoose';
import Jwt from 'jsonwebtoken';


import productRoute from './Routes/productRoute.js';

import ordersRoute from './Routes/OdersRoute.js';

import userRouter from './Routes/userRouter.js'; // Importing userRouter




const app = express(); // hook express to the app variable


// Middleware to parse JSON bodies
app.use(express.json());

//This is Authentication Part
app.use((req,res,next)=>{
    let token = req.header("Authorization");
    
    if(token != null){
        token = token.replace("Bearer ","");
       Jwt.verify(token,"jwt-scret",(error,decoded)=>{
        if(decoded == null){

            res.status(403).json({
                message: "invalid token please login again",
                status: false
            })

            return;
        }else{
           
            req.user = decoded; // Attach the decoded user info to the request object
        }
       
        

       })

        

        



    }
    next();
})

const connectionString = "mongodb+srv://admin:123@cluster001.llader3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster001"; // Example connection string

mongoose.connect(connectionString).then(()=>{
    console.log("Connected to MongoDB successfully");
}).catch((error)=>{
    console.error("Failed to connect to MongoDB",error.message);
})





app.use("/products",productRoute)

app.use("/Oders",ordersRoute)

app.use("/users", userRouter); // Assuming userRouter is defined in Routes/userRouter.js


//Start the server

app.listen(6000, ()=>{
    console.log('Server is running on port 6000');
   
})





