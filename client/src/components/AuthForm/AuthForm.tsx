'use client'
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { EyeInvisibleOutlined, EyeOutlined, GoogleOutlined } from '@ant-design/icons';


type FormValues = {
  name?: string;
  surname?: string;
  email: string;
  password: string;
};

const AuthForm = ({ isRegister }: { isRegister: boolean }) => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = data => {
    if (isRegister) {
      console.log("Kayıt işlemi: ", data);
    } else {
      console.log("Giriş işlemi: ", data);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {isRegister ? "Kayıt Ol" : "Giriş Yap"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-black">
          {/* Kayıt için ad ve soyad alanları */}
          {isRegister && (
            <>
              <div>
                <label className="block text-gray-700">Ad</label>
                <input
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("name", { required: "Ad gereklidir" })}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-gray-700">Soyad</label>
                <input
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("surname", { required: "Soyad gereklidir" })}
                />
                {errors.surname && <p className="text-sm text-red-500">{errors.surname.message}</p>}
              </div>
            </>
          )}

          {/* Email alanı */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email", {
                required: "Email gereklidir",
                pattern: { value: /^\S+@\S+$/i, message: "Geçerli bir email adresi girin" }
              })}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          {/* Şifre alanı ve göster/gizle butonu */}
          <div>
            <label className="block text-gray-700">Şifre</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("password", {
                  required: "Şifre gereklidir",
                  minLength: { value: 8, message: "Şifre en az 8 karakter olmalıdır" }
                })}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
              >
                {showPassword ? <EyeInvisibleOutlined className='text-appcolor text-xl' /> : <EyeOutlined className='text-appcolor text-xl' />}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          {/* Form gönderim butonu */}
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {isRegister ? "Kayıt Ol" : "Giriş Yap"}
          </button>
        </form>

        {/* Google ile giriş butonu */}
        <button
          onClick={() => console.log("Google ile giriş yapılacak")}
          className="w-full flex items-center justify-center py-2 mt-4 border bg-red-600 border-gray-300 rounded-md hover:bg-opacity-80 focus:outline-none"
        >
          <GoogleOutlined className="mr-2" size={20} />
          Google ile {isRegister ? "kayıt ol" : "giriş yap"}
        </button>

        {/* Kayıt/Giriş geçiş butonu */}
        <button
          onClick={() => isRegister ? router.push('/login') : router.push('/register')}
          className="w-full py-2 mt-4 text-blue-500 hover:text-blue-600 focus:outline-none"
        >
          {isRegister ? "Zaten hesabınız var mı? Giriş Yapın" : `Hesabınız yok mu? Kayıt Olun`}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
