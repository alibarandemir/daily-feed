import express from "express";
import { getAllResources, getResourcesSome } from "../controller/SourceController";
import { login, logout, register, verifyEmail } from "../controller/AuthController";
import  { verifyTokenRoute } from "../middleware/verifyToken";
import {verifyTokenMiddleware} from "../middleware/verifyToken";
import { changePreferences, getPreferences } from "../controller/UserController";


const UserRouter= express.Router()

UserRouter.post('/register',register)
UserRouter.post('/verifyEmail',verifyEmail)
UserRouter.post('/login',login)
UserRouter.post('/logout',logout)
UserRouter.get('/verifyToken',verifyTokenRoute)
UserRouter.get('/getPreferences',verifyTokenMiddleware,getPreferences)
UserRouter.put('/changePreferences',verifyTokenMiddleware,changePreferences)


export  {UserRouter};