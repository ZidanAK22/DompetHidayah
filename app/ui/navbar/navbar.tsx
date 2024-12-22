import { useEffect, useState } from "react";
import { Link, Image, Button } from "@nextui-org/react";
import { createClient } from "@/app/utils/supabase/supabase_server";
import { User } from "@supabase/supabase-js";
import { BarLoader } from "react-spinners";
import { redirect } from "next/navigation";

export default async function NavbarCustom() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser()


    return (
        <nav className="sticky top-0 bg-primary flex flex-row items-center text-xl px-12 py-4 z-50">
            <div className="flex items-center">
                <Image src="/logomasjid.png" width={128} />
                <span className="text-[#F8EDD9] font-extrabold"> Mesjid Nurul Hidayah </span>
            </div>
            <div className="flex-grow flex space-x-12 justify-center">
                <Link href="/index" className="text-accent">
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
                {user ? (
                    <>
                        <p>User Img</p>
                        <p>Welcome {user.email}</p>
                        <div>
                            <form action="/auth/signout" method="post">
                                <button className="button block" type="submit">
                                    Sign out
                                </button>
                            </form>
                        </div>
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
                )}
            </div>
        </nav>
    );
}
