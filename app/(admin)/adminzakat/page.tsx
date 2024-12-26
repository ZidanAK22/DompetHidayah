"use client";

import React, { useState, useEffect } from "react";
import styles from './zakat.module.css';
import { supabase } from "@/app/utils/supabase/supabase_client";

interface ZakatData {
    id: number;
    upz: string;
    jumlahMuzaki: number;
    berasMuzaki: number;
    uangMuzaki: number;
    nilaiBerasMuzaki: number;
    totalMuzaki: number;
    jumlahMustahik: number;
    berasMustahik: number;
    uangMustahik: number;
    nilaiBerasMustahik: number;
    totalMustahik: number;
    keterangan: string;
}

interface SupabaseZakatData {
    id_upz: string;
    nama_upz: string; // Same as ZakatData
    jumlah_muzaki: number;
    beras_muzaki: number;
    uang_muzaki: number;
    nilai_beras_muzaki: number;
    total_muzaki: number;
    jumlah_mustahik: number;
    beras_mustahik: number;
    uang_mustahik: number;
    nilai_beras_mustahik: number;
    total_mustahik: number;
    keterangan: string; // Same as ZakatData
}

const mapToSupabaseData = (data: ZakatData[]): SupabaseZakatData[] => {
    return data.map(item => ({
        id_upz: item.upz, // Map `id` to `id_upz`
        nama_upz: item.upz, // Map `upz` to `nama_upz`
        jumlah_muzaki: item.jumlahMuzaki,
        beras_muzaki: item.berasMuzaki,
        uang_muzaki: item.uangMuzaki,
        nilai_beras_muzaki: item.nilaiBerasMuzaki,
        total_muzaki: item.totalMuzaki,
        jumlah_mustahik: item.jumlahMustahik,
        beras_mustahik: item.berasMustahik,
        uang_mustahik: item.uangMustahik,
        nilai_beras_mustahik: item.nilaiBerasMustahik,
        total_mustahik: item.totalMustahik,
        keterangan: item.keterangan,
    }));
};

const mapFromSupabaseData = (data: SupabaseZakatData[]): ZakatData[] => {
    return data.map((item) => ({
        id: parseInt(item.id_upz), // Map `id_upz` to `id`
        upz: item.nama_upz,       // Map `nama_upz` to `upz`
        jumlahMuzaki: item.jumlah_muzaki,
        berasMuzaki: item.beras_muzaki,
        uangMuzaki: item.uang_muzaki,
        nilaiBerasMuzaki: item.nilai_beras_muzaki,
        totalMuzaki: item.total_muzaki,
        jumlahMustahik: item.jumlah_mustahik,
        berasMustahik: item.beras_mustahik,
        uangMustahik: item.uang_mustahik,
        nilaiBerasMustahik: item.nilai_beras_mustahik,
        totalMustahik: item.total_mustahik,
        keterangan: item.keterangan,
    }));
};

const AdminZakatPage = () => {
    const [formData, setFormData] = useState<Omit<ZakatData, "id">>({
        upz: "",
        jumlahMuzaki: 0,
        berasMuzaki: 0,
        uangMuzaki: 0,
        nilaiBerasMuzaki: 0,
        totalMuzaki: 0,
        jumlahMustahik: 0,
        berasMustahik: 0,
        uangMustahik: 0,
        nilaiBerasMustahik: 0,
        totalMustahik: 0,
        keterangan: "",
    });

    const [zakatList, setZakatList] = useState<ZakatData[]>([]);

    const fetchZakatData = async () => {
        try {
            const { data, error } = await supabase.from('zakat').select();
            if (error) {
                console.error('Error fetching data:', error.message);
            } else if (data) {
                const formattedData = mapFromSupabaseData(data as SupabaseZakatData[]);
                setZakatList(formattedData);
                console.log()
            }
        } catch (err) {
            console.error('Unexpected error:', err);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name.includes("Muzaki") || name.includes("Mustahik") ? parseFloat(value) || 0 : value,
        }));
    };

    const insertZakatList = async (data: SupabaseZakatData[]): Promise<void> => {
        try {
            const { error } = await supabase.from('zakat').insert(data);
            if (error) {
                console.error('Error inserting data:', error.message);
            } else {
                console.log('Data inserted successfully');
            }
        } catch (err) {
            console.error('Unexpected error:', err);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const totalMuzaki = formData.berasMuzaki + formData.uangMuzaki + formData.nilaiBerasMuzaki;
        const totalMustahik = formData.berasMustahik + formData.uangMustahik + formData.nilaiBerasMustahik;

        const newEntry = {
            ...formData,
            id: zakatList.length + 1,
            totalMuzaki,
            totalMustahik,
        };

        setZakatList([...zakatList, newEntry]);

        setFormData({
            upz: "",
            jumlahMuzaki: 0,
            berasMuzaki: 0,
            uangMuzaki: 0,
            nilaiBerasMuzaki: 0,
            totalMuzaki: 0,
            jumlahMustahik: 0,
            berasMustahik: 0,
            uangMustahik: 0,
            nilaiBerasMustahik: 0,
            totalMustahik: 0,
            keterangan: "",
        });
    };

    const handlePrint = () => {
        const printContents = document.getElementById('zakat-table')?.outerHTML;
        const originalContents = document.body.innerHTML;

        // Menambahkan logo dan header sebelum mencetak
        const printHeader = `
      <div class="print-header">
        <img src="/logomasjid.png" alt="Logo" style="width: 100px; height: auto; float: left; margin-right: 10px;" />
        <h2 style="display: inline; font-size: 20px;">Data Zakat</h2>
      </div>
    `;

        // Menyusun konten halaman untuk print
        document.body.innerHTML = printHeader + printContents;

        // Mencetak konten
        window.print();

        // Mengembalikan halaman ke keadaan semula
        document.body.innerHTML = originalContents;
    };

    // const handleEdit = (id: number) => {
    //     const dataToEdit = zakatList.find((data) => data.id === id);
    //     if (dataToEdit) {
    //         setFormData(dataToEdit);
    //         setZakatList(zakatList.filter((data) => data.id !== id));
    //     }
    // };

    const handleEdit = (id: number) => {
        const index = zakatList.findIndex((data) => data.id === id);
        if (index !== -1) {
            const updatedList = [...zakatList];
            updatedList[index] = {
                ...updatedList[index],
                ...formData,
                id, // Retain the original ID
            };
            setZakatList(updatedList);
            setFormData({
                upz: "",
                jumlahMuzaki: 0,
                berasMuzaki: 0,
                uangMuzaki: 0,
                nilaiBerasMuzaki: 0,
                totalMuzaki: 0,
                jumlahMustahik: 0,
                berasMustahik: 0,
                uangMustahik: 0,
                nilaiBerasMustahik: 0,
                totalMustahik: 0,
                keterangan: "",
            });
        }
    };


    const handleUpload = (data: ZakatData[]) => {
        const dataupload = mapToSupabaseData(data)

        insertZakatList(dataupload);
    }

    useEffect(() => {
        fetchZakatData();
    }, []);

    return (
        

        <div className="flex flex-row space-x-12 text-gray-800 min-h-screen bg-secondary p-12 text-text rounded-3xl">

            <form onSubmit={handleSubmit} className="space-y-4">
                <h1 className="text-center text-3xl font-bold mb-6 text-black">Form Input Data Zakat</h1>
                <div className="space-y-2">
                    <label htmlFor="upz" className="font-semibold text-gray-700">UPZ Pengumpul:</label>
                    <input
                        type="text"
                        id="upz"
                        name="upz"
                        value={formData.upz}
                        onChange={handleChange}
                        className={`w-full p-2 border border-gray-300 rounded ${styles.inputText}`}
                        required
                    />
                </div>

                <h3 className="text-xl font-semibold mt-6 text-gray-800">Penerima</h3>
                <div className="space-y-2">
                    <label className="font-semibold text-gray-700">Jumlah Muzaki:</label>
                    <input
                        type="number"
                        name="jumlahMuzaki"
                        value={formData.jumlahMuzaki || ""}
                        onChange={handleChange}
                        className={`w-full p-2 border border-gray-300 rounded ${styles.inputText}`}
                    />
                    <label className="font-semibold text-gray-700">Beras (kg.):</label>
                    <input
                        type="number"
                        name="berasMuzaki"
                        value={formData.berasMuzaki || ""}
                        onChange={handleChange}
                        className={`w-full p-2 border border-gray-300 rounded ${styles.inputText}`}
                    />
                    <label className="font-semibold text-gray-700">Uang (Rp.):</label>
                    <input
                        type="number"
                        name="uangMuzaki"
                        value={formData.uangMuzaki || ""}
                        onChange={handleChange}
                        className={`w-full p-2 border border-gray-300 rounded ${styles.inputText}`}
                    />
                    <label className="font-semibold text-gray-700">Nilai Beras Diuangkan:</label>
                    <input
                        type="number"
                        name="nilaiBerasMuzaki"
                        value={formData.nilaiBerasMuzaki || ""}
                        onChange={handleChange}
                        className={`w-full p-2 border border-gray-300 rounded ${styles.inputText}`}
                    />
                </div>

                <h3 className="text-xl font-semibold mt-6 text-gray-800">Pendistribusian</h3>
                <div className="space-y-2">
                    <label className="font-semibold text-gray-700">Jumlah Mustahik:</label>
                    <input
                        type="number"
                        name="jumlahMustahik"
                        value={formData.jumlahMustahik || ""}
                        onChange={handleChange}
                        className={`w-full p-2 border border-gray-300 rounded ${styles.inputText}`}
                    />
                    <label className="font-semibold text-gray-700">Beras (kg.):</label>
                    <input
                        type="number"
                        name="berasMustahik"
                        value={formData.berasMustahik || ""}
                        onChange={handleChange}
                        className={`w-full p-2 border border-gray-300 rounded ${styles.inputText}`}
                    />
                    <label className="font-semibold text-gray-700">Uang (Rp.):</label>
                    <input
                        type="number"
                        name="uangMustahik"
                        value={formData.uangMustahik || ""}
                        onChange={handleChange}
                        className={`w-full p-2 border border-gray-300 rounded ${styles.inputText}`}
                    />
                    <label className="font-semibold text-gray-700">Nilai Beras Diuangkan:</label>
                    <input
                        type="number"
                        name="nilaiBerasMustahik"
                        value={formData.nilaiBerasMustahik || ""}
                        onChange={handleChange}
                        className={`w-full p-2 border border-gray-300 rounded ${styles.inputText}`}
                    />
                </div>

                <div className="space-y-2">
                    <label className="font-semibold text-gray-700">Keterangan (Infaq):</label>
                    <textarea
                        name="keterangan"
                        value={formData.keterangan}
                        onChange={handleChange}
                        className={`w-full p-2 border border-gray-300 rounded ${styles.textArea}`}
                    ></textarea>
                </div>

                <button type="submit" className={`bg-primary text-white py-2 px-6 rounded ${styles.button}`}>
                    Simpan
                </button>
            </form>

            {zakatList.length > 0 ? (
                <div className="table-container">
                    <h2 className="text-2xl font-semibold mt-8 text-center">Tabel Data Zakat</h2>
                    <table id="zakat-table" className="w-full mt-4 border-collapse print-table">
                        <thead>
                            <tr>
                                <th className="border p-3 text-left" rowSpan={2}><center>No</center></th>
                                <th className="border p-3 text-left" rowSpan={2}><center>UPZ Pengumpul</center></th>
                                <th className="border p-3 text-left" colSpan={5}><center>Penerima</center></th>
                                <th className="border p-3 text-left" colSpan={5}><center>Pendistribusian</center></th>
                                <th className="border p-3 text-left" rowSpan={2}><center>Keterangan</center></th>
                                <th className="border p-3 text-left" rowSpan={3}><center>Aksi</center></th>
                            </tr>
                            <tr>
                                <th className="border p-3"><center>Jumlah Muzaki</center></th>
                                <th className="border p-3"><center>Beras (kg.)</center></th>
                                <th className="border p-3"><center>Uang (Rp.)</center></th>
                                <th className="border p-3"><center>Nilai Beras Diuangkan</center></th>
                                <th className="border p-3"><center>Jumlah 5&6</center></th>
                                <th className="border p-3"><center>Jumlah Mustahik</center></th>
                                <th className="border p-3"><center>Beras (kg.)</center></th>
                                <th className="border p-3"><center>Uang (Rp.)</center></th>
                                <th className="border p-3"><center>Nilai Beras Diuangkan</center></th>
                                <th className="border p-3"><center>Jumlah 10&11</center></th>
                            </tr>
                            <tr>
                                <th className="border p-3"><center>1</center></th>
                                <th className="border p-3"><center>2</center></th>
                                <th className="border p-3"><center>3</center></th>
                                <th className="border p-3"><center>4</center></th>
                                <th className="border p-3"><center>5</center></th>
                                <th className="border p-3"><center>6</center></th>
                                <th className="border p-3"><center>7</center></th>
                                <th className="border p-3"><center>8</center></th>
                                <th className="border p-3"><center>9</center></th>
                                <th className="border p-3"><center>10</center></th>
                                <th className="border p-3"><center>11</center></th>
                                <th className="border p-3"><center>12</center></th>
                                <th className="border p-3"><center>13</center></th>
                            </tr>
                            <tr>
                                <th className="border p-.5" colSpan={14} style={{ backgroundColor: 'white' }}>
                                    <center></center>
                                </th>
                            </tr>

                        </thead>
                        <tbody>
                            {zakatList.map((zakat, index) => (
                                <tr key={zakat.id}>
                                    <td className="border p-3 text-center">{index + 1}</td>
                                    <td className="border p-3">{zakat.upz}</td>
                                    <td className="border p-3 text-center">{zakat.jumlahMuzaki}</td>
                                    <td className="border p-3 text-center">{zakat.berasMuzaki}</td>
                                    <td className="border p-3 text-center">{zakat.uangMuzaki}</td>
                                    <td className="border p-3 text-center">{zakat.nilaiBerasMuzaki}</td>
                                    <td className="border p-3 text-center">{zakat.totalMuzaki}</td>
                                    <td className="border p-3 text-center">{zakat.jumlahMustahik}</td>
                                    <td className="border p-3 text-center">{zakat.berasMustahik}</td>
                                    <td className="border p-3 text-center">{zakat.uangMustahik}</td>
                                    <td className="border p-3 text-center">{zakat.nilaiBerasMustahik}</td>
                                    <td className="border p-3 text-center">{zakat.totalMustahik}</td>
                                    <td className="border p-3">{zakat.keterangan}</td>
                                    <td className="border p-3 text-center">
                                        <button onClick={() => handleEdit(zakat.id)} className={`bg-primary text-white py-2 px-10 rounded ${styles.button}`}>
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="print-button-container mt-4 space-x-8">
                        <button onClick={handlePrint} className={`bg-primary text-white py-2 px-6 rounded ${styles.button}`}>
                            Print Data
                        </button>
                        <button onClick={() => handleUpload(zakatList)} className={`bg-primary text-white py-2 px-6 rounded ${styles.button}`}>
                            Upload ke Database
                        </button>
                    </div>
                </div>
            ) : (
                <p className="mt-4 text-center">Belum ada data zakat yang dimasukkan.</p>
            )}
        </div>
    );
};

export default ZakatPage;