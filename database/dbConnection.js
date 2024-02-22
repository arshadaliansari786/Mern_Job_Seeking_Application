import mongoose from "mongoose";

export const dbConnection= () =>{
    mongoose.connect(process.env.MONGO_URI,{
        connectTimeoutMS: 10000, // 10 seconds
        socketTimeoutMS: 45000,  // 45 seconds
        dbName:"Mern_Stack_Job_App"
    }).then(()=>
    {console.log("Database Connected Successfully")})
    .catch((err)=> {console.log("some error occurred").error(err)});
}

