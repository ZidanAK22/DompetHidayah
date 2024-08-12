import type { Metadata } from "next";
import { Inter, Inknut_Antiqua } from "next/font/google";
import "./globals.css";
import NavbarCustom from "./ui/navbar/navbar";

const inter = Inter({ subsets: ["latin"] });
const inknut = Inknut_Antiqua({
  subsets: ["latin"],
  weight: "300"
});


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (    
    <html lang="en">      
      <body className={inknut.className}>
        <NavbarCustom/>
        {children}
      </body>
    </html>
  );
}
