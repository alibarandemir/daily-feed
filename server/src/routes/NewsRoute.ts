import express from "express"
import { getNews,getNewsByCategoryId,getNewsBySourceId } from "../controller/NewsController";


const NewsRouter= express.Router();
NewsRouter.get('/getNews',getNews);

export default NewsRouter