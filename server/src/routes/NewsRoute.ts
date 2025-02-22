import express from "express"
import { getNews, getNewsByCategoryName, getNewsBySourceName, getSummaryByNewsId, searchNews } from "../controller/NewsController";
import { redisCachingMiddleware } from "../middleware/redisCaching";
import { getSavedNews, getUserFeed, saveNews, voteNews } from "../controller/UserController";
import { verifyTokenMiddleware, verifyTokenRoute, optionalAuthMiddleware } from "../middleware/verifyToken";


const NewsRouter = express.Router();


NewsRouter.get('/getNews',optionalAuthMiddleware,getNews);
NewsRouter.get('/getNewsBySourceName',  getNewsBySourceName)
NewsRouter.get('/getNewsByCategoryName', getNewsByCategoryName)
NewsRouter.get('/search', searchNews)
NewsRouter.post('/voteNews',verifyTokenMiddleware,voteNews)
NewsRouter.post('/saveNews',verifyTokenMiddleware,saveNews)
NewsRouter.get('/getSavedNews',verifyTokenMiddleware,getSavedNews)
NewsRouter.get('/getUserFeed',verifyTokenMiddleware,getUserFeed) 
NewsRouter.get('/getSummary',getSummaryByNewsId)




export default NewsRouter
