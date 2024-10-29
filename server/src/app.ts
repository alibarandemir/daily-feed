import express, { Express,Application } from "express";
import cors from 'cors'
import router from "./routes/route";
import rateLimit from "express-rate-limit";
import cron from 'node-cron'
import { PrismaClient } from "@prisma/client";
import { fetchRssFeeds } from "./utils/fetchRssFeeds";
import { saveNewsToDb } from "./utils/saveNewsToDb";
const prisma= new PrismaClient()
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
//node cron uygulanacak
async function main (){
    console.log("rssden veriler geliyor")
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