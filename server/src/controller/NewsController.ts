import { Request,Response } from "express"
import { Prisma, PrismaClient } from "@prisma/client"
import { skip } from "node:test"
const prisma= new PrismaClient()




const getNews= async (req:Request,res:Response)=>{
    const results= await prisma.news.findMany({
        skip:20,
        take:10,
        
    })

}