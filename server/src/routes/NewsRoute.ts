import express from "express"
import { getNews,getNewsByCategoryName,getNewsBySourceName, searchNews } from "../controller/NewsController";
import { redisCachingMiddleware } from "../middleware/redisCaching";


const NewsRouter= express.Router();
NewsRouter.get('/getNews',getNews);
NewsRouter.get('/getNewsBySourceName',getNewsBySourceName)
NewsRouter.get('/getNewsByCategoryName',getNewsByCategoryName)
NewsRouter.get('/search',searchNews)

export default NewsRouter