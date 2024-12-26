'use client'

import { useState } from 'react';
import NavbarAdmin from "../../ui/navbar/navbarAdmin";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [profileDropdown, setProfileDropdown] = useState(false);

    return (
        <div className="flex flex-col min-h-screen">
            <NavbarAdmin />

            <main className="flex-grow p-8 bg-gray-100">{children}</main>
        </div>
    );
}
