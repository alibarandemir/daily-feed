import { Request, Response } from "express"
import * as argon2 from "argon2";
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken'
import sendVerificationEmail from "../utils/sendVerificationEmail";
import generateToken from "../utils/generateToken";



const prisma=new  PrismaClient();

const register = async (req: Request, res: Response) => {
    try {
        const { name, surname, email, password } = req.body;
        
        const user = await prisma.user.findUnique({
            where: { email: email }
        });
        
        if (user) {
            if (user.isVerified) {
                return res.json({ success: false, message: "Böyle bir kullanıcı kayıtlı" });
            } else {
                // Kullanıcı daha önce kayıt olmuş ama doğrulanmamış
                const currentTime = new Date();
                
                // Kodun süresi dolmamışsa yönlendirme yapılacak
                if (user.verificationTokenExpiresAt && currentTime < user.verificationTokenExpiresAt) {
                    return res.status(200).json({ success: true, message: "E-posta doğrulamanız bekleniyor", redirect: "/register/verifyEmail" });
                }
                
                // Kod süresi dolmuşsa, yeni bir kod gönderilecek
                const newVerificationToken = Math.floor(100000 + Math.random() * 900000).toString();
                await prisma.user.update({
                    where: { email: email },
                    data: {
                        verificationToken: newVerificationToken,
                        verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 saat
                    }
                });

                await sendVerificationEmail(email, newVerificationToken);
                return res.status(200).json({ success: true, message: "Doğrulama kodu yeniden gönderildi, lütfen e-posta adresinizi kontrol edin", redirect: "/register/verifyEmail" });
            }
        }

        // Yeni kullanıcı kaydı
        const hashedPassword = await argon2.hash(password);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const newUser = await prisma.user.create({
            data: {
                name: name,
                lastname: surname,
                email: email,
                password: hashedPassword,
                verificationToken: verificationToken,
                verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 saat
            }
        });

        await sendVerificationEmail(newUser.email, verificationToken);
        res.status(201).json({success:true, message: "Kullanıcı başarıyla kaydedildi. E-posta adresinizi doğrulamak için gelen kutunuzu kontrol edin.", user: newUser });
    } catch (e) {
        console.error("Kayıt sırasında hata:", e);
        res.status(500).json({ success: false, message: "Sunucu hatası" });
    }
}

const verifyEmail = async (req: Request, res: Response) => {
    try {
        const { code } = req.body;
        if(typeof(code)!=='string'){
            return res.json({ success: false, message: "Geçersiz kod veya süresi dolmuş kod." });
        }
        // Doğrulama koduna ve süresine göre kullanıcıyı bul
        const user = await prisma.user.findFirst({
            where: {
                verificationToken: code,
                verificationTokenExpiresAt: {
                    gt: new Date() // Şu anki zamandan büyük olmalı, yani süresi dolmamış olmalı
                }
            }
        });
        if (!user) {
            return res.json({ success: false, message: "Geçersiz kod veya süresi dolmuş kod." });
        }
        await prisma.preferences.create({
            data:{
                userId:user.id
            }
        })
        
        if (user.isVerified) {
            return res.json({ success: false, message: "Bu kullanıcı zaten doğrulanmış." });
        }

        // Kullanıcıyı doğrula ve token bilgilerini temizle
        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                isVerified: true,
                verificationToken: null,
                verificationTokenExpiresAt: null,
            },
        });
        console.log("controller token"+updatedUser.id)
        generateToken(res,updatedUser.id)

        res.status(200).json({ success: true, message: "Doğrulama başarılı", user: updatedUser });

    } catch (e) {
        console.error("Email doğrulama sırasında hata:", e);
        res.status(500).json({ success: false, message: "Sunucu hatası" });
    }
};

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        if (!user) {
            return res.json({ message: "Böyle bir kullanıcı bulunamadı" });
        }

        const isPasswordCorrect = await argon2.verify(user.password, password);

        if (!isPasswordCorrect) {
            return res.json({ success:false,message: "Geçersiz şifre" });
        }
        generateToken(res,user.id)
        await prisma.preferences.create({
            data:{
                userId:user.id
            }
        })
        res.status(200).json({success:true, message: "Giriş başarılı", user: user.name });
    } catch (error) {
        console.error("Giriş sırasında hata:", error);
        res.status(500).json({ message: "Sunucu hatası" });
    }
};

const logout=(req:Request,res:Response)=>{
    try{
        
        console.log("istek geldi")
        //jwt coken temizle
        res.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0), // Set expiration to a past date to immediately expire the cookie
            secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
            sameSite: 'strict' 
        });
        res.clearCookie('token');
        
        console.log(req.cookies);
        console.log(res.cookie);
        res.status(200).json({ success: true, message: "Çıkış başarılı" });

    }
    catch(e:any){
        console.error("Çıkış sırasında hata:",e);
        res.status(500).json({ success: false, message: "Sunucu hatası" });
    }
}
export { register,verifyEmail ,login,logout };