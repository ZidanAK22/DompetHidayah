export default function zakatPage() {
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
                    Zakat adalah kewajiban bagi setiap Muslim yang mampu, berupa pemberian sebagian harta 
                    kepada kelompok tertentu yang berhak menerimanya (asnaf). Zakat merupakan salah satu 
                    dari lima rukun Islam dan memiliki peran penting dalam mewujudkan kesejahteraan sosial 
                    serta mengurangi kesenjangan ekonomi di masyarakat.
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
                        src="/zakat1.png"
                        alt="Kotak Infaq"
                        className="w-64 h-64 object-contain"
                    />
                </div>
            </div>
        </div>
    );
}
