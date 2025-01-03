import type { Metadata } from "next";
import { Inter, Inknut_Antiqua } from "next/font/google";
import "../globals.css"
import NavbarCustom from "../ui/navbar/navbar";
import FooterCustom from "../ui/footer/footer";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });
const inknut = Inknut_Antiqua({
  subsets: ["latin"],
  weight: "300"
});



export const metadata: Metadata = {
  title: "Dompet Hidayah",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inknut.className} min-h-screen flex flex-col`}>
        <NavbarCustom />        
          <main className="min-h-fit lg:px-24 flex flex-grow items-center justify-center">
            {children}
          </main>        
        <FooterCustom />
      </body>
    </html>
  );
}
