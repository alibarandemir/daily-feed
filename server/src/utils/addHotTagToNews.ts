import { PrismaClient } from "@prisma/client"
import { getClickCountValue } from "../cache/redis"
import { getImpressionCountValue } from "../cache/redis"
const prisma= new PrismaClient()
const addHotTagToNews = async() => {
    const hotThreshOld=100
    try{
        const newsTwoDaysOld= await prisma.news.findMany({
            where:{
                createdAt:{
                    lte:new Date(Date.now()-2*24*60*60*1000)
                },
                isHot:false

            }
        })
        for(const news of newsTwoDaysOld){
            const clickCount= await getClickCountValue(`click_count:${news.id}`)??0
            const impressionCount= await getImpressionCountValue(`impression_count:${news.id}`)??0
            const hotScore=clickCount*0.7+impressionCount*0.3
            if(hotScore>hotThreshOld){
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