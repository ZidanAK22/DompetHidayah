"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useTableContext } from "@/context/tablecontext"

export type ZakatDataSupabase = {
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

export const defaultZakatData: ZakatDataSupabase = {
    id_upz: "",
    nama_upz: "",
    jumlah_muzaki: 0,
    beras_muzaki: 0,
    uang_muzaki: 0,
    nilai_beras_muzaki: 0,
    total_muzaki: 0,
    jumlah_mustahik: 0,
    beras_mustahik: 0,
    uang_mustahik: 0,
    nilai_beras_mustahik: 0,
    total_mustahik: 0,
    keterangan: "",
};

const { setSelectedRow } = useTableContext();

export const columns: ColumnDef<ZakatDataSupabase>[] = [
    {
        accessorKey: "nama_upz",
        header: "Nama UPZ",
    },
    {
        accessorKey: "jumlah_muzaki",
        header: "Jumlah Muzakki",
    },
    {
        accessorKey: "beras_muzaki",
        header: "Beras Muzakki",
    },
    {
        accessorKey: "uang_muzaki",
        header: () => <div>Uang Muzakki</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("uang_muzaki"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "IDR"
            }).format(amount)

            return <div>{formatted}</div>
        }

    },
    {
        accessorKey: "nilai_beras_muzaki",
        header: () => <div>Nilai Beras Muzakki</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("nilai_beras_muzaki"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "IDR"
            }).format(amount)

            return <div>{formatted}</div>
        }
    },
    {
        accessorKey: "total_muzaki",
        header: () => <div>Total Muzakki</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("total_muzaki"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "IDR"
            }).format(amount)

            return <div>{formatted}</div>
        }
    },
    {
        accessorKey: "jumlah_mustahik",
        header: "Jumlah Mustahik",
    },
    {
        accessorKey: "beras_mustahik",
        header: "Beras Mustahik",
    },
    {
        accessorKey: "uang_mustahik",
        header: () => <div>Uang Mustahik</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("uang_mustahik"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "IDR"
            }).format(amount)

            return <div>{formatted}</div>
        }
    },
    {
        accessorKey: "nilai_beras_mustahik",
        header: () => <div>Nilai Beras Mustahik</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("nilai_beras_mustahik"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "IDR"
            }).format(amount)

            return <div>{formatted}</div>
        }
    },
    {
        accessorKey: "total_mustahik",
        header: () => <div>Total Mustahik</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("total_mustahik"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "IDR"
            }).format(amount)

            return <div>{formatted}</div>
        }
    },
    {
        accessorKey: "keterangan",
        header: "Keterangan",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const zakat = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open Menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(zakat.id_upz)}
                        >
                            Copy Upz Id
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => setSelectedRow(zakat)}
                        >
                            Select Row
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    },
]
