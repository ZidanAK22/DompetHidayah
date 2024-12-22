'use client';
import React, { useState, ChangeEvent } from "react";
import { Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";

export default function InputDataPage() {
  const [formData, setFormData] = useState({
    nama_pengirim: "",
    ceklis_hide: false,
    jumlah: "",
    jenis_transaksi: '',
    created_at: new Date().toISOString(),
  });

  const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(new Set(["infaq"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replace(/_/g, " "),
    [selectedKeys],
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
    console.log('Form Data:', formData);
  };

  const formattedJumlah = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
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
    </div>
  );
}
