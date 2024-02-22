
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from  "./routes/userRouter.js";
import jobRouter from './routes/jobRouter.js';
import applicationRouter from './routes/applicationRouter.js'
import { dbConnection } from "./database/dbConnection.js";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js'; 
import { errorMiddleware } from "./middlewares/error.js";



const app =express()
dotenv.config({path:"./config/config.env"})
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
  };
  
  app.use(cors(corsOptions));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cookieParser())
app.use(express.json())//middleware to parse json request body  
app.use(express.urlencoded( { extended : true} ));// middleware for url encoded data
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'./temp/'
}))




app.use("/api/users",userRouter)
app.use("/api/application",applicationRouter)
app.use("/api/job",jobRouter)
dbConnection();


app.use(errorMiddleware); //Global Error handling Middleware
export default app;