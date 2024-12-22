import { Image } from "@nextui-org/react"

export default function aboutPage() {
    return (
    <div>    
        <div className="flex flex-row items-center p-28 text-balance">
            <div className="flex-auto flex-row items-center">
                <p className="text-xl bg-[#327039] text-[#F8EDD9] rounded-xl w-auto p-4 inline-block mx-auto">
                    Mesjid Nurul Hidayah
                </p>
                <p className="text-justify mt-10">
                Dompet Hidayah adalah 
                sebuah platform yang 
                memudahkan pengelolaan 
                zakat, infaq, dan sedekah (ZIS) 
                secara digital, menawarkan solusi 
                praktis dan efisien 
                bagi umat Muslim dalam 
                menunaikan kewajiban dan amal 
                sosial mereka. Melalui Dompet Hidayah, 
                pengguna dapat dengan mudah menghitung, 
                membayar, dan menyalurkan zakat 
                sesuai dengan ketentuan syariah, 
                serta memberikan infaq dan sedekah ke 
                berbagai program sosial
                </p>
            </div>
            <div className="flex-none">
            <Image src="/logomasjid.png" width={384}/> 
            </div>

            
        </div>    

        <div className="text-center items-center">
            <p className="text-3xl font-bold text-[#F8EDD9] mb-8 px-12 ">
                Menebar Kebaikan Untuk Membangun Kebersamaan
            </p>
            <p className="text-balance">
                Setiap Kebaikanmu, Langkah Menuju Kebersamaan. Jadilah Penggerak Kebaikan, Wujudkan Harapan Bersama
            </p>
        </div>
        
        <div className="flex flex-row px-60 py-20 space-x-12 text-center">
            <div className="flex-1">
                <p className="bg-[#F4BC48] text-black text-2xl inline-block rounded px-8 py-4">
                    Visi
                </p>
                <div className="bg-[#317039] rounded text-balance p-20 -mt-8 min-h-full flex justify-center items-center">
                    <p className="tracking-widest">
                        Menjadi pusat ibadah dan kegiatan sosial yang inklusif, 
                        memberdayakan masyarakat melalui layanan sedekah, zakat, dan infaq berbasis digital, 
                        dengan semangat meningkatkan kesejahteraan umat 
                    </p>
                </div>                
            </div>
            <div className="flex-1">
                <p className="bg-[#F4BC48] text-black text-2xl inline-block rounded px-8 py-4">
                    Misi
                </p>
                <div className="bg-[#317039] rounded text-balance p-20 -mt-8 min-h-full flex justify-center items-center">
                    <p className="space-y-4">
                        Menyediakan Platform Digital
                        <br/>
                        Pemberdayaan Masyarakat
                        <br/>
                        Transparansi dan Akuntabilitas
                        <br/>
                        Pendidikan dan Kesadaran
                        <br/>
                        Pelayanan Prima
                    </p>
                </div>
            </div>
        </div>
    </div>
    )
}