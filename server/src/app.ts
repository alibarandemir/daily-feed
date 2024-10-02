import express, { Express,Application } from "express";
import cors from 'cors'
import router from "./routes/route";
const app= express()
app.use(express.json())

app.use(cors({
    origin: '*', 
}));
app.use('/',router)

app.listen(5000,()=>{
    console.log("server is running")
})