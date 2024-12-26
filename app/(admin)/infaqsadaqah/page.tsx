"use client";

import React, { useState, ChangeEvent } from "react";
import { Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { supabase } from "@/app/utils/supabase/supabase_client";

interface Sadaqah {
  nama_pengirim: string;
  ceklis_hide: boolean;
  jumlah: number;
  created_at: Date;
  jenis_transaksi: string;
}

interface Infaq {
  nama_pengirim: string;
  ceklis_hide: boolean;
  jumlah: number;
  created_at: Date;
  jenis_transaksi: string;
}

export default function InputDataPage() {
  const [formData, setFormData] = useState({
    nama_pengirim: "",
    ceklis_hide: false,
    jumlah: "",
    jenis_transaksi: "infaq",
    created_at: new Date().toISOString(),
  });

  const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(new Set(["infaq"]));
  const [dataList, setDataList] = useState<(Sadaqah | Infaq)[]>([]);

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replace(/_/g, " "),
    [selectedKeys]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: target.checked,
      });
    } else if (name === "jumlah") {
      const formattedValue = value.replace(/\D/g, ""); // Only allow numbers
      setFormData({
        ...formData,
        [name]: formattedValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newEntry = {
      nama_pengirim: formData.nama_pengirim,
      ceklis_hide: formData.ceklis_hide,
      jumlah: Number(formData.jumlah),
      created_at: new Date(),
      jenis_transaksi: formData.jenis_transaksi,
    };

    setDataList([...dataList, newEntry]);
    setFormData({
      nama_pengirim: "",
      ceklis_hide: false,
      jumlah: "",
      jenis_transaksi: "infaq",
      created_at: new Date().toISOString(),
    });
  };

  const handleEdit = (index: number) => {
    const itemToEdit = dataList[index];
    setFormData({
      nama_pengirim: itemToEdit.nama_pengirim,
      ceklis_hide: itemToEdit.ceklis_hide,
      jumlah: itemToEdit.jumlah.toString(),
      jenis_transaksi: "infaq", // Default to infaq for simplicity
      created_at: itemToEdit.created_at.toISOString(),
    });

    // Remove the item from the list temporarily
    const updatedList = [...dataList];
    updatedList.splice(index, 1);
    setDataList(updatedList);
  };

  const handleDelete = (index: number) => {
    const updatedList = [...dataList];
    updatedList.splice(index, 1);
    setDataList(updatedList);
  };

  const handleUpload = (data: Sadaqah[]) => {
    insertDataList(data);
  }

  const insertDataList = async (data: Sadaqah[]): Promise<void> => {
    try {
      const { error } = await supabase.from('sadaqahinfaq').insert(data);
      if (error) {
        console.error('Error inserting data:', error.message);
      } else {
        console.log('Data inserted successfully');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  const formattedJumlah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(Number(formData.jumlah) || 0);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center bg-primary px-4 py-8 mt-12 mx-32 rounded-xl">
      {/* Header */}
      <div className="flex flex-col items-center">
        <h1 className="text-[32px] font-bold">Input Data</h1>
        <span className="opacity-50">Masukkan Data Infaq atau Sadaqah</span>
      </div>

      {/* Input Form */}
      <div className="min-w-full bg-secondary flex justify-center items-center rounded-xl mt-8 text-[#000000] px-6 py-12">
        <form className="flex flex-col gap-6 max-w-xl w-full" onSubmit={handleSubmit}>
          {/* Input Nama Pengirim */}
          <div className="flex flex-col gap-2 text-left">
            <label className="text-sm font-medium">Nama Pengirim</label>
            <Input
              type="text"
              name="nama_pengirim"
              variant="bordered"
              placeholder="Masukkan Nama Pengirim"
              value={formData.nama_pengirim}
              onChange={handleChange}
            />
          </div>

          {/* Input Jumlah */}
          <div className="flex flex-col gap-2 text-left">
            <label className="text-sm font-medium">Jumlah</label>
            <Input
              type="number"
              name="jumlah"
              variant="bordered"
              placeholder="Masukkan Jumlah"
              value={formData.jumlah}
              onChange={handleChange}
            />
            {/* Display formatted currency */}
            <div className="text-xs text-gray-500 mt-2">{formattedJumlah}</div>
          </div>

          {/* Dropdown for Jenis Transaksi */}
          <div className="flex flex-col gap-2 text-left">
            <label className="text-sm font-medium">Jenis Transaksi</label>
            <Dropdown>
              <DropdownTrigger>
                <Button className="capitalize bg-accent rounded-md px-4 py-2">
                  {selectedValue || "Select Transaksi"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Single selection"
                selectedKeys={selectedKeys}
                selectionMode="single"
                variant="flat"
                onSelectionChange={(keys) => {
                  const selectedKey = keys as Set<string>;
                  setSelectedKeys(selectedKey);
                  setFormData({
                    ...formData,
                    jenis_transaksi: Array.from(selectedKey).join(", "),
                  });
                }}
              >
                <DropdownItem key="infaq">Infaq</DropdownItem>
                <DropdownItem key="sadaqah">Sadaqah</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* Checkbox Ceklis Hide */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="ceklis_hide"
              checked={formData.ceklis_hide}
              onChange={handleChange}
            />
            <label className="text-sm font-medium">Ceklis Hide</label>
          </div>
          <Button type="submit" className="bg-accent rounded-md px-4 py-2 justify-center">
            Submit
          </Button>
        </form>
      </div>

      {/* Table */}
      <div className="mt-8 w-full">
        <h2 className="text-xl font-bold mb-4">Data Infaq dan Sadaqah</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">No</th>
              <th className="border p-2">Nama Pengirim</th>
              <th className="border p-2">Jumlah</th>
              <th className="border p-2">Jenis Transaksi</th>
              <th className="border p-2">Tanggal</th>
              <th className="border p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((data, index) => (
              <tr key={index}>
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="border p-2">{data.nama_pengirim}</td>
                <td className="border p-2">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(data.jumlah)}</td>
                <td className="border p-2">{data.jenis_transaksi}</td>
                <td className="border p-2">{new Date(data.created_at).toLocaleDateString()}</td>
                <td className="border p-2 text-center">
                  <button
                    className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="bg-red-500 text-white px-4 py-1 rounded button bg-accent text-text justify-center m-4 p-8"
          onClick={() => handleUpload(dataList)}
        >
          Upload
        </button>
      </div>
    </div>
  );
}
