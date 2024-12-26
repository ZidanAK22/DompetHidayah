import Link from "next/link";

export default function ServicesPage() {
    return (
        <div className="mt-8 flex flex-row justify-evenly bg-primary p-16 text-text rounded-3xl">
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
                <Link href={'/services/infaq'} className="bg-[#F2C94C] text-white py-2 px-4 rounded">
                    Infaq
                </Link>
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
                <Link href={'/services/zakat'} className="bg-[#F2C94C] text-white py-2 px-4 rounded">
                    Zakat
                </Link>
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
                <Link href={'/services/sedekah'} className="bg-[#F2C94C] text-white py-2 px-4 rounded">
                    Sedekah
                </Link>
            </div>
        </div>
    );
}
