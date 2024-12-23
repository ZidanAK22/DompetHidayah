'use client'

import { Link, Image } from "@nextui-org/react";
import { useState } from "react";

export default function NavbarAdmin() {
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulasi status login
    const [profileDropdown, setProfileDropdown] = useState(false);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <nav className="sticky top-0 bg-primary flex flex-row items-center text-xl px-12 py-4 z-50">
                <Link className="flex items-center" href="/dashboardAdmin">                    
                    <Image src="/logomasjid.png" width={128} />
                    <span className="text-[#F8EDD9] font-extrabold"> Mesjid Nurul Hidayah </span>
                </Link>
                <div className="flex-grow flex space-x-12 justify-center">
                    <Link href="/infaq-sadaqah" className="text-accent">
                        Infaq & Sadaqah
                    </Link>
                    <Link href="/zakat" className="text-accent">
                        Zakat
                    </Link>
                </div>
                {isLoggedIn ? (
                    <div className="relative">
                        <Image
                            src="/profile-placeholder.png"
                            width={40}
                            className="rounded-full cursor-pointer"
                            onClick={() => setProfileDropdown(!profileDropdown)}
                        />
                        {profileDropdown && (
                            <div className="absolute right-0 bg-white shadow-md rounded-md py-2 mt-2">
                                <Link href="/edit-profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Edit Profile
                                </Link>
                                <Link href="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Logout
                                </Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex space-x-12">
                        <Link href="/login" className="text-accent">
                            Log In
                        </Link>
                        <Link href="/signup" className="text-accent">
                            Sign Up
                        </Link>
                    </div>
                )}
            </nav>
        </div>
        );
    }