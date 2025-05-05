import { Request,Response } from "express"
import { Prisma, PrismaClient } from "@prisma/client"
import { skip } from "node:test"
import { GetNewsDto } from "../Dtos/NewsDtos"
import axios from "axios"
const prisma= new PrismaClient()




const getNews = async (req: Request, res: Response) => {
    try {
        const userId=(req as any).userId
        console.log(userId)
        const isAuthenticated= !!userId
        console.log("haberler getirirken"+isAuthenticated)
        const { offset } = req.query;
        const offsetValue = parseInt(offset as string, 10); // offset değerini tam sayıya çeviriyoruz

        if (isNaN(offsetValue)) {
            return res.json({ message: "Geçersiz offset değeri" });
        }
        //kullanıcı auth olmuşsa haber gönderirken yaptığı actionı da gönder
        const results = await prisma.news.findMany({
            skip: offsetValue, // Offset'i number olarak kullan
            take: 9,
            orderBy: [
                { isHot: 'desc' },  // isHot haberler önce gelecek
                { createdAt: 'desc' } // Daha sonra en yeni haberler listelenecek
            ],
            include: {
                source: true,
                category:true,
                actions: isAuthenticated
          ? {
              where: { userId: userId }, // Sadece auth olmuş kullanıcıya ait action bilgisi
              select: {
                actionType: true, // Action türünü alıyoruz
              },
            }
          : false, 
            },
        });
        

        const news = results.map((item) => {
            const sourceName = item.source ? item.source.name : "";
            const summary= item.summary? item.summary:"";
            const actions = isAuthenticated
            ? item.actions.map((action) => action.actionType)
            : []; // Kullanıcı action bilgisi varsa ekle
            const isVoted=actions.includes("UPVOTE")||actions.includes("DOWNVOTE");
            const isSaved=actions.includes("SAVE");
            console.log(actions)
            return new GetNewsDto(
                item.id.toString(),
                item.title,
                item.link,
                item.description,   
                item.image,
                item.upvote,
                item.downvote,
                sourceName,
                item.category.categoryName,
                summary,
                actions,
                item.createdAt.toISOString(),
            );
        });

        return res.status(200).json({ news: news, message: "Haberler aktarıldı" });
    } catch (e: any) {
        return res.json({ error: e.message });
    }
};

const getNewsBySourceName=async(req:Request,res:Response)=>{
    try {
        const userId=(req as any).userId
        const isAuthenticated= !!userId
        const { offset,sourceName } = req.query;
        const offsetValue = parseInt(offset as string, 10); // offset değerini tam sayıya çeviriyoruz

        if (isNaN(offsetValue)) {
            return res.status(400).json({ message: "Geçersiz offset değeri" });
        }
        const results = await prisma.news.findMany({
            skip: offsetValue, // Offset'i number olarak kullan
            take: 9,
            orderBy: [
                { isHot: 'desc' },  // isHot haberler önce gelecek
                { createdAt: 'desc' } // Daha sonra en yeni haberler listelenecek
            ],
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
                category:true,
                actions:isAuthenticated
            },
        });

        const news = results.map((item) => {
            const sourceName = item.source ? item.source.name : "";
            const summary= item.summary? item.summary:"";
            const actions = isAuthenticated
            ? item.actions.map((action) => action.actionType)
            : []; // Kullanıcı action bilgisi varsa ekle
            return new GetNewsDto(
                item.id.toString(),
                item.title,
                item.link,
                item.description,
                item.image,
                item.upvote,
                item.downvote,
                sourceName,
                item.category.categoryName,
                summary,
                actions,
                item.createdAt.toISOString(),
            );
        });

        return res.json({ news: news, message: "Haberler aktarıldı" });
    } catch (e: any) {
        return res.status(500).json({ error: e.message });
    }
}
const getNewsByCategoryName=async(req:Request,res:Response)=>{
    try {
        const userId=(req as any).userId
        const isAuthenticated= !!userId
        const { offset,categoryName } = req.query;
        const offsetValue = parseInt(offset as string, 10); // offset değerini tam sayıya çeviriyoruz

        if (isNaN(offsetValue)) {
            return res.status(400).json({ message: "Geçersiz offset değeri" });
        }
        const results = await prisma.news.findMany({
            skip: offsetValue, // Offset'i number olarak kullan
            take: 9,
            orderBy: [
                { isHot: 'desc' },  // isHot haberler önce gelecek
                { createdAt: 'desc' } // Daha sonra en yeni haberler listelenecek
            ],
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
                category:true,
                actions:isAuthenticated
            },
        });

        const news = results.map((item) => {
            const sourceName = item.source ? item.source.name : "";
            const summary= item.summary? item.summary:"";
            const actions = isAuthenticated
            ? item.actions.map((action) => action.actionType)
            : []; // Kullanıcı action bilgisi varsa ekle
            return new GetNewsDto(
                item.id.toString(),
                item.title,
                item.link,
                item.description,
                item.image,
                item.upvote,
                item.downvote,
                sourceName,
                item.category.categoryName,
                summary,
                actions,
                item.createdAt.toISOString()
            );
        });

        return res.json({ news: news, message: "Haberler aktarıldı" });
    } catch (e: any) {
        return res.status(500).json({ error: e.message });
    }
}
const searchNews=async(req:Request,res:Response)=>{
    try {
        const userId=(req as any).userId
        const isAuthenticated= !!userId
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
                category:true,
                actions:isAuthenticated 
            },
        });

        const news = results.map((item) => {
            const sourceName = item.source ? item.source.name : "";
            const summary= item.summary? item.summary:"";
            const actions = isAuthenticated
            ? item.actions.map((action) => action.actionType)
            : []; // Kullanıcı action bilgisi varsa ekle
            return new GetNewsDto(
                item.id.toString(),
                item.title,
                item.link,
                item.description,
                item.image,
                item.upvote,
                item.downvote,
                sourceName,
                item.category.categoryName,
                summary,
                actions,
                item.createdAt.toISOString()
            );
        });

        return res.json({ news: news, message: "Haberler aktarıldı" });
    } catch (e: any) {
        return res.status(500).json({ error: e.message });
    }
}
const getSummaryByNewsId = async (req: Request, res: Response) => {
    try {
        const { newsId } = req.query;

        if (!newsId || Array.isArray(newsId)) {
            return res.status(400).json({ message: 'Geçersiz haber ID' });
        }

        const newsIdNumber: number = parseInt(newsId as string, 10);

        // Haber veritabanında var mı kontrol et
        const news = await prisma.news.findUnique({
            where: { id: newsIdNumber }
        });

        if (!news) {
            return res.status(404).json({ message: 'Haber bulunamadı' });
        }

        if (!news.link) {
            return res.status(400).json({ message: 'Haberin geçerli bir linki yok' });
        }
        console.log(newsIdNumber);
        console.log(news.link);
        // Dış API'den özet alma
        try {
            const response = await axios.get("https://scraping-service-aqh2crana6bqfefm.francecentral-01.azurewebsites.net/api/summary/getSummary", {
                params: { newsUrl: news.link }
            });
            console.log(response.data);
            if (!response.data || !response.data.summary) {
                return res.status(500).json({ message: 'Özet oluşturulurken hata oluştu' });
            }
            const updatedNews= await prisma.news.update({
                where:{
                    id:newsIdNumber
                },
                data:{
                    summary:response.data.summary
                }
            })
            return res.status(200).json({ message: 'Özet oluşturuldu', summary: response.data.summary,success:true });

        } catch (apiError:any) {
            console.error("API isteği sırasında hata oluştu:", apiError.message);

            // Eğer API isteği başarısız olursa, kendi server'ınız bir yanıt dönecek
            return res.json({ 
                message: 'Özet oluşturulamadı daha sonra tekrar deneyiniz',
                summary:'Özet bulunamadı',
                success:false
                
            });
        }

    } catch (e: any) {
        console.error("Hata:", e.message);
        return res.status(500).json({ message: 'İç sunucu hatası', error: e.message });
    }
};


export  {getNews,getNewsBySourceName,getNewsByCategoryName,searchNews,getSummaryByNewsId}