import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Image} from "@nextui-org/react";

export default function NavbarCustom () {
    return (
    <Navbar className="flex flex-row items-center justify-between bg-[#327039] w-full">
        <NavbarBrand className="flex bg">      
            <Link href="/" className="flex">
                <Image className="m-1" src="/logomasjid.png" width={96}/>                
                <p className="ml-3 font-extrabold text-[#F8EDD9] text-xl">Mesjid Nurul Hidayah</p>                
            </Link>  
        </NavbarBrand>     
        <NavbarContent className="flex space-x-20 text-xl">
            <NavbarItem>
                <Link href="/">
                    Home
                </Link>
            </NavbarItem>
            <NavbarItem>
                <Link href="/service">
                    Service
                </Link>
            </NavbarItem>
            <NavbarItem>
            <Link href="/about">
                    About Us
                </Link>
            </NavbarItem>
        </NavbarContent>
        <NavbarContent className="flex space-x-4 mr-10 text-xl">
            <NavbarItem className="">
                <Link href="/products">
                    Log In
                </Link>                
            </NavbarItem>
            <NavbarItem>
                <Link href="/products">
                    Sign Up
                </Link>
            </NavbarItem>     
        </NavbarContent>
    </Navbar>
    );
}