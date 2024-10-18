import express, { Express,Application } from "express";
import cors from 'cors'
import router from "./routes/route";
import rateLimit from "express-rate-limit";
const app= express()
app.use(express.json())

app.use(cors({
    origin: '*', 
}));

const limiter= rateLimit({
    windowMs:15*60*1000,
    limit:50,
    message:'Çok fazla istek yapıldı',
    standardHeaders:true,
    legacyHeaders:false
})
app.use(limiter)
app.use('/',router)

app.listen(5000,()=>{
    console.log("server is running")
})