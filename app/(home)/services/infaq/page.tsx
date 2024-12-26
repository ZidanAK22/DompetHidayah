export default function InfaqPage() {
    return (
        <div className="min-h-screen bg-[#2A3B2F] flex justify-center items-center p-6">
            {/* Container utama */}
            <div className="flex flex-row bg-[#2A3B2F] text-white max-w-4xl shadow-lg rounded-lg overflow-hidden">
                {/* Bagian Kiri - Informasi */}
                <div className="w-2/3 bg-[#2A3B2F] p-8">
                    {/* Header */}
                    <h1 className="text-2xl font-bold text-[#F6EFE2] mb-4">Infaq</h1>
                    {/* Deskripsi */}
                    <p className="text-[#F6EFE2] mb-4 leading-relaxed">
                        Infaq adalah pengeluaran harta yang dilakukan oleh seseorang untuk kepentingan di jalan Allah. 
                        Berbeda dengan zakat yang wajib dan memiliki aturan serta ketentuan tertentu, infaq bersifat sunnah 
                        (anjuran) dan tidak ada batasan jumlah atau waktu tertentu.
                    </p>
                    <p className="text-[#F6EFE2] leading-relaxed">
                        Infaq bisa diberikan kepada siapa saja, baik individu maupun lembaga, dan dapat digunakan untuk 
                        berbagai keperluan, seperti membantu fakir miskin, mendukung pembangunan masjid, atau menyokong 
                        kegiatan sosial dan keagamaan. Infaq juga dapat dilakukan dalam bentuk dukungan untuk hal-hal 
                        yang bermanfaat bagi masyarakat umum.
                    </p>
                    {/* Tombol */}
                    <div className="mt-6">
                        <button className="bg-[#F1C232] text-[#2A3B2F] py-2 px-6 rounded-lg shadow-lg hover:bg-[#e1b423] transition duration-200">
                            Tunaikan Sekarang
                        </button>
                    </div>
                </div>
                {/* Bagian Kanan - Gambar */}
                <div className="w-1/3 bg-[#2A3B2F] flex justify-center items-center">
                    <img
                        src="/infak.png"
                        alt="Kotak Infaq"
                        className="w-64 h-64 object-contain"
                    />
                </div>
            </div>
        </div>
    );
}
