import { Request,Response } from "express"
import { Prisma, PrismaClient } from "@prisma/client"
import { skip } from "node:test"
import { GetNewsDto } from "../Dtos/NewsDtos"
const prisma= new PrismaClient()




const getNews = async (req: Request, res: Response) => {
    try {
        const { offset } = req.query;
        const offsetValue = parseInt(offset as string, 10); // offset değerini tam sayıya çeviriyoruz

        if (isNaN(offsetValue)) {
            return res.status(400).json({ message: "Geçersiz offset değeri" });
        }
        const results = await prisma.news.findMany({
            skip: offsetValue, // Offset'i number olarak kullan
            take: 9,
            include: {
                source: true,
                category:true 
            },
        });

        const news = results.map((item) => {
            const sourceName = item.source ? item.source.name : "";
            const summary= item.summary? item.summary:"";
            return new GetNewsDto(
                item.title,
                item.link,
                item.description,
                item.image,
                item.upvote,
                item.downvote,
                sourceName,
                item.category.categoryName,
                summary
            );
        });

        return res.json({ news: news, message: "Haberler aktarıldı" });
    } catch (e: any) {
        return res.status(500).json({ error: e.message });
    }
};

const getNewsBySourceName=async(req:Request,res:Response)=>{
    try {
        const { offset,sourceName } = req.query;
        const offsetValue = parseInt(offset as string, 10); // offset değerini tam sayıya çeviriyoruz

        if (isNaN(offsetValue)) {
            return res.status(400).json({ message: "Geçersiz offset değeri" });
        }
        const results = await prisma.news.findMany({
            skip: offsetValue, // Offset'i number olarak kullan
            take: 9,
            where:{
                source:{
                    name:{
                        equals:sourceName as string,
                        mode:'insensitive'
                    }
                }
            },
            include: {
                source: true,
                category:true 
            },
        });

        const news = results.map((item) => {
            const sourceName = item.source ? item.source.name : "";
            const summary= item.summary? item.summary:"";
            return new GetNewsDto(
                item.title,
                item.link,
                item.description,
                item.image,
                item.upvote,
                item.downvote,
                sourceName,
                item.category.categoryName,
                summary
            );
        });

        return res.json({ news: news, message: "Haberler aktarıldı" });
    } catch (e: any) {
        return res.status(500).json({ error: e.message });
    }
}
const getNewsByCategoryName=async(req:Request,res:Response)=>{
    try {
        const { offset,categoryName } = req.query;
        const offsetValue = parseInt(offset as string, 10); // offset değerini tam sayıya çeviriyoruz

        if (isNaN(offsetValue)) {
            return res.status(400).json({ message: "Geçersiz offset değeri" });
        }
        const results = await prisma.news.findMany({
            skip: offsetValue, // Offset'i number olarak kullan
            take: 9,
            where:{
                category:{
                    categoryName:{
                        equals:categoryName as string,
                        mode:'insensitive'
                    }
                }
            },
            include: {
                source: true,
                category:true 
            },
        });

        const news = results.map((item) => {
            const sourceName = item.source ? item.source.name : "";
            const summary= item.summary? item.summary:"";
            return new GetNewsDto(
                item.title,
                item.link,
                item.description,
                item.image,
                item.upvote,
                item.downvote,
                sourceName,
                item.category.categoryName,
                summary
            );
        });

        return res.json({ news: news, message: "Haberler aktarıldı" });
    } catch (e: any) {
        return res.status(500).json({ error: e.message });
    }
}
const searchNews=async(req:Request,res:Response)=>{
    try {
        const { offset,q } = req.query;
        console.log(q)
        const offsetValue = parseInt(offset as string, 10);
        if(typeof(q)!=='string'){
            return res.json({message:"Geçersiz arama değeri"})
        }
        const queryValue = q.replace(/\s+/g, '%'); 
        console.log(queryValue)
        if (isNaN(offsetValue)) {
            return res.json({ message: "Geçersiz offset değeri" });
        }
        const results = await prisma.news.findMany({
            skip: offsetValue, 
            take: 9,
            where:{
                OR:[
                    {
                        title:{
                            contains:queryValue,
                            mode:'insensitive'
                        }
                    },
                    {
                        description:{
                            contains:queryValue,
                            mode:'insensitive'
                        }
                    },
                    {
                        source:{
                            name:{
                                contains:queryValue,
                                mode:'insensitive'
                            }
                        }
                    }

                ]

                
            },
            include: {
                source: true,
                category:true 
            },
        });

        const news = results.map((item) => {
            const sourceName = item.source ? item.source.name : "";
            const summary= item.summary? item.summary:"";
            return new GetNewsDto(
                item.title,
                item.link,
                item.description,
                item.image,
                item.upvote,
                item.downvote,
                sourceName,
                item.category.categoryName,
                summary
            );
        });

        return res.json({ news: news, message: "Haberler aktarıldı" });
    } catch (e: any) {
        return res.status(500).json({ error: e.message });
    }
}

export  {getNews,getNewsBySourceName,getNewsByCategoryName,searchNews}