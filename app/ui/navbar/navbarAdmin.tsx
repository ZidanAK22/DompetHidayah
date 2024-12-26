import { Image, Link } from "@nextui-org/react";
import { createClient } from "@/app/utils/supabase/supabase_server";

export default async function NavbarCustom() {
    const supabase = await createClient();

    // Fetch user server-side
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <nav className="sticky top-0 bg-primary flex flex-row items-center text-xl px-6 py-4 z-50 mb-12 md:px-12 md:py-4">
            <div className="flex items-center">
                <Image src="/logomasjid.png" width={128} className="w-16 md:w-32" />
                <span className="text-[#F8EDD9] font-extrabold text-sm md:text-lg"> Mesjid Nurul Hidayah </span>
            </div>
            <div className="flex-grow flex space-x-6 md:space-x-12 justify-center">
                <Link href="/infaq-sadaqah" className="text-accent text-sm md:text-base">
                    Infaq & Sadaqah
                </Link>
                <Link href="/zakat" className="text-accent text-sm md:text-base">
                    Zakat
                </Link>
            </div>
            {user && (
                <div className="flex items-center space-x-4">
                    <span className="text-accent font-bold text-sm md:text-base">
                        {user.email}
                    </span>
                    <form action="/auth/signout" method="post">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </form>
                </div>
            )}
        </nav>
    );
}
