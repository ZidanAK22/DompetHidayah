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
    nama_upz: string;
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
    keterangan: string;
}

const mapToSupabaseData = (data: ZakatData[]): SupabaseZakatData[] => {
    return data.map(item => ({
        id_upz: item.upz, 
        nama_upz: item.upz, 
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
        id: parseInt(item.id_upz),
        upz: item.nama_upz,
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

const ZakatPage = () => {
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

        const printHeader = `
      <div class="print-header">
        <img src="/logomasjid.png" alt="Logo" style="width: 100px; height: auto; float: left; margin-right: 10px;" />
        <h2 style="display: inline; font-size: 20px;">Data Zakat</h2>
      </div>
    `;

        document.body.innerHTML = printHeader + printContents;

        window.print();

        setTimeout(() => {
            document.body.innerHTML = originalContents;
        }, 500); // Wait for print to finish
    };

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
        const dataupload = mapToSupabaseData(data);
        insertZakatList(dataupload);
    };

    useEffect(() => {
        fetchZakatData();
    }, []);

    return (
        <div className="flex flex-col space-y-12 text-gray-800 min-h-screen bg-secondary p-12 text-text rounded-3xl">
            <form onSubmit={handleSubmit} className="space-y-4">
                <h1 className="text-center text-3xl font-bold mb-6 text-black">Form Input Data Zakat</h1>
                <div>
                    <label htmlFor="upz" className="block text-lg">UPZ</label>
                    <input
                        id="upz"
                        name="upz"
                        type="text"
                        value={formData.upz}
                        onChange={handleChange}
                        className="border-2 rounded p-2 w-full"
                    />
                </div>

                <div>
                    <label htmlFor="jumlahMuzaki" className="block text-lg">Jumlah Muzaki</label>
                    <input
                        id="jumlahMuzaki"
                        name="jumlahMuzaki"
                        type="number"
                        value={formData.jumlahMuzaki}
                        onChange={handleChange}
                        className="border-2 rounded p-2 w-full"
                    />
                </div>

                <div>
                    <label htmlFor="berasMuzaki" className="block text-lg">Beras Muzaki (kg)</label>
                    <input
                        id="berasMuzaki"
                        name="berasMuzaki"
                        type="number"
                        value={formData.berasMuzaki}
                        onChange={handleChange}
                        className="border-2 rounded p-2 w-full"
                    />
                </div>

                <div>
                    <label htmlFor="uangMuzaki" className="block text-lg">Uang Muzaki (Rp)</label>
                    <input
                        id="uangMuzaki"
                        name="uangMuzaki"
                        type="number"
                        value={formData.uangMuzaki}
                        onChange={handleChange}
                        className="border-2 rounded p-2 w-full"
                    />
                </div>

                <div>
                    <label htmlFor="nilaiBerasMuzaki" className="block text-lg">Nilai Beras Muzaki (Rp)</label>
                    <input
                        id="nilaiBerasMuzaki"
                        name="nilaiBerasMuzaki"
                        type="number"
                        value={formData.nilaiBerasMuzaki}
                        onChange={handleChange}
                        className="border-2 rounded p-2 w-full"
                    />
                </div>

                <div>
                    <label htmlFor="jumlahMustahik" className="block text-lg">Jumlah Mustahik</label>
                    <input
                        id="jumlahMustahik"
                        name="jumlahMustahik"
                        type="number"
                        value={formData.jumlahMustahik}
                        onChange={handleChange}
                        className="border-2 rounded p-2 w-full"
                    />
                </div>

                <div>
                    <label htmlFor="berasMustahik" className="block text-lg">Beras Mustahik (kg)</label>
                    <input
                        id="berasMustahik"
                        name="berasMustahik"
                        type="number"
                        value={formData.berasMustahik}
                        onChange={handleChange}
                        className="border-2 rounded p-2 w-full"
                    />
                </div>

                <div>
                    <label htmlFor="uangMustahik" className="block text-lg">Uang Mustahik (Rp)</label>
                    <input
                        id="uangMustahik"
                        name="uangMustahik"
                        type="number"
                        value={formData.uangMustahik}
                        onChange={handleChange}
                        className="border-2 rounded p-2 w-full"
                    />
                </div>

                <div>
                    <label htmlFor="nilaiBerasMustahik" className="block text-lg">Nilai Beras Mustahik (Rp)</label>
                    <input
                        id="nilaiBerasMustahik"
                        name="nilaiBerasMustahik"
                        type="number"
                        value={formData.nilaiBerasMustahik}
                        onChange={handleChange}
                        className="border-2 rounded p-2 w-full"
                    />
                </div>

                <div>
                    <label htmlFor="keterangan" className="block text-lg">Keterangan</label>
                    <textarea
                        id="keterangan"
                        name="keterangan"
                        value={formData.keterangan}
                        onChange={handleChange}
                        className="border-2 rounded p-2 w-full"
                    />
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
                                <th className="border px-4 py-2">UPZ</th>
                                <th className="border px-4 py-2">Jumlah Muzaki</th>
                                <th className="border px-4 py-2">Beras Muzaki</th>
                                <th className="border px-4 py-2">Uang Muzaki</th>
                                <th className="border px-4 py-2">Nilai Beras Muzaki</th>
                                <th className="border px-4 py-2">Total Muzaki</th>
                                <th className="border px-4 py-2">Jumlah Mustahik</th>
                                <th className="border px-4 py-2">Beras Mustahik</th>
                                <th className="border px-4 py-2">Uang Mustahik</th>
                                <th className="border px-4 py-2">Nilai Beras Mustahik</th>
                                <th className="border px-4 py-2">Total Mustahik</th>
                                <th className="border px-4 py-2">Keterangan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {zakatList.map((item) => (
                                <tr key={item.id}>
                                    <td className="border px-4 py-2">{item.upz}</td>
                                    <td className="border px-4 py-2">{item.jumlahMuzaki}</td>
                                    <td className="border px-4 py-2">{item.berasMuzaki}</td>
                                    <td className="border px-4 py-2">{item.uangMuzaki}</td>
                                    <td className="border px-4 py-2">{item.nilaiBerasMuzaki}</td>
                                    <td className="border px-4 py-2">{item.totalMuzaki}</td>
                                    <td className="border px-4 py-2">{item.jumlahMustahik}</td>
                                    <td className="border px-4 py-2">{item.berasMustahik}</td>
                                    <td className="border px-4 py-2">{item.uangMustahik}</td>
                                    <td className="border px-4 py-2">{item.nilaiBerasMustahik}</td>
                                    <td className="border px-4 py-2">{item.totalMustahik}</td>
                                    <td className="border px-4 py-2">{item.keterangan}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="text-center">
                        <button onClick={handlePrint} className="bg-primary text-white py-2 px-6 mt-4 rounded">
                            Print
                        </button>
                    </div>
                </div>
            ) : (
                <p>Data belum tersedia.</p>
            )}
        </div>
    );
};

export default ZakatPage;
