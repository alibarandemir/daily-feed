'use client'
import { useEffect, useRef, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/hooks/Redux";
import '../../globals.css'
import { verifyEmail } from "@/stores/Auth/actions";
import { showToast } from "@/utils/showToast";
import { resetAuthState } from "@/stores/Auth/AuthSlice";
import { getPreferences } from "@/stores/Global/actions";

const EmailVerificationPage = () => {
	const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
	const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
	const router = useRouter();
	
	const { loading, error,success,message } = useAppSelector((state) => state.auth);
	const dispatch=useAppDispatch()

	const handleChange = (index: number, value: string) => {
		const newCode = [...code];
		if (value.length > 1) {
			const pastedCode = value.slice(0, 6).split("");
			for (let i = 0; i < 6; i++) {
				newCode[i] = pastedCode[i] || "";
			}
			setCode(newCode);

			// Son dolu veya ilk boş inputa odaklanma
			const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
			const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
			inputRefs.current[focusIndex]?.focus();
		} else {
			newCode[index] = value;
			setCode(newCode);
			if (value && index < 5) {
				inputRefs.current[index + 1]?.focus();
			}
		}
	};

	const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Backspace" && !code[index] && index > 0) {
			inputRefs.current[index - 1]?.focus();
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const verificationCode = code.join("");
		try {
			dispatch(verifyEmail(verificationCode));
			
			
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		if (success) {
			showToast('success', message);
			router.push("/"); // Başarılıysa yönlendirme
			dispatch(resetAuthState()); // Redux durumunu sıfırla
			dispatch(getPreferences()); //
		} else {
			showToast('warning', message);
			dispatch(resetAuthState()); // Redux durumunu sıfırla
		}
	}, [success, error, message, dispatch, router]);
	// Tüm alanlar dolu olduğunda otomatik gönderim
	useEffect(() => {
		if (code.every((digit) => digit !== "")) {
			handleSubmit(new Event("submit") as unknown as FormEvent);
		}
	}, [code]);

	return (
	<div className="flex justify-center items-center min-h-screen">
		<div className='max-w-md w-full bg-appcolor bg-opacity-70  rounded-2xl shadow-xl overflow-hidden'>
			<motion.div
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				className='bg-gray-800   rounded-2xl shadow-2xl p-8 w-full max-w-md'
			>
				<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r text-white  bg-clip-text'>
					Mail Doğrulama
				</h2>
				<p className='text-center text-gray-300 mb-6'>Mail adresinize gelen 6 haneli kodu girin</p>

				<form onSubmit={handleSubmit} className='space-y-6'>
					<div className='flex justify-between'>
						{code.map((digit, index) => (
							<input
								key={index}
								ref={(el) => {
									inputRefs.current[index] = el;
								}}
								type='text'
								maxLength={1}
								value={digit}
								onChange={(e) => handleChange(index, e.target.value)}
								onKeyDown={(e) => handleKeyDown(index, e)}
								className='w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-appcolor focus:outline-none'
							/>
						))}
					</div>
					{error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						type='submit'
						disabled={loading || code.some((digit) => !digit)}
						className='w-full bg-main cursor-pointer text-white font-bold py-3 px-4 rounded-lg shadow-lg  focus:outline-none focus:ring-2  disabled:opacity-70'
					>
						{loading ? "Verifying..." : "Verify Email"}
					</motion.button>
				</form>
			</motion.div>
		</div>
		</div>
	);
};
export default EmailVerificationPage;
