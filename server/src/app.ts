import express, { Express,Application } from "express";
import cors from 'cors'
import router from "./routes/route";
import rateLimit from "express-rate-limit";
import cron from 'node-cron'
import cookieParser from 'cookie-parser';
import { PrismaClient } from "@prisma/client";
import { fetchRssFeeds } from "./utils/fetchRssFeeds";
import { saveNewsToDb } from "./utils/saveNewsToDb";
import { initializeRedisClient } from "./cache/redis";
const prisma= new PrismaClient()
const app= express()
app.use(express.json())

app.use(cors({
    origin: '*', 
}));
app.use(cookieParser())

// const limiter= rateLimit({
//     windowMs:15*60*1000,
//     limit:50,
//     message:'Çok fazla istek yapıldı',
//     standardHeaders:true,
//     legacyHeaders:false
// })
// app.use(limiter)

//initializeRedisClient();
app.use('/',router)
//node cron uygulanacak
async function main (){
    const rssFeeds=await prisma.rssFeed.findMany()
    for(const rss of rssFeeds){
        const news=await fetchRssFeeds(rss.rssUrl)
        console.log(news);
        await saveNewsToDb(news,rss.sourceId,rss.categoryId)
    }
}
main()
app.listen(5000,()=>{
    console.log("server is running")
})