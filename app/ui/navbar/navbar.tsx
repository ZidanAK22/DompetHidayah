import {Link, Image} from "@nextui-org/react";

export default function NavbarCustom () {
    return (
    // <Navbar position="static" className="bg-[#327039] py-4" maxWidth="full">
    //     <NavbarBrand>
    //         <Image src="/logomasjid.png" width={128}/>
    //         <span className="text-xl"> Mesjid Nurul Hidayah </span>
    //     </NavbarBrand>
        
    //         <NavbarContent justify="center">
    //             <Link>
    //                 Home
    //             </Link>
    //                 Jasa Kami
    //             <Link>
    //             </Link>
    //             <Link>
    //                 Tentang Kami
    //             </Link>
    //         </NavbarContent>        
        

    //     <NavbarContent justify="end">
    //         <Link>
    //             Log In
    //         </Link>
    //         <Link>
    //             Log Out
    //         </Link>
    //     </NavbarContent>
    // </Navbar>    
    <nav className="sticky top-0 bg-primary flex flex-rpw items-center text-xl px-12 py-4 z-50">
        <div className="flex items-center">
            <Image src="/logomasjid.png" width={128}/>
            <span className="text-[#F8EDD9] font-extrabold"> Mesjid Nurul Hidayah </span>
        </div>
        <div className="flex-grow flex space-x-12 justify-center">
            <Link href="/">
                Home
            </Link>                
            <Link href="/services">
                Services
            </Link>
            <Link href="/about">
                About Us
            </Link>
        </div>
        <div className="flex space-x-12">
            <Link href="/login">
                Log In
            </Link>
            <Link href="/signup">
                Sign Up
            </Link>
        </div>
    </nav>
    );
}