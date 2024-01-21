import { configDotenv } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

//configuring the dotenv
configDotenv();

//connecting the mongodb with secrete code MONGO
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to database!!!");
  })
  .catch(() => {
    console.log("Connection failed!!!");
  });


//creating the express app
const app = express();

//setting the body parser then pass the json from POST
app.use(express.json());

app.listen(8080, () => {
  console.log("Server is running on port 8080!!!");
});


//create a test api route
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

// create middleware & a function to control the errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
