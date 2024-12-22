'use client'

import { redirect } from "next/navigation";
import { Link, Image} from "@nextui-org/react";
import { supabase } from "@/app/utils/supabase/supabase_client";

export default async function NavbarCustom() {    
    const { data, error } = await supabase.auth.getUser()
    if (error) {
        redirect(`/login?error=${encodeURIComponent(error.message)}`)
    }

    async function HandleSignOut() {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.log(error);
        }
    }

    return (
        <nav className="sticky top-0 bg-primary flex flex-row items-center text-xl px-12 py-4 z-50">
            <div className="flex items-center">
                <Image src="/logomasjid.png" width={128} />
                <span className="text-[#F8EDD9] font-extrabold"> Mesjid Nurul Hidayah </span>
            </div>
            <div className="flex-grow flex space-x-12 justify-center">
                <Link href="/" className="text-accent">
                    Home
                </Link>
                <Link href="/services" className="text-accent">
                    Services
                </Link>
                <Link href="/about" className="text-accent">
                    About Us
                </Link>
                <Link href="/tester" className="text-accent ml-4">
                    Tester
                </Link>
            </div>
            <div className="flex space-x-12">
                {data?.user ? (
                    <>
                        <p>User Img</p>
                        <p>Welcome {data?.user.email}</p>
                        <Link href="" className="text-accent">
                            Log Out
                        </Link>
                    </>
                ) : (
                    <>
                        <Link href="/login" className="text-accent">
                            Log In
                        </Link>
                        <Link href="/signup" className="text-accent">
                            Sign Up
                        </Link>
                    </>
                )
                }
            </div>
        </nav>
    );
}