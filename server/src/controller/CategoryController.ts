import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const getUserCategories = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const isAuthenticated = !!userId;

        if (!isAuthenticated) {
            return res.status(401).json({ error: "Kullanıcı kimliği doğrulanamadı" });
        }

        const userCategories = await prisma.userCategory.findMany({
            where: {
                userId: userId,
            },
            include: {
                category: true, // Kategori bilgilerini de çekiyor
            },
        });

        const allCategories = await prisma.category.findMany(); // Tüm kategorileri çekiyoruz

        return res.json({
            userCategories: userCategories.map(uc => ({
                id: uc.categoryId,
                categoryName: uc.category.categoryName,
            })),
            allCategories: allCategories,
            message: "Kullanıcı kategorileri aktarıldı",
        });
    } catch (e: any) {
        return res.status(500).json({ error: e.message });
    }
}

const updateUserCategories = async (req: Request, res: Response) => {   
    try {
        const userId = (req as any).userId;
        const { selectedCategories } = req.body;
        const isAuthenticated = !!userId;
        console.log(selectedCategories);
        
        if (!isAuthenticated) {
            return res.json({ error: "Kullanıcı kimliği doğrulanamadı" });
        }
        
        if (!selectedCategories || !Array.isArray(selectedCategories)) {
            return res.json({ error: "Kategoriler eksik veya geçersiz" });
        }
        
        // Fetch existing user categories
        const existingUserCategories = await prisma.userCategory.findMany({
            where: {
                userId: userId,
            },
            include: {
                category: true, // Include category details
            },
        });

        // Extract existing category IDs
        const existingCategoryIds = existingUserCategories.map(uc => uc.categoryId);

        // Determine categories to add and remove
        const categoriesToAdd = selectedCategories.filter((categoryId: number) => !existingCategoryIds.includes(categoryId));
        const categoriesToRemove = existingCategoryIds.filter((categoryId: number) => !selectedCategories.includes(categoryId));

        // Create new user categories
        const createUserCategories = categoriesToAdd.map((categoryId: number) => ({
            userId: userId,
            categoryId: categoryId,
        }));

        // Insert new user categories into the database
        if (createUserCategories.length > 0) {
            await prisma.userCategory.createMany({
                data: createUserCategories,
            });
        }

        // Delete removed user categories from the database
        if (categoriesToRemove.length > 0) {
            await prisma.userCategory.deleteMany({
                where: {
                    userId: userId,
                    categoryId: {
                        in: categoriesToRemove,
                    },
                },
            });
        }

        // Fetch updated user categories with category names
        const updatedUserCategories = await prisma.userCategory.findMany({
            where: {
                userId: userId,
            },
            include: {
                category: true, // Include category details
            },
        });

        return res.json({ 
            message: "Beğendiğiniz kategoriler güncellendi",
            userCategories: updatedUserCategories.map(uc => ({
                id: uc.categoryId,
                categoryName: uc.category.categoryName,
            })),
        });
    }
    catch (e: any) {
        console.error(e.message+'hata')
        return res.status(500).json({ error: e.message });
    }
}
export { getUserCategories, updateUserCategories };