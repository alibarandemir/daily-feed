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
            take: 10,
            include: {
                source: true, 
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
                summary
            );
        });

        return res.json({ news: news, message: "Haberler aktarıldı" });
    } catch (e: any) {
        return res.status(500).json({ error: e.message });
    }
};

const getNewsBySourceId=async(req:Request,res:Response)=>{

}
const getNewsByCategoryId=async(req:Request,res:Response)=>{

}
export  {getNews,getNewsBySourceId,getNewsByCategoryId}