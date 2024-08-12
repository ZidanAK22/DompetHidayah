import {Image} from "@nextui-org/image";

import { Limelight } from "next/font/google";

const lime = Limelight({
  subsets: ['latin'],
  weight: ['400'],
})
export default function Home() {
  return (
    <div className="flex flex-col h-screen mt-10 p-10">      
      <div className="flex flex-row justify-evenly">
        <Image src="zakat.png" width={500} className="flex-1"/>            
        <div className="p-20 flex-1">
          <div className={lime.className}>
            <p className="text-5xl mb-10">
              Dompet Hidayah
            </p>
          </div>
          <p>
            Dompet Hidayah adalah 
            sebuah platform yang 
            memudahkan pengelolaan 
            zakat, infaq, dan sedekah (ZIS) 
            secara digital, menawarkan 
            solusi praktis dan efisien 
            bagi umat Muslim dalam menunaikan 
            kewajiban dan amal sosial mereka. 
            Melalui Dompet Hidayah, 
            pengguna dapat dengan mudah menghitung, 
            membayar, dan menyalurkan zakat sesuai 
            dengan ketentuan syariah, serta 
            memberikan infaq dan sedekah 
            ke berbagai program sosial
          </p>
        </div>        
      </div>      
    </div>    
  )   
}
