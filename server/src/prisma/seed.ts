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
    const categorySpor= await prisma.category.create({
        data:{
            categoryName:"Spor"
        }
    })
    const categoryPsikoloji= await prisma.category.create({
        data:{
            categoryName:"Psikoloji"
        }
    })
    const evrimAgaci= await prisma.source.create({
        data:{
            name:"Evrim Ağacı",
            sourceImg:"https://res.cloudinary.com/dsfjmblpe/image/upload/v1727895982/channels4_profile_1_ghhzhh.jpg",
        }
    })
    const euroNews= await prisma.source.create({
        data:{
            name:"Euronews",
            sourceImg:"https://res.cloudinary.com/dsfjmblpe/image/upload/v1727809159/channels4_profile_zxn80u.jpg"
        }
    })
    const sozcu= await prisma.source.create({
        data:{
            name:"Sözcü",
            sourceImg:"https://res.cloudinary.com/dsfjmblpe/image/upload/v1727896189/unnamed_gd7zgc.png"
        }
    })

    const evrimAgaciRssGundem= await prisma.rssFeed.create({
        data:{
            rssUrl:"https://evrimagaci.org/rss.xml",
            categoryId:categoryGundem.id,
            sourceId:evrimAgaci.id
        }
    })
    const evrimAgaciRssEkonomi= await prisma.rssFeed.create({
        data:{
            rssUrl:"https://evrimagaci.org/kategori/ekonomi-iktisat-400/rss.xml",
            categoryId:categoryEkonomi.id,
            sourceId:evrimAgaci.id
        }
    })
    const evrimAgaciRssPsikoloji= await prisma.rssFeed.create({
        data:{
            rssUrl:"https://evrimagaci.org/kategori/psikoloji-525/rss.xml",
            categoryId:categoryPsikoloji.id,
            sourceId:evrimAgaci.id
        }
    })
    const sozcuRssSpor= await prisma.rssFeed.create({
        data:{
            rssUrl:"https://www.sozcu.com.tr/feeds-rss-category-futbol",
            categoryId:categorySpor.id,
            sourceId:sozcu.id
        }
    })
    const sozcuRssGundem= await prisma.rssFeed.create({
        data:{
            rssUrl:"https://www.sozcu.com.tr/feeds-haberler",
            categoryId:categoryGundem.id,
            sourceId:sozcu.id
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