import express from "express";
import { getAllResources, getResourcesSome } from "../controller/SourceController";
import { forgotPassword, googleAuthCallback, login, logout, redirectGoogleAuth, register, resetPassword, verifyEmail } from "../controller/AuthController";
import  { verifyTokenRoute } from "../middleware/verifyToken";
import {verifyTokenMiddleware} from "../middleware/verifyToken";
import { changePreferences, getMe, getPreferences } from "../controller/UserController";


const UserRouter= express.Router()

UserRouter.post('/register',register)
UserRouter.post('/verifyEmail',verifyEmail)
UserRouter.post('/login',login)
UserRouter.post('/logout',logout)
UserRouter.post('/forgotPassword',forgotPassword)
UserRouter.post('/resetPassword',resetPassword)
UserRouter.get('/verifyToken',verifyTokenRoute)
UserRouter.get('/auth/google',redirectGoogleAuth)
UserRouter.get('/api/auth/callback/google',googleAuthCallback)
UserRouter.get('/getPreferences',verifyTokenMiddleware,getPreferences)
UserRouter.put('/changePreferences',verifyTokenMiddleware,changePreferences)
UserRouter.get('/me',verifyTokenMiddleware,getMe)


export  {UserRouter};