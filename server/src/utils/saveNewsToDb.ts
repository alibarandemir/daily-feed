import { PrismaClient } from "@prisma/client"
import axios from "axios"
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
                const response = await axios.get("api/summary/getSummary",{
                params:{newsLink:anews.link}
            })
                const summary:string |null=response.data;
    
                const newNews= await prisma.news.create({
                    data:{
                        title:anews.title,
                        link:anews.link,
                        description:anews.description,
                        image:anews.image,
                        upvote:0,
                        downvote:0,
                        sourceId:sourceId,
                        summary:summary

                    }
                })
            }
        }
    }
    catch(e:any){
        return e.message
    }

}