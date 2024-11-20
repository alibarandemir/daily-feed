import express from "express"
import { getNews, getNewsByCategoryName, getNewsBySourceName, searchNews } from "../controller/NewsController";
import { redisCachingMiddleware } from "../middleware/redisCaching";

const NewsRouter = express.Router();

// Redis caching middleware'ini getNews route'una ekleyelim
NewsRouter.get('/getNews', redisCachingMiddleware(), getNews);

NewsRouter.get('/getNewsBySourceName', getNewsBySourceName)
NewsRouter.get('/getNewsByCategoryName', getNewsByCategoryName)
NewsRouter.get('/search', searchNews)
export default NewsRouter
