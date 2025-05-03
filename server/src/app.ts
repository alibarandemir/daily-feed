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
    origin: ['https://sumflood-client.onrender.com','http://localhost:3000'], 
    credentials: true,
    methods:'GET,POST,PUT,DELETE'
  }));
app.use(cookieParser())

const limiter= rateLimit({
    windowMs:10*60*1000,
    limit:300,


    message:'Çok fazla istek yapıldı',
    standardHeaders:true,
    legacyHeaders:false
})
app.use(limiter)


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
  addHotTagToNews(); 
});

cron.schedule("0 */4 * * *",async()=>{
  const rssFeeds=await prisma.rssFeed.findMany()
  for(const rss of rssFeeds){
      const news=await fetchRssFeeds(rss.rssUrl)
      await saveNewsToDb(news,rss.sourceId,rss.categoryId)
  }
})





//node cron uygulanacak
async function main (){
    try {
        //redis olmadığında hata veriyor şuan
        //await initializeRedisClient();
        const rssFeeds=await prisma.rssFeed.findMany()
  for(const rss of rssFeeds){
      const news=await fetchRssFeeds(rss.rssUrl)
      await saveNewsToDb(news,rss.sourceId,rss.categoryId)
  }
      } catch (error) {
        console.error("Redis connection failed, but the application will continue without caching:", error);
       
      }
    
}
main()
const port=process.env.PORT||5000;
app.listen(port,()=>{
    console.log("server is running")
})