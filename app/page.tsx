// Turn on if using framer motion
// "use client";

import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import { Limelight } from "next/font/google";
import FooterCustom from "./ui/footer/footer";
// import { motion } from 'framer-motion';

const lime = Limelight({
  subsets: ['latin'],
  weight: ['400'],
})

// const textContainerAnimation = {
//   hidden: { opacity: 0, y: -50},
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       staggerChildren: 9.3
//     }
//   }
// }

// const texteItemsAnimation = {
//   hidden: { opacity: 0, y: 20},
//   visible: { opacity: 1, y: 0}
// }

export default function Home() {
  return (
    <div className="flex flex-col mt-10 items-center">

      {/* Dompet Hidayah Desc */}
      <div className="flex flex-row justify-evenly px-60 py-20">
        <Image src="zakat.png" width={500} className="flex-1" />
        <div className="p-20 flex-1">
          <div className={lime.className}>
            <h1 className="text-5xl mb-10">
              Dompet Hidayah
            </h1>
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
          <Link className="text-[#35910b] dark:text-[#ceef47] italic text-lg" href="/">
            Detail
          </Link>
        </div>
      </div>

      <h1 className="mt-20 mb-5 text-[#F4BC48] text-5xl">
        Berbagi untuk Sesama
      </h1>
      <p>
        Donasimu, Harapan Bagi Mereka.
        Jadilah Cahaya di Tengah Kegelapan
        dengan Memberikan Sedikit dari
        Apa yang Kamu Miliki.
      </p>

      <p className="mt-20 -mb-2 bg-[#F8EDD9] text-black rounded-xl p-10 z-10 text-xl">
        Hitung dan Tunaikan Kewajiban
      </p>

      {/* Grafik Kewajiban */}
      <div className="-mt-10 bg-[#DD5C35] rounded-3xl flex flex-row justify-evenly text-black text-center p-20 space-x-20 w-3/5 font-semibold text-xl">
        <div>
          <Image src="infaq.png" width={192} className="mb-5" />
          Infaq
        </div>
        <div>
          <Image src="social.png" width={192} className="mb-5" />
          Zakat
        </div>
        <div>
          <Image src="sedekah.png" width={192} className="mb-5" />
          Sedekah
        </div>
      </div>

      {/* Statistik Penerima Manfaat */}
      <div className="w-full mt-20 text-[#F4BC48] text-center">

        <span className="text-2xl">
          Total Penerima Manfaat
        </span>

        <div className="mt-5 p-10 flex flex-row justify-evenly space-x-10 text-4xl">
          <div>
            <p>8.888</p>
            <p className="text-[#F8EDD9] text-xl mt-5">Ekonomi</p>
          </div>
          <div>
            <p>8.888</p>
            <p className="text-[#F8EDD9] text-xl mt-5">Sosial</p>
          </div>
          <div>
            <p>8.888</p>
            <p className="text-[#F8EDD9] text-xl mt-5">Dakwah</p>
          </div>
          <div>
            <p>8.888</p>
            <p className="text-[#F8EDD9] text-xl mt-5">Pendidikan</p>
          </div>
          <div>
            <p>8.888</p>
            <p className="text-[#F8EDD9] text-xl mt-5">Kesehatan</p>
          </div>
        </div>

      </div>

      {/* Photo showcase, supa dynamic in the future, carousel with hover animations. */}
      <div className="flex flex-row justify-evenly w-full p-10 mt-20">
        <Image src="carousel1.jpg" width={384} className="drop-shadow-2xl" />
        <Image src="carousel2.jpg" width={512} className="-mt-10" />
        <Image src="carousel3.jpg" width={384} className="" />
      </div>

      {/* grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-12 w-full justify-items-center">

        {/* 1st column */}
        <div className="flex flex-row items-stretch w-full max-w-sm">
          {/* Image */}
          <Image width={128} src="/trust.png" alt="Amanah Icon" className="self-start" />
          {/* Text Box */}
          <div className="flex-1 ml-4">
            <h2 className="font-bold text-yellow-400">Amanah</h2>
            <p className="text-white">
              Kami berkomitmen untuk menjaga amanah yang diberikan, memastikan bahwa setiap kontribusi Anda disalurkan kepada yang berhak menerima.
            </p>
          </div>
        </div>

        {/* 2nd column */}
        <div className="flex flex-row items-stretch w-full max-w-sm">
          {/* Image */}
          <Image width={128} src="/transparent.png" alt="Infaq Icon" className="self-start" />
          {/* Text Box */}
          <div className="flex-1 ml-4">
            <h2 className="font-bold text-yellow-400">Inklusif</h2>
            <p className="text-white">
              Kami menerima zakat, sedekah, dan infaq dari dan untuk semua kalangan, tanpa membedakan latar belakang.
            </p>
          </div>
        </div>

        {/* 3rd column */}
        <div className="flex flex-row items-stretch w-full max-w-sm">
          {/* Image */}
          <Image width={128} src="/inclusive.png" alt="Transparent Icon" className="self-start" />
          {/* Text Box */}
          <div className="flex-1 ml-4">
            <h2 className="font-bold text-yellow-400">Transparant</h2>
            <p className="text-white">
              Kejelasan dalam setiap transaksi dan laporan keuangan tersedia untuk diakses oleh donatur.
            </p>
          </div>
        </div>

        {/* 4th column */}
        <div className="flex flex-row items-stretch w-full max-w-sm">
          {/* Image */}
          <Image width={128} src="/honest.png" alt="Jujur Icon" className="self-start" />
          {/* Text Box */}
          <div className="flex-1 ml-4">
            <h2 className="font-bold text-yellow-400">Jujur</h2>
            <p className="text-white">
              Integritas dalam pengelolaan dan distribusi dana zakat, sedekah, dan infaq adalah prioritas kami.
            </p>
          </div>
        </div>

      </div>


    </div>
  )
}
