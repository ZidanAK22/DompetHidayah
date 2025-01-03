'use client';

import { Link, Image } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { supabase } from "@/app/utils/supabase/supabase_client";
import { User } from "@supabase/supabase-js";

interface NavbarAdminProps {
    user: User | null; // User is from "@supabase/supabase-js"
}


export default function NavbarAdmin({ user }: NavbarAdminProps) {    
    const [profileDropdown, setProfileDropdown] = useState(false);        

    return (
        <>
            {/* Navbar */}
            <nav className="sticky top-0 bg-primary flex flex-row justify-evenly items-center text-xl sm:text-sm px-12 py-4 z-50 mb-12">
                {/* Logo */}
                <Link className="flex items-center" href="/">
                    <Image src="/logomasjid.png" width={64} />
                    <span className="text-[#F8EDD9] font-extrabold ml-2">Mesjid Nurul Hidayah</span>
                </Link>

                {/* Links */}
                <div className="flex-grow flex space-x-12 sm:space-x-3 justify-center">
                    <Link href="/infaqsadaqah" className="text-accent hover:underline">
                        Infaq & Sadaqah
                    </Link>
                    <Link href="/adminzakat" className="text-accent hover:underline">
                        Zakat
                    </Link>
                    <Link href="/adminrefactor" className="text-accent hover:underline">
                        Refactor
                    </Link>
                </div>

                {/* Profile Dropdown or Login Links */}

                <div className="relative">
                    <div
                        className="cursor-pointer text-accent font-bold"
                        onClick={() => setProfileDropdown(!profileDropdown)}
                    >
                        <span>{user?.email}</span>
                    </div>
                    {profileDropdown && (
                        <div className="absolute right-0 bg-white shadow-md rounded-md py-2 mt-2 w-48">                            
                            <form action="/auth/signout" method="post">
                                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" type="submit">
                                    Sign out
                                </button>
                            </form>
                        </div>
                    )}
                </div>


            </nav>
        </>
    );
}
