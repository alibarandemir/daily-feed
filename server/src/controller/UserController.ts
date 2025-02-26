import { Request, Response } from "express"
import { PrismaClient,Prisma,ActionType } from "@prisma/client";
const prisma =new PrismaClient();
const voteNews= async(req:Request,res:Response)=>{
    try{
        const {type,newsLink}= req.body;
        const userId=req.userId;
        console.log(userId)
        const news = await prisma.news.findUnique({
            where: { link: newsLink },
            select: { id: true },
        });
        if(!news){
            return res.status(404).json({ message: "Haber bulunamadı." });
        }
        //kullanıcı daha önce oy vermişmi onun kontrolünü yap
        const existingVote = await prisma.votes.findFirst({
            where: {
                userId: userId,
                newsId:news?.id
            }
        });
        if(existingVote){
            if(type===existingVote.type){
                await undoVote(existingVote.id, existingVote.type, news.id,userId);
                return res.status(200).json({ message: "Oy başarıyla geri alındı" });
            }
            
            else  {
                await undoVote(existingVote.id, existingVote.type, news.id,userId);
                //burdan devam edip oy verilsin
            }
        }

        if(type=='upvote'){
            const updatedNews=await prisma.$transaction([
                prisma.news.update({
                    where:{
                        link:newsLink
                    },
                    data:{
                        upvote: {
                            increment: 1
                            
                        }
                    }
                }),
                prisma.votes.create({
                    data:{
                        userId: userId,
                        newsId: news.id,
                        type: 'upvote'
                    }
                   
                }),
                prisma.userNewsActions.create({
                    data:{
                        userId: userId,
                        newsId: news.id,
                        actionType: type.toUpperCase(),
                    }
                })
            ])
            
        }
        else{
            const updatedNews=await prisma.$transaction([
                prisma.news.update({
                    where:{
                        link:newsLink
                    },
                    data:{
                        downvote: {
                            increment: 1
                            
                        }
                    }
                }),
                prisma.votes.create({
                    data:{
                        userId: userId,
                        newsId: news.id,
                        type: 'downvote',
                    }
                   
                }),
                prisma.userNewsActions.create({
                    data:{
                        userId: userId,
                        newsId: news.id,
                        actionType: type.toUpperCase(),
                    }
                })
            ])
        }
        return res.status(200).json({message:"Başarıyla Oy Verildi"})
    }
    catch(e:any){
        console.error(e.message)
        return res.status(404).json({message:"Oy verirken Hata oluştu"})
    }
}

const undoVote=async(voteId:number,type:string,newsId:number,userId:number)=>{
    try{
        const actionType = type.toUpperCase() as ActionType;
        await prisma.$transaction([
            prisma.votes.delete({
                where: {
                    id: voteId
                }
            }),
            prisma.news.update({
                where: {
                    id: newsId
                },
                data: {
                    [type]: {
                        decrement: 1
                    }
                }
            }),
            prisma.userNewsActions.deleteMany({
                where: {
                    userId: userId,
                    newsId:newsId ,
                    actionType: actionType,
                },
               
            })
        ])

        // Update the news vote count
       
    }
    catch(e:any){
        throw e;
    }
}
const saveNews=async(req:Request,res:Response)=>{
    const {newsLink}=req.body;
    const userId=req.userId
    try{
        const news = await prisma.news.findUnique({
            where: { link: newsLink },
            select: { id: true },
        });

        if (!news) {
            return res.status(404).json({ message: "Haber bulunamadı." });
        }

        const newsId = news.id;
        const existingSaved= await prisma.savedNews.findFirst(
            {
                where: {
                    userId: userId,
                    newsId: newsId
                }
            }
        )
        if(existingSaved){
            await prisma.savedNews.delete({
                where: {
                    id: existingSaved.id
                }
            })
            return res.status(200).json({ message: "Kaydetme başarıyla geri alındı" });
        }
        const savedNews=await prisma.$transaction([
            prisma.savedNews.create({
                data:{
                    userId:userId,
                    newsId:newsId,
                }
            }),
            prisma.userNewsActions.create({
                data:{
                    userId:userId,
                    newsId:newsId,
                    actionType: "SAVE",
                }
            })
        ])
        return res.status(200).json({ message: "Kaydetme başarıyla gerçekleşti" });
    }
    catch(e){

    }
}

import { GetNewsDto } from "../Dtos/NewsDtos";

const getSavedNews = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        const { offset } = req.query;
        const offsetValue = parseInt(offset as string, 10);

        if (isNaN(offsetValue)) {
            return res.status(400).json({ message: "Geçersiz offset değeri" });
        }

        const savedNews = await prisma.savedNews.findMany({
            where: {
                userId: userId
            },
            skip: offsetValue,
            take: 9,
            include: {
                news: {
                    include: {
                        source: true,
                        category: true,
                        actions: {
                            where: { userId: userId },
                            select: {
                                actionType: true,
                            },
                        },
                    },
                },
            },
        });

        const news = savedNews.map((item) => {
            const newsItem = item.news;
            const sourceName = newsItem.source ? newsItem.source.name : "";
            const summary = newsItem.summary || "";
            const actions = newsItem.actions.map((action) => action.actionType);

            return new GetNewsDto(
                newsItem.id.toString(),
                newsItem.title,
                newsItem.link,
                newsItem.description,
                newsItem.image,
                newsItem.upvote,
                newsItem.downvote,
                sourceName,
                newsItem.category.categoryName,
                summary,
                actions,
                item.news.createdAt.toISOString()
            );
        });

        return res.status(200).json({ news: news });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Kaydedilen haberler çekilirken hata oluştu" });
    }
};


const getPreferences= async(req:Request,res:Response)=>{
    try{
        const userId=req.userId;
       
        const preferences=await prisma.preferences.findFirst({
            where:{
                userId:userId,
                
            },
            select:{
                theme:true,
                showVotePopup:true,
                
                
            }
        })
        return res.status(200).json({success:true,preferences:preferences})

    }
    catch(e){

    }
}
const changePreferences= async(req:Request,res:Response)=>{
    try{
        const userId=req.userId;
        const {preferencesKey,value}=req.body;
        const validKeys = Object.keys(Prisma.PreferencesScalarFieldEnum)

        if (!preferencesKey || value === undefined) {
            return res.status(400).json({ error: "preferencesKey ve value gereklidir." });
        }
        if (!validKeys.includes(preferencesKey)) {
            return res.status(400).json({ error: "Geçersiz preferencesKey." });
          }
          const updatedPreference = await prisma.preferences.updateMany({
            where: {
              userId: userId,
            },
            
            data: {
              [preferencesKey]: value,
            },
            
          });
          const preferences=await prisma.preferences.findUnique({where:{userId:userId}})
          console.log(preferences)
          return res.status(200).json({ message: "Tercih başarıyla güncellendi.",preferences:preferences });
    }
    catch(e:any){
        console.error("Tercih güncellenirken bir hata oluştu:", e.message);
        return res.status(500).json({ error: "Bir hata oluştu. Lütfen tekrar deneyin." });
    }
}
//infinite scroll da kullanabilirsin
const getUserFeed = async (req: Request, res: Response) => {
    try {
        const userId = req.userId; // Kullanıcı ID'si (JWT ya da middleware ile alınır)
        const page = typeof req.query.page === "string" ? parseInt(req.query.page, 10) : 1;
        console.log(req.query.page);
        const take = 10
        const skip = (page - 1) * take;

        if (!userId) {
            return res.status(401).json({ message: "Kullanıcı oturum açmamış." })
        }

        // Kullanıcının seçtiği kategorileri al
        const userCategories = await prisma.userCategory.findMany({
            where: { userId },
            select: { categoryId: true },
        });

        const categoryIds = userCategories.map((uc) => uc.categoryId);

        if (categoryIds.length === 0) {
            return res.status(404).json({ news: [], message: "Hiç kategori seçilmemiş." });
        }

        // Seçilen kategorilere ait haberleri getir
        const news = await prisma.news.findMany({
            where: { categoryId: { in: categoryIds } },
            orderBy: [
                { createdAt: "desc" }, // En yeni haberler önce
                { upvote: "desc" },    // Daha çok beğeni alan haberler sonra
            ],
            skip: skip,
            take: take + 1, // Bir sonraki sayfada daha fazla haber olup olmadığını kontrol etmek için bir fazladan al
            select: {
                id: true,
                title: true,
                link: true,
                description: true,
                image: true,
                upvote: true,
                downvote: true,
                category: { select: { categoryName: true } },
                source: { select: { name: true } },
                createdAt: true,
                actions: true,
                summary: true
            },
        });

        const hasMore = news.length > take;
        const results = news.slice(0, take).map((item) => {
            const sourceName = item.source ? item.source.name : "";
            const categoryName = item.category.categoryName;
            const summary = item.summary ? item.summary : "";
            const actions = item.actions ? item.actions.map((action: { actionType: string }) => action.actionType) : []; // Kullanıcı action bilgisi varsa ekle
            return new GetNewsDto(
                item.id.toString(),
                item.title,
                item.link,
                item.description,
                item.image,
                item.upvote,
                item.downvote,
                sourceName,
                categoryName,
                summary,
                actions,
                item.createdAt.toISOString()
            );
        });

        return res.status(200).json({ news: results, hasMore: hasMore });
    } catch (error) {
        console.error("Feed oluşturulurken hata:", error);
        return res.status(500).json({ message: "Sunucu hatası." });
    }
};


export {voteNews,saveNews,getSavedNews,getPreferences,changePreferences,getUserFeed}