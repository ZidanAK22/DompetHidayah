import { Link, Image } from "@nextui-org/react";
import { createClient } from "@/app/utils/supabase/supabase_server";

export default async function NavbarCustom() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser()


    return (
        <nav className="sticky top-0 bg-primary flex flex-row items-center text-xl justify-center sm:justify-between sm:px-2 px-12 py-4 z-50">
            <div className="flex items-center">
                <Image src="/logomasjid.png" width={96} />
                <span className="text-[#F8EDD9] font-extrabold"> Mesjid Nurul Hidayah </span>
            </div>
            <div className="flex-grow flex sm:space-x-2 space-x-12 justify-center">
                <Link href="/homepage" className="text-accent">
                    Home
                </Link>
                <Link href="/services" className="text-accent">
                    Services
                </Link>
                <Link href="/about" className="text-accent">
                    About Us
                </Link>
            </div>
            <div className="flex justify-center space-x-2 text-accent">
                {user ? (
                    <>
                        <p>{user.email}</p>
                        <Link href="/dashboardAdmin" className="text-accent">
                            <span>Dashboard Admin</span>
                        </Link>
                        <form action="/auth/signout" method="post">
                            <button className="button block" type="submit">
                                Sign out
                            </button>
                        </form>
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
        </nav >
    );
}
