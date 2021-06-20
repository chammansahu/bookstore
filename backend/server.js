import express from 'express';
import dotenv from 'dotenv';
import colors from "colors";
import connectDB from "./config/db.js";
 import mongoose from 'mongoose';
 import path from 'path';
//  const utilRoute = require("./util")
 import  {isAuth} from './util.js';
 import userRoute from './routes/userRoute.js';
 import productRoute from './routes/productRoute.js';
 import uploadRouter from './routes/uploadRouter.js';
import bodyParser from 'body-parser';
import orderRouter from './routes/orderRouter.js';
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
//import {Payouts}   from 'cashfree-sdk';
// const { Payouts } = require('./cashfree-sdk');

 
dotenv.config();
connectDB();
// Instantiate Cashfree Payouts
/* const payoutsInstance = new Payouts({
	env: 'TEST',
	clientId: '3021804476e41d8422a2cb5f681203',
	clientSecret: '64b9b4cbf93b5dbb6b12cd1e59a28436634804bd',
  });


  async function addBeneficiary() {
	try {
	  const response = await payoutsInstance.beneficiary.add({
		beneId: 'JOHN18012',
		name: 'john doe',
		email: 'johndoe@cashfree.com',
		phone: '9876543210',
		bankAccount: '00001111222233',
		ifsc: 'HDFC0000001',
		address1: 'ABC Street',
		city: 'Bangalore',
		state: 'Karnataka',
		pincode: '560001',
	  });
  
	  console.log(response);
	} catch (e) {
	  console.error(e);
	}
  }
*/
//console.log("dddddddddddd",payoutsInstance);





const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/uploads', uploadRouter);
app.use("/api/users/",userRoute);
app.use("/api/products", productRoute)
app.use('/api/orders', orderRouter);
//app.use('/api/getaddress', getaddress);


app.get('/api/config/paypal', (req, res) => {
	res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
  });

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
