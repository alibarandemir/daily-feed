import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
      user: process.env.EMAIL_ADRESS,
      pass: process.env.EMAIL_PASS,
    },
});

const sendVerificationEmail = async (email: string, verificationCode: string) => {
    try {
        const info = await transporter.sendMail({
            from: 'alibarandemir798@gmail.com',
            to: email,
            subject: "E-posta Doğrulama Kodu",
            text: `Merhaba, E-posta doğrulama kodunuz: ${verificationCode}`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
                    <h2 style="color: #229799;">E-posta Doğrulama</h2>
                    <p>Merhaba,</p>
                    <p>E-posta adresinizi doğrulamak için aşağıdaki 6 haneli doğrulama kodunu kullanabilirsiniz:</p>
                    <div style="font-size: 24px; font-weight: bold; padding: 10px; border-radius: 5px; background-color: #f9f9f9; border: 1px solid #ddd; text-align: center; color: #333;">
                        ${verificationCode}
                    </div>
                    <p>Bu kodun geçerlilik süresi 10 dakikadır. Eğer bu isteği siz yapmadıysanız, lütfen bu mesajı göz ardı edin.</p>
                    <p style="margin-top: 20px;">Teşekkürler, <br> Ali Baran Demir</p>
                </div>
            `,
        });
        console.log("E-posta başarıyla gönderildi", info.messageId);
    } catch (e) {
        console.error("E-posta gönderim hatası:", e);
    }
};

const sendResetPasswordEmail=async(email:string,resetLink:string)=>{
    try{

        const info = await transporter.sendMail({
            from: 'alibarandemir798@gmail.com',
            to: email,
            subject: "Şifre Sıfırlama",
            text: `Merhaba, Şifre sıfırlamak istiyorsanız linke tıklayın: ${resetLink}`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
                    <h2 style="color: #229799;">Şifre Sıfırlama</h2>
                    <p>Merhaba,</p>
                    <p>Şifrenizi sıfırlamak için aşağıdaki linke tıklayınız:</p>
                    <div style="font-size: 24px; font-weight: bold; padding: 10px; border-radius: 5px; background-color: #f9f9f9; border: 1px solid #ddd; text-align: center; color: #333;">
                        ${resetLink}
                    </div>
                    <p>Bu kodun geçerlilik süresi 1 saattir. Eğer bu isteği siz yapmadıysanız, lütfen bu mesajı göz ardı edin.</p>
                    <p style="margin-top: 20px;">Teşekkürler, <br> Ali Baran Demir</p>
                </div>
            `,
        });
        console.log("E-posta başarıyla gönderildi", info.messageId);
    }
    catch(e:any){
        console.error("Eposta gönderim hatası",e.message)
    }
}

export { sendVerificationEmail,sendResetPasswordEmail};
