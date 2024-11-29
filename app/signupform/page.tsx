'use client';

import { useState } from "react";
import React from "react";
import { Inter } from "next/font/google";
import { Button, Input } from "@nextui-org/react";
import { EyeFilledIcon } from "../ui/icon/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../ui/icon/EyeSlashFilledIcon";

const inter = Inter({ subsets: ["latin"] });

export default function SignUpPage() {
    const [isVisible, setIsVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isMatching, setIsMatching] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setIsMatching(e.target.value === confirmPassword);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        setIsMatching(password === e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log("Form submitted:", { password, confirmPassword });
    };

    return (
        <div className="min-h-[50vh] flex flex-col align-middle justify-center bg-primary px-12 lg:mx-96 mt-12 mx-32 rounded-xl">
            {/* Header */}
            <div className={`${inter.className} flex flex-col items-center`}>
                <h1 className="text-[32px] lg:text-[64px] font-bold">Welcome</h1>
                <span className="opacity-50">Create your new account</span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-secondary flex flex-row justify-center w-full rounded-xl mt-8 mb-4 text-[#000000] py-12">
                <div className="space-y-8">
                    <div>
                        <Input
                            type="email"
                            radius="lg"
                            label="Email"
                            className="max-w-md"
                            required
                        />
                    </div>

                    <div>
                        <Input
                            label="Password"
                            type={isVisible ? 'text' : 'password'}
                            value={password}
                            onChange={handlePasswordChange}
                            className="max-w-md"
                            required
                        />
                    </div>

                    <div className="flex flex-row items-center justify-between max-w-lg">
                        <div className="flex-1">
                            <Input
                                type={isVisible ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                label="Confirm Password"
                                className="max-w-md"
                                required
                            />
                        </div>

                        <Button
                            type="button"
                            onClick={toggleVisibility}
                            className="self-end pb-2"
                        >
                            {isVisible ? (
                                <EyeFilledIcon className="text-[32px] text-default-400 pointer-events-none" />
                            ) : (
                                <EyeSlashFilledIcon className="text-[32px] text-default-400 pointer-events-none" />
                            )}
                        </Button>
                    </div>

                    {password && confirmPassword && (
                        <p className={isMatching ? "text-primary" : "text-[#990000]"}>
                            {isMatching ? "Password Match" : "Password Doesn't Match"}
                        </p>
                    )}

                    <Button type="submit" className="bg-accent rounded-md px-4 py-2 justify-center">
                        Sign Up
                    </Button>
                </div>
            </form>
        </div>
    );
}
