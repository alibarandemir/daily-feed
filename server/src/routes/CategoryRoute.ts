import express from "express";
import { getUserCategories, updateUserCategories } from "../controller/CategoryController";
import { verifyTokenMiddleware } from "../middleware/verifyToken";

const CategoryRouter=express.Router();


CategoryRouter.get('/getCategories',verifyTokenMiddleware,getUserCategories);
CategoryRouter.post('/updateUserCategories',verifyTokenMiddleware,updateUserCategories);


export default CategoryRouter