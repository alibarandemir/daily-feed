import { PrismaClient } from "@prisma/client"
interface Inews{
    title:string,
    link:string,
    description:string,
    image:string
}

export const saveNewsToDb=async(news:Inews[],sourceId:number)=>{
    const prisma= new PrismaClient()
    try{
        for(const anews  of news ){
            const existingNews= await prisma.news.findUnique({where:{link:anews.link}})
            if(existingNews){
                return
            }
            else{
                
                const newNews= await prisma.news.create({
                    data:{
                        title:anews.title,
                        link:anews.link,
                        description:anews.description,
                        image:anews.image,
                        upvote:0,
                        downvote:0,
                        sourceId:sourceId

                    }
                })
            }
        }
    }
    catch(e:any){
        
    }

}