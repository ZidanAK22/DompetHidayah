import { Lilita_One } from "next/font/google";
import { Link, Image } from "@nextui-org/react";
const lilita = Lilita_One( {
    weight: "400",
    subsets: ["latin"],
    style: "normal"    
} )

export default function FooterCustom() {
    return (
        <div className="bottom-0 bg-primary w-full flex flex-row p-10 justify-between mt-12">                        
            
            {/* Contact Information */}
            <div>
                <div className="text-[text]">
                    <div className={lilita.className}>
                        <p className="text-2xl">Dompet Hidayah</p>
                    </div>                    
                    <p className="mt-3">
                        Jl. Babakan Sari 1, Babakan Sari, 
                        Kec. Kiaracondong, 
                        Kota Bandung, Jawa Barat 40283</p>                    
                </div>

                <Link isExternal href="https://instagram.com/mjnurulhidayah" className="flex mt-10">
                    <Image src="/Instagram_Glyph_White.png" width={24}/>
                    <p className="ml-3">@mjnurulhidayah</p>
                </Link>

                <div className="flex mt-3">
                    <Image src="telefon.png" width={24}/>
                    <p className="ml-3">0892516826</p>
                </div>


                
            </div>

            <div>
                <Image src="/map_placeholder.png"/>
            </div>

        </div>
    )
}