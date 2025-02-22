import { PrismaClient } from "@prisma/client"
import { getClickCountValue } from "../cache/redis"

const prisma= new PrismaClient()
const addHotTagToNews = async() => {
    const hotThreshOld=1
    try{
        const newsTwoDaysOld= await prisma.news.findMany({
            where:{
                createdAt:{
                    gte:new Date(Date.now()-2*24*60*60*1000)
                },
                isHot:false

            }
        })
        for(const news of newsTwoDaysOld){
            const clickCount= await getClickCountValue(`click_count:${news.id}`)??0
            const actionsCount=news.upvote+news.downvote
            //console.log(clickCount,impressionCount)
            const hotScore=clickCount*0.7+actionsCount*0.3
           // console.log(news.id,clickCount,hotScore)
            if(hotScore>hotThreshOld){
                console.log("hot tag eklendi")
                await prisma.news.update({
                    where:{
                        id:news.id
                    },
                    data:{
                        isHot:true
                    }
                })
            }
        }
        
    }
    catch(e:any){
        console.error(e.message)
    }

}
export default addHotTagToNews