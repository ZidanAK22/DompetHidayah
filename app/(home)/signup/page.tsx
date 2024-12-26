'use client'
import { useState } from "react";
import { Inter } from "next/font/google";
import { Input, Link, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "../../ui/icon/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../ui/icon/EyeSlashFilledIcon";
import { signup } from "../login/actions";

const inter = Inter({ subsets: ["latin"] });

export default function SignUpPage() {
    const [isVisible, setIsVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isMatching, setIsMatching] = useState(false);
    const [isLong, setLong] = useState(false);
    const [isSigningUp, setIsSigningUp] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const checkPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value; // Get the current value of confirmPassword
        setConfirmPassword(value);
    
        // Check if passwords match
        setIsMatching(password === value);
    };
    

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value; // Get the current value of password
        setPassword(value);
    
        // Check if the password is long enough
        setLong(value.length > 6);
    };
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        console.log(formData.get('email'))
        console.log(formData.get('password'))
        // Add your sign-up logic here
        try {
            setIsSigningUp(true);
            await signup(formData);
        } catch (error) {
            console.error("Signup failed", error);            
        } finally {
            setIsSigningUp(false);
        }
        
    };

    return (
        <div className="min-h-[50vh] max-w-2xl w-1/2 flex flex-col items-center justify-center bg-primary px-20 py-8 mt-12 rounded-xl">
            {/* Header */}
            <div className={`${inter.className} flex flex-col items-center`}>
                <h1 className="text-[32px] font-bold">Welcome</h1>
                <span className="opacity-50">Create your new account</span>
            </div>

            {/* Input Form */}
            <form
                onSubmit={handleSubmit}
                className="min-w-full bg-secondary flex flex-col justify-center items-center rounded-xl mt-8 text-[#000000] px-6 py-12">
                <div className="flex flex-col gap-6 max-w-xl w-full">
                    {/* Input Email */}
                    <div className="flex flex-col gap-2 text-left w-full">
                        <label className="text-sm font-medium">Email</label>
                        <Input
                            name="email"
                            type="email"
                            radius="lg"
                            variant="bordered"
                            placeholder="Masukkan Email Disini"
                            className="w-full"
                            required
                        />
                    </div>
                    {/* Input Password */}
                    <div className="flex flex-col gap-2 text-left w-full">
                        <label className="text-sm font-medium">Password</label>
                        <div className="flex items-center w-full rounded-lg">
                            <Input
                                name="password"
                                radius="lg"
                                variant="bordered"
                                placeholder="Masukkan Password Disini"
                                type={isVisible ? "text" : "password"}
                                value={password}
                                onChange={handlePasswordChange}
                                className="w-full border-none focus:ring-0 focus:border-transparent"
                                required
                            />
                            <button
                                className="ml-2 focus:outline-none flex items-center"
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
                    </div>
                    {/* Confirm Password */}
                    <div className="flex flex-col gap-2 text-left w-full">
                        <label className="text-sm font-medium">Confirm Password</label>
                        <div className="flex items-center w-full rounded-lg">
                            <Input
                                radius="lg"
                                variant="bordered"
                                placeholder="Masukkan Password Sekali Lagi"
                                type={isVisible ? "text" : "password"}
                                value={confirmPassword}
                                onChange={checkPassword}
                                className="w-full border-none focus:ring-0 focus:border-transparent"
                                required
                            />
                            <button
                                className="ml-2 focus:outline-none flex items-center"
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
                        {password && (
                            !isLong ? (
                                <p className="text-[#990000]">Not long enough</p>
                            ) : confirmPassword.length > 0 ? (
                                isMatching ? (
                                    <p className="text-primary">Password Match</p>
                                ) : (
                                    <p className="text-[#990000]">Password Doesn&#39;t Match</p>
                                )
                            ) : null
                        )}

                    </div>
                    <Button type="submit" className="bg-accent rounded-md px-4 py-2 justify-center">
                        {isSigningUp ? "Signing up..." : "Sign up"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
