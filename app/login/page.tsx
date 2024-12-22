'use client'
import { useState } from "react";
import { Inter } from "next/font/google";
import { Input, Link, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "../ui/icon/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../ui/icon/EyeSlashFilledIcon";

const inter = Inter({ subsets: ["latin"] });

export default function LoginPage() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center bg-primary px-4 py-8 mt-12 mx-32 rounded-xl">
            {/* Header */}
            <div className={inter.className + " flex flex-col items-center"}>
                <h1 className="text-[32px] font-bold">Welcome Back</h1>
                <span className="opacity-50">Login to your account!</span>
            </div>

            {/* Input Form */}
            <div className="min-w-full bg-secondary flex justify-center items-center rounded-xl mt-8 text-[#000000] px-6 py-12">
                <div className="flex flex-col gap-6 max-w-xl w-full">
                    {/* Input Email */}
                    <div className="flex flex-col gap-2 text-left">
                        <label className="text-sm font-medium">Email</label>
                        <Input
                            type="email"
                            variant="bordered"
                            placeholder="Masukkan Email Disini"
                        />
                    </div>
                    {/* Input Password */}
                    <div className="flex flex-col gap-2 text-left">
                        <label className="text-sm font-medium">Password</label>
                        <div className="flex items-center w-full rounded-lg">
                            <Input
                                radius="lg"
                                variant="bordered"
                                placeholder="Masukkan Password Disini"
                                type={isVisible ? "text" : "password"}
                                className="flex-grow border-none focus:ring-0 focus:border-transparent"
                            />
                            <button
                                className="px-4 focus:outline-none flex items-center"
                                type="button"
                                onClick={toggleVisibility}
                                aria-label="toggle password visibility"
                            >
                                {isVisible ? (                                    
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />                                    
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        </div>
                        <Link>
                            Forgot Password?
                        </Link>
                    </div>
                    <Button className="bg-accent rounded-md px-4 py-2 justify-center">
                        Login
                    </Button>
                </div>
            </div>
        </div>
    );
}
