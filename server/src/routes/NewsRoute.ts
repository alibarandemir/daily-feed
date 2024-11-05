import express from "express"
import { getNews,getNewsByCategoryName,getNewsBySourceName } from "../controller/NewsController";


const NewsRouter= express.Router();
NewsRouter.get('/getNews',getNews);
NewsRouter.get('/getNewsBySourceName',getNewsBySourceName)
NewsRouter.get('/getNewsByCategoryName',getNewsByCategoryName)

export default NewsRouter