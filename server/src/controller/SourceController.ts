import { Request,Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma= new PrismaClient()

const getResourcesSome= async (req:Request,res:Response)=>{
    try{
        console.log("a")
        const resources= await prisma.source.findMany({
            take:3
        })
        console.log(resources)
        //caching mantığı uygula
        res.status(200).json({
            sources:resources,
            message:"veriler geldi"

        })
    }
    catch(e){

    }
}
const getAllResources=(req:Request,res:Response)=>{

}




export {getAllResources,getResourcesSome}