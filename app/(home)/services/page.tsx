export default function ServicesPage() {
    return (
        <div className="flex flex-row justify-evenly bg-[#2A3B2F] p-10">
            <div className="bg-[#EDE5D8] w-1/4 rounded-lg shadow-lg p-6 text-center">
                <img
                    src="/infaq.png"
                    alt="Infaq"
                    className="w-12 h-12 mx-auto mb-4"
                />
                <p className="text-gray-700 text-sm mb-4">
                    Infaq adalah pemberian harta secara sukarela di jalan Allah, baik untuk
                    keperluan pribadi, sosial, maupun agama, tanpa batasan jumlah.
                </p>
                <button className="bg-[#F2C94C] text-white py-2 px-4 rounded">
                    Infaq
                </button>
            </div>
            <div className="bg-[#EDE5D8] w-1/4 rounded-lg shadow-lg p-6 text-center">
                <img
                    src="social.png"
                    alt="Zakat"
                    className="w-12 h-12 mx-auto mb-4"
                />
                <p className="text-gray-700 text-sm mb-4">
                    Zakat adalah kewajiban umat Islam untuk memberikan sebagian harta kepada
                    yang berhak sebagai penyucian harta dan kepedulian sosial.
                </p>
                <button className="bg-[#F2C94C] text-white py-2 px-4 rounded">
                    Zakat
                </button>
            </div>
            <div className="bg-[#EDE5D8] w-1/4 rounded-lg shadow-lg p-6 text-center">
                <img
                    src="sedekah.png"
                    alt="Sedekah"
                    className="w-12 h-12 mx-auto mb-4"
                />
                <p className="text-gray-700 text-sm mb-4">
                    Sedekah adalah pemberian sukarela dari seseorang kepada orang lain atau yang
                    membutuhkan, sebagai bentuk amal dan kepedulian.
                </p>
                <button className="bg-[#F2C94C] text-white py-2 px-4 rounded">
                    Sedekah
                </button>
            </div>
        </div>
    );
}
