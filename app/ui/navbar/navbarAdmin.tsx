'use client';

import { Link, Image } from "@nextui-org/react";
import { useState } from "react";

export default function NavbarAdmin() {
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulasi status login
    const [profileDropdown, setProfileDropdown] = useState(false);

    const user = { email: "admin@example.com" }; // Simulasi data user

    return (
        <>
            {/* Navbar */}
            <nav className="sticky top-0 bg-primary flex flex-row items-center text-xl px-12 py-4 z-50 mb-12">
                {/* Logo */}
                <Link className="flex items-center" href="/dashboardAdmin">
                    <Image src="/logomasjid.png" width={128} />
                    <span className="text-[#F8EDD9] font-extrabold ml-2">Mesjid Nurul Hidayah</span>
                </Link>

                {/* Links */}
                <div className="flex-grow flex space-x-12 justify-center">
                    <Link href="/infaq-sadaqah" className="text-accent hover:underline">
                        Infaq & Sadaqah
                    </Link>
                    <Link href="/zakat" className="text-accent hover:underline">
                        Zakat
                    </Link>
                </div>

                {/* Profile Dropdown or Login Links */}
                {isLoggedIn ? (
                    <div className="relative">
                        <div
                            className="cursor-pointer text-accent font-bold"
                            onClick={() => setProfileDropdown(!profileDropdown)}
                        >
                            {user.email}
                        </div>
                        {profileDropdown && (
                            <div className="absolute right-0 bg-white shadow-md rounded-md py-2 mt-2 w-48">
                                <Link
                                    href="/logout"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Logout
                                </Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex space-x-12">
                        <Link href="/login" className="text-accent hover:underline">
                            Log In
                        </Link>
                        <Link href="/signup" className="text-accent hover:underline">
                            Sign Up
                        </Link>
                    </div>
                )}
            </nav>
        </>
    );
}
