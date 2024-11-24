'use client'
import { useState } from "react";
import { Inter } from "next/font/google";
import { Input, Link } from "@nextui-org/react";
import { EyeFilledIcon } from "../ui/icon/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../ui/icon/EyeSlashFilledIcon";

const inter = Inter({ subsets: ["latin"] });

export default function LoginPage() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center bg-primary px-4 py-8 mt-12 mx-32 rounded-xl">
            {/* Header */}
            <div className={`${inter.className} flex flex-col items-center`}>
                <h1 className="text-[32px] font-bold">Welcome Back</h1>
                <span className="opacity-50">Login to your account!</span>
            </div>

            {/* Input Form */}
            <div className="min-w-full bg-secondary flex justify-center items-center rounded-xl mt-8 text-[#000000] px-6 py-12">
                <div className="flex flex-col gap-6 max-w-xl w-full">
                    <Input
                        type="email"
                        variant="bordered"
                        label="Email"
                        placeholder="Masukkan Email Disini"
                    />
                    <div className="flex flex-col text-right">
                    <Input
                        radius="lg"
                        variant="bordered"
                        label="Password"
                        endContent={
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
                        }
                        type={isVisible ? "text" : "password"}
                    />
                    <Link>
                        Forgot Password?
                    </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
