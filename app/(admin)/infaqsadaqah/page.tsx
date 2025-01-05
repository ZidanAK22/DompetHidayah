"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import { Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { supabase } from "@/app/utils/supabase/supabase_client";

type Sadaqah = {
  id?: number;
  nama_pengirim: string;
  ceklis_hide: boolean;
  jumlah: number;
  created_at: Date;
  jenis_transaksi: string;
};

type Infaq = {
  id?: number;
  nama_pengirim: string;
  ceklis_hide: boolean;
  jumlah: number;
  created_at: Date;
  jenis_transaksi: string;
};

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
  const [isDataLoaded, setIsDataLoaded] = useState(false);

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
      const formattedValue = value.replace(/\D/g, "");
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
      id: undefined,
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
      jenis_transaksi: itemToEdit.jenis_transaksi,
      created_at: itemToEdit.created_at.toISOString(),
    });

    const updatedList = [...dataList];
    updatedList.splice(index, 1);
    setDataList(updatedList);
  };

  const handleDelete = (index: number) => {
    const itemToDelete = dataList[index];

    const updatedList = [...dataList];
    updatedList.splice(index, 1);
    setDataList(updatedList);

    deleteData(itemToDelete.id);
  };

  const handleUpload = async () => {
    try {
      for (const data of dataList) {
        if (data.id) {
          await updateData(data.id, data);
        }
      }
      console.log("Data updated successfully");
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  const handleLoadData = async () => {
    await loadData();
  };

  const updateData = async (id: number, data: Sadaqah | Infaq): Promise<void> => {
    try {
      const { error } = await supabase
        .from("sadaqahinfaq")
        .update(data)
        .eq("id", id);

      if (error) {
        console.error("Error updating data:", error.message);
      } else {
        console.log("Data updated successfully");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const deleteData = async (id: number): Promise<void> => {
    try {
      const { error } = await supabase.from("sadaqahinfaq").delete().eq("id", id);
      if (error) {
        console.error("Error deleting data:", error.message);
      } else {
        console.log("Data deleted successfully");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const loadData = async () => {
    try {
      const { data, error } = await supabase.from("sadaqahinfaq").select();
      if (error) {
        console.error("Error loading data:", error.message);
      } else {
        setDataList(data || []);
        setIsDataLoaded(true);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const formattedJumlah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(Number(formData.jumlah) || 0);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center bg-primary px-4 py-8 mt-12 mx-32 rounded-xl">
      <div className="flex flex-col items-center">
        <h1 className="text-[32px] font-bold">Input Data</h1>
        <span className="opacity-50">Masukkan Data Infaq atau Sadaqah</span>
      </div>

      <div className="min-w-full bg-secondary flex justify-center items-center rounded-xl mt-8 text-[#000000] px-6 py-12">
        <form className="flex flex-col gap-6 max-w-xl w-full" onSubmit={handleSubmit}>
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
            <div className="text-xs text-gray-500 mt-2">{formattedJumlah}</div>
          </div>

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

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="ceklis_hide"
              checked={formData.ceklis_hide}
              onChange={handleChange}
            />
            <label className="text-sm font-medium">Ceklis Hide</label>
          </div>

          <div className="flex justify-between gap-4">
            <Button 
              type="submit" 
              className="bg-accent rounded-md px-4 py-2">
              Submit
            </Button>
            <Button 
              type="button" 
              onClick={handleLoadData} 
              className="bg-accent rounded-md px-4 py-2">
              Load Data
            </Button>
            <Button 
              type="button" 
              onClick={handleUpload} 
              className="bg-accent rounded-md px-4 py-2">
              Upload
            </Button>
          </div>
        </form>
      </div>

      {dataList.length > 0 && (
        <div className="min-w-full bg-secondary mt-8 rounded-xl p-6">
          <h2 className="text-[24px] font-bold mb-4">Data List</h2>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2">Nama Pengirim</th>
                <th className="px-4 py-2">Jumlah</th>
                <th className="px-4 py-2">Jenis Transaksi</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dataList.map((item, index) => (
                <tr key={item.id}>
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{item.nama_pengirim}</td>
                  <td className="px-4 py-2">{item.jumlah}</td>
                  <td className="px-4 py-2">{item.jenis_transaksi}</td>
                  <td className="px-4 py-2">
                    <Button onClick={() => handleEdit(index)} color="primary" size="sm">Edit</Button>
                    <Button onClick={() => handleDelete(index)} color="danger" size="sm" className="ml-2">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
