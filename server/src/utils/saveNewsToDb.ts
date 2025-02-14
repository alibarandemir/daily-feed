import { PrismaClient } from "@prisma/client"
import axios from "axios"

interface Inews {
    title: string,
    link: string,
    description: string,
    image: string
}

export const saveNewsToDb = async (news: Inews[], sourceId: number, categoryId: number) => {
    const prisma = new PrismaClient()
    try {
        for (const anews of news) {
            const existingNews = await prisma.news.findUnique({ where: { link: anews.link } })
            if (existingNews) {
                continue
            } else {
                console.log("saveNewsToDb içinde")
                let summary: string | null = null;
                try {
                    const response = await axios.get("http://localhost:5134/api/summary/getSummary", {
                        params: { newsUrl: anews.link }
                    })
                    console.log(response)
                    summary = response.data;
                } catch (error:any) {
                    console.error("Summary API çağrısı başarısız oldu:", error.message);
                }
                console.log(summary)
                console.log("haberler dbye kaydediliyor..")
                await prisma.news.create({
                    data: {
                        title: anews.title,
                        link: anews.link,
                        description: anews.description,
                        image: anews.image,
                        upvote: 0,
                        downvote: 0,
                        sourceId: sourceId,
                        summary: summary,
                        categoryId: categoryId,
                    }
                })
            }
        }
    } catch (e: any) {
        return e.message
    }
}