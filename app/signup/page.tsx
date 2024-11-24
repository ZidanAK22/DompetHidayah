'use client'
import { useState } from "react";
import React from "react";
import { Inter } from "next/font/google";
import { Button, Input, Link, Checkbox } from "@nextui-org/react";
import { EyeFilledIcon } from "../ui/icon/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../ui/icon/EyeSlashFilledIcon";

const inter = Inter({ subsets: ["latin"] });

export default function SignUpPage() {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isMatching, setIsMatching] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const checkPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        setIsMatching(password === e.target.value);
    };

    return (
        <div className="min-h-[50vh] flex flex-col align-middle justify-center bg-primary px-12 lg:px-24 mt-12 mx-32 rounded-xl">
            {/* Header */}
            <div className={`${inter.className} flex flex-col items-center`}>
                <h1 className="text-[32px] lg:text-[64px] font-bold">Welcome</h1>
                <span className="opacity-50">Create your new account</span>
            </div>

            {/* Input Form */}
            <div className="bg-secondary flex flex-col justify-center w-full rounded-xl mt-8 mb-4 text-[#000000] pl-20 py-12">
                <div className="space-y-8">
                    <Input
                        type="email"
                        radius="lg"
                        label="Email"
                        className="max-w-md"                    
                    />
                    <Input
                        label="Password"
                        type={isVisible ? 'Text' : 'Password'}
                        value={password}
                        onValueChange={setPassword}
                        className="max-w-md"
                    />                                        
                    <div className="flex flex-row align-middle justify-between max-w-lg">                        
                        
                        <Input                            
                            type={isVisible ? 'Text' : 'Password'}
                            value={confirmPassword}
                            onChange={checkPassword}
                            label="Confirm Password"
                            labelPlacement="outside"
                            className="max-w-md"
                        />                        

                        <Button
                            onClick={toggleVisibility}
                            className="self-end pb-2"
                        >
                            {isVisible ? (
                                <EyeFilledIcon className="text-[32px] text-default-400 pointer-events-none" />
                            ) : (
                                <EyeSlashFilledIcon className="text-[32px] text-default-400 pointer-events-none" />
                            )
                            }
                        </Button>
                    </div>

                    {password && confirmPassword ? (
                        isMatching ? (
                            <p className="text-primary">Password Match</p>
                        ) : (
                            <p className="text-[#990000]">Password Doesnt Match</p>
                        )
                    ) : null}

                    <Button className="bg-accent rounded-md px-4 py-2 justify-center">
                        Sign Up
                    </Button>
                </div>
            </div>
        </div>
    );
}