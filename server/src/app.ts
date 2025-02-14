import express, { Express,Application } from "express";
import cors from 'cors'
import router from "./routes/route";
import rateLimit from "express-rate-limit";
import cron from 'node-cron'
import cookieParser from 'cookie-parser';
import { PrismaClient } from "@prisma/client";
import { fetchRssFeeds } from "./utils/fetchRssFeeds";
import { saveNewsToDb } from "./utils/saveNewsToDb";
import {  initializeRedisClient,setRedisConnected } from "./cache/redis";
import { incrementClickCounter } from "./cache/redis";

import dotenv from 'dotenv';
import addHotTagToNews from "./utils/addHotTagToNews";
dotenv.config();
const prisma= new PrismaClient()
const app= express()
app.use(express.json())

app.use(cors({
    origin: 'http://localhost:3000', // Frontend'in çalıştığı adres
    credentials: true,
    methods:'GET,POST,PUT,DELETE'
  }));
app.use(cookieParser())

// const limiter= rateLimit({
//     windowMs:15*60*1000,
//     limit:1000,


//     message:'Çok fazla istek yapıldı',
//     standardHeaders:true,
//     legacyHeaders:false
// })
// app.use(limiter)


app.use('/',router)
// kaç haber gerçekten okundu
app.post('/api/track-click',(req,res)=>{
    try{
        const {newsId}=req.body
        console.log(newsId)
        console.log("bbb")
        incrementClickCounter(`click_count:${newsId}`)
        console.log("track click!!")
        

    }
    catch(e:any){
      console.error(e.message)
    }
})



cron.schedule("*/2 * * * *", () => {
  console.log("Cron job çalıştı: addHotTagToNews");
  addHotTagToNews(); 
});





//node cron uygulanacak
async function main (){
    try {
        //redis olmadığında hata veriyor şuan
        //await initializeRedisClient();
      } catch (error) {
        console.error("Redis connection failed, but the application will continue without caching:", error);
       
      }
    const rssFeeds=await prisma.rssFeed.findMany()
    for(const rss of rssFeeds){
        const news=await fetchRssFeeds(rss.rssUrl)
        await saveNewsToDb(news,rss.sourceId,rss.categoryId)
    }
}
main()
app.listen(5000,()=>{
    console.log("server is running")
})