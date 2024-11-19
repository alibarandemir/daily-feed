import express from "express";
import { getAllResources, getResourcesSome } from "../controller/SourceController";
import { login, register, verifyEmail } from "../controller/UserController";
import verifyToken, { verifyTokenRoute } from "../middleware/verifyToken";


const UserRouter= express.Router()

UserRouter.post('/register',register)
UserRouter.post('/verifyEmail',verifyEmail)
UserRouter.post('/login',login)
UserRouter.get('/verifyToken',verifyTokenRoute)


export  {UserRouter};