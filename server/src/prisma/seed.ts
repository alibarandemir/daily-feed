import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


async function main(){
    const categoryGundem=await prisma.category.create({
        data:{
            categoryName:"Gündem",
        }
    })
    const categoryBilim= await prisma.category.create({
        data:{
            categoryName:"Bilim"
        }
    })
    const categoryYazilim= await prisma.category.create({
        data:{
            categoryName:"Yazılım"
        }
    })
    const categoryEkonomi= await prisma.category.create({
        
        data:{
            categoryName:"Ekonomi"
        }
    })
    const evrimAgaci= await prisma.source.create({
        data:{
            name:"Evrim Ağacı",
            sourceImg:"",
        }
    })
    const euroNews= await prisma.source.create({
        data:{
            name:"Euronews",
            sourceImg:"https://res.cloudinary.com/dsfjmblpe/image/upload/v1727809159/channels4_profile_zxn80u.jpg"
        }
    })
    const evrimAgaciRssGundem= await prisma.rssFeed.create({
        data:{
            rssUrl:"https://evrimagaci.org/rss.xml",
            categoryId:1,
            sourceId:1
        }
    })
    const evrimAgaciRssEkonomi= await prisma.rssFeed.create({
        data:{
            rssUrl:"https://evrimagaci.org/kategori/ekonomi-iktisat-400/rss.xml",
            categoryId:1,
            sourceId:1
        }
    })
    const evrimAgaciRssPsikoloji= await prisma.rssFeed.create({
        data:{
            rssUrl:"https://evrimagaci.org/kategori/psikoloji-525/rss.xml",
            categoryId:1,
            sourceId:1
        }
    })
    
    

}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })