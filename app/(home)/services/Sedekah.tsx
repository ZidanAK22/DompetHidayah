export default function SedekahPage() {
    return (
        <div className="min-h-screen bg-[#2A3B2F] flex justify-center items-center p-6">
            {/* Container Utama */}
            <div className="flex flex-row bg-[#2A3B2F] text-white max-w-4xl shadow-lg rounded-lg overflow-hidden">
                {/* Bagian Kiri - Informasi */}
                <div className="w-2/3 bg-[#2A3B2F] p-8">
                    {/* Header */}
                    <h1 className="text-2xl font-bold text-[#F6EFE2] mb-4">Infaq</h1>
                    {/* Deskripsi */}
                    <p className="text-[#F6EFE2] mb-4 leading-relaxed">
                        Sedekah adalah pemberian sukarela yang dilakukan oleh seseorang kepada orang lain tanpa paksaan dan tanpa batasan jumlah.
                    </p>
                    <p className="text-[#F6EFE2] mb-4 leading-relaxed">
                        Tujuan dari sedekah adalah membantu mereka yang membutuhkan, seperti fakir miskin, atau untuk mendukung kegiatan sosial dan keagamaan. 
                        Sedekah tidak hanya terbatas pada pemberian materi, tetapi juga mencakup kebaikan non-materi seperti senyuman, bantuan tenaga, dan nasihat.
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
                        src="/sodekah.png"
                        alt="Kotak Infaq"
                        className="w-64 h-64 object-contain"
                    />
                </div>
            </div>
        </div>
    );
}
