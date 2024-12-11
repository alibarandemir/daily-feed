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
                newsItem.title,
                newsItem.link,
                newsItem.description,
                newsItem.image,
                newsItem.upvote,
                newsItem.downvote,
                sourceName,
                newsItem.category.categoryName,
                summary,
                actions
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
          return res.status(200).json({ message: "Tercih başarıyla güncellendi." });
    }
    catch(e:any){
        console.error("Tercih güncellenirken bir hata oluştu:", e.message);
        return res.status(500).json({ error: "Bir hata oluştu. Lütfen tekrar deneyin." });
    }
}

export {voteNews,saveNews,getSavedNews,getPreferences,changePreferences}