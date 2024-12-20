import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import connectDB from "./db/index.js"

const app=express()
dotenv.config({
    path:'./.env'
  })

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,

}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


connectDB()
  .then(()=>{
    app.on("error",(error)=>{
      console.log("ERR: ",error)
      throw error
    })
    app.listen(process.env.PORT || 8000,()=>{
      console.log(`Server is running at port : ${process.env.PORT}`)
    })
  })
  .catch((err)=>{
    console.error("MONGO DB Connection Failed !", err)
  });

//routes import
import Router from "./routes/routes.js"

// routes declaration
app.get("/", (req, res) => {
    res.send("Hello, this is the root route!");
});
app.use("/api/v1/",Router) //http://localhost:8000/api/v1/users/register or users/login

export default app