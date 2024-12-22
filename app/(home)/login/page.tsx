'use client'

import { useState } from "react";
import { Inter } from "next/font/google";
import { EyeFilledIcon } from "../../ui/icon/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../ui/icon/EyeSlashFilledIcon";
import { login, signup } from "./actions";

const inter = Inter({ subsets: ["latin"] });

// export default function LoginPage() {
//     const [isVisible, setIsVisible] = useState(false);

//     const toggleVisibility = () => setIsVisible(!isVisible);

//     return (
//         <div className="min-h-[50vh] flex flex-col items-center justify-center bg-primary px-4 py-8 mt-12 mx-32 rounded-xl">
//             {/* Header */}
//             <div className={`${inter.className} flex flex-col items-center`}>
//                 <h1 className="text-[32px] font-bold">Welcome Back</h1>
//                 <span className="opacity-50">Login to your account!</span>
//             </div>

//             {/* Input Form */}
//             <div className="min-w-full bg-secondary flex justify-center items-center rounded-xl mt-8 text-[#000000] px-6 py-12">
//                 <form className="flex flex-col gap-6 max-w-xl w-full">
//                     <label htmlFor="email">Email</label>
//                     <Input
//                         id="email"
//                         type="email"
//                         variant="bordered"                        
//                         placeholder="Masukkan Email Disini"
//                         required
//                     />
//                     <div className="flex flex-col">
//                         <label htmlFor="password">Password</label>
//                         <Input
//                             id="password"
//                             radius="lg"
//                             variant="bordered"                            
//                             endContent={
//                                 <button
//                                     className="focus:outline-none flex items-center"
//                                     type="button"
//                                     onClick={toggleVisibility}
//                                     aria-label="toggle password visibility"
//                                 >
//                                     {isVisible ? (
//                                         <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none mt-1" />
//                                     ) : (
//                                         <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none mt-1" />
//                                     )}
//                                 </button>
//                             }
//                             type={isVisible ? "text" : "password"}
//                             required
//                         />
//                         <Link className="text-right">
//                             Forgot Password?
//                         </Link>

//                         <div className="flex justify-center space-x-4 mt-8">
//                             <Button formAction={consolePrint} type="submit" className="bg-accent rounded-lg p-4">
//                                 Test Data
//                             </Button>
//                             <Button formAction={signup} type="submit" className="bg-accent rounded-lg p-4">
//                                 Sign Up
//                             </Button>
//                             <Button formAction={login} type="submit" className="bg-accent rounded-lg p-4">
//                                 Sign In
//                             </Button>
//                         </div>

//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

export default function LoginPage() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);


    return (
        // kind of a div hell, lol glhf
        <form className='className="min-h-[50vh] flex flex-col items-center justify-center bg-primary px-4 py-8 mt-12 mx-32 rounded-xl'>
            <div className={`${inter.className} flex flex-col items-center`}>
                <h1 className="text-[32px] lg:text-4xl font-bold">Welcome Back</h1>
                <span className="opacity-50 mb-8">Login to your account!</span>
            </div>
            <div className="text-text flex flex-col bg-secondary rounded-xl p-24">
                <label htmlFor="email">Email:</label>
                <input id="email" name="email" type="email" required className="mb-8" />
                <label htmlFor="password">Password:</label>
                <div className="flex flex-row space-x-4 mb-8">
                    <input id="password" name="password" type={isVisible ? "text" : "password"} required />
                    <button
                        className="focus:outline-none flex items-center"
                        type="button"
                        onClick={toggleVisibility}
                        aria-label="toggle password visibility"
                    >
                        {isVisible ? (
                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none mt-1" />
                        ) : (
                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none mt-1" />
                        )}
                    </button>
                </div>

                <div className="flex space-x-8 justify-center">
                    <button formAction={login} className="bg-accent rounded-lg p-4">Log in</button>
                    <button formAction={signup} className="bg-accent rounded-lg p-4">Sign up</button>
                </div>

            </div>
        </form>
    )
}