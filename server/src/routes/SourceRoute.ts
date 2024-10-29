import express from "express";
import { getAllResources, getResourcesSome } from "../controller/SourceController";

const SourceRouter= express.Router()

SourceRouter.get('/getResourcesForSidebar',getResourcesSome)
SourceRouter.get('/getAllResources',getAllResources)

SourceRouter.post('/addResource')


export  {SourceRouter};