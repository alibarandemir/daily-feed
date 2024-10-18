import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { GetAllResourceDto } from "../Dtos/ResourceDtos";

const prisma = new PrismaClient();
//admin 
const addResource= async()=>{

}
//admin
const deleteResource=async()=>{

}

const getResourcesSome = async (req: Request, res: Response) => {
  try {
    const resources = await prisma.source.findMany({
        take:3
    });
    res.status(200).json({
      sources: resources,
      message: "veriler geldi",
    });
  } catch (e:any) {
    res.status(500).json({message:e.message})
  }
};
const getAllResources = async (req: Request, res: Response) => {
    const page = typeof req.query.page === "string" ? parseInt(req.query.page, 10) : 1;
    const take= 10
    const skip=(page-1)*take
  const resources = await prisma.source.findMany({
    skip: (page - 1) * 10,
    take: 10,
  });
  const totalSources= await prisma.source.count()
  const hasMore= resources.length!==0
  console.log(resources)
  console.log(hasMore)
  
  const resourceDtos = resources.map((resource) => {
    return new GetAllResourceDto(resource.name, resource.sourceImg);
  });
  res.status(200).json({ sources: resourceDtos,hasMore:hasMore });
};



export { getAllResources, getResourcesSome };
