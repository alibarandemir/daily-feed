import { Request, Response } from "express"
import * as argon2 from "argon2";
import { PrismaClient } from "@prisma/client";
import jwt, { JwtPayload } from 'jsonwebtoken'
import {sendResetPasswordEmail, sendVerificationEmail} from "../utils/sendVerificationEmail";
import generateToken from "../utils/generateToken";
import 'dotenv/config'
import axios from "axios";



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
        if(typeof(user.password)!=='string'){
            return res.json({message:"Daha önce farklı bir yöntemle kayıt olmuşsunuz"})
        }

        const isPasswordCorrect = await argon2.verify(user.password, password);

        if (!isPasswordCorrect) {
            return res.json({ success:false,message: "Geçersiz şifre" });
        }
        generateToken(res,user.id)
       
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


const forgotPassword=async(req:Request,res:Response)=>{
    const {email}=req.body;
    if(!email&&email==''){
        return res.json({message:'lütfen geçerli email giriniz '})
    }
    const user=await prisma.user.findUnique({
        where:{
            email:email
        }
    })
    if(!user){
         return res.json({message:'Böyle bir kullanıcı bulunamadı. Tam kayıt olma zamanı!',success:false})
    }
   
   
     // 1 saat geçerli olacak JWT token oluştur
    const token = jwt.sign({ id: user.id }, process.env.JWT_RESET_PASS??'SLALSDDLSDSL', { expiresIn: '1h' });

    const resetLink = `https://sumflood-client.onrender.com/reset-password?token=${token}`;


    

    try{
        await sendResetPasswordEmail(email,resetLink);
        res.status(200).json({message:"Şifre sıfırlama e postası gönderildi!",success:true})
    }
    catch(e){
        return res.status(500).json({message:'E-posta gönderim hatası'})
    }



}

const resetPassword = async (req: Request, res: Response) => {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
        return res.json({ message: 'Şifre Güncellenemedi', success: false });
    }
    try {
        console.log(process.env.JWT_RESET_PASS)
        const decoded = jwt.verify(token, process.env.JWT_RESET_PASS ?? '') as JwtPayload; // 
        if (!decoded.id) {
            console.log(decoded.id)
            return res.json({ message: 'Geçersiz token', success: false });
        }

        const userId = parseInt(decoded.id); // Burada artık id'yi güvenle alabiliriz

        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return res.json({ message: 'Şifre güncellenemedi, geçersiz token', success: false });
        }
        const hashedPassword = await argon2.hash(newPassword);

        const updatedUser=await prisma.user.update({
            where:{id:userId},
            data:{
                password:hashedPassword
            }
        })
        return res.status(200).json({message:'Şifre başarıyla güncellendi',success:true})


        // Şifre güncelleme işlemi burada yapılabilir
    } catch (e) {
        console.error(e+"catch bloğunda");
        return res.json({ message: 'Geçersiz token,yeni token alın', success: false });
    }
};

const CLIENT_ID=process.env.CLIENT_ID
const CLIENT_SECRET=process.env.CLIENT_SECRET


const redirectGoogleAuth=(req:Request,res:Response)=>{
    const redirectUri="https://sumflood-server-76fc91a2eefa.herokuapp.com/api/auth/callback/google"
    const authUrl=`https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=email profile`;
    res.redirect(authUrl)
}

const googleAuthCallback=async(req:Request,res:Response)=>{
   const {code}=req.query
   if (!code) return res.status(400).json({ error: "Kod bulunamadı" });
   console.log(code)
   try{
    const tokenResponse = await axios.post(
        "https://oauth2.googleapis.com/token",
        {
          code,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          redirect_uri: `https://sumflood-server-76fc91a2eefa.herokuapp.com/api/auth/callback/google`,
          grant_type: "authorization_code",
        }
      );
  
      const { access_token } = tokenResponse.data;
      // Google'dan kullanıcı bilgilerini al
    const userInfo = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      console.log(userInfo.data)
      const { id, email, given_name, family_name } = userInfo.data;
      let user= await prisma.user.findUnique({where:{email:email}})
      if(!user){
        user= await prisma.user.create({data:
            {
                name:given_name,
                lastname:family_name,
                email:email,
            }
        })
      }
      generateToken(res,user.id)
      res.redirect(process.env.FRONTEND_URL??'')
   }
   catch(e){

   }
}

export { register,verifyEmail ,login,logout,forgotPassword,resetPassword,redirectGoogleAuth,googleAuthCallback };