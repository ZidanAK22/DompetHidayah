"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Delete, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTableContext } from "@/context/tablecontext"
import { supabase } from "@/app/utils/supabase/supabase_client"
import { UUID } from "crypto"
import { ActionSadaqah } from "./ActionSadaqah"

export type Sadaqah = {
    id_sadaqah_infaq?: number;
    nama_pengirim: string;
    ceklis_hide: boolean;
    jumlah: number;
    created_at: Date;
    jenis_transaksi: string;
    user_id?: UUID;
};

export const DefaultSadaqah: Sadaqah = {
    nama_pengirim: 'Hamba Allah',
    ceklis_hide: false,
    jumlah: 0,
    created_at: new Date(),
    jenis_transaksi: 'Sadaqah',

};

export const columns: ColumnDef<Sadaqah>[] = [
    {
        accessorKey: 'id_sadaqah_infaq',
        header: 'No'
    },
    {
        accessorKey: 'nama_pengirim',
        header: 'Nama Pengirim'
    },
    {
        accessorKey: 'ceklis_hide',
        header: 'Sembunyikan Nama Pengirim',
        cell: ({ row }) => (
            <Checkbox
                checked={row.getValue('ceklis_hide')}

            />
        )
    },
    {
        accessorKey: 'jumlah',
        header: 'Nominal',
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("jumlah"))
            const formatted = new Intl.NumberFormat("id", {
                style: "currency",
                currency: "IDR"
            }).format(amount)

            return <div>{formatted}</div>
        }
    },
    {
        accessorKey: 'created_at',
        header: 'Tanggal'
    },
    {
        accessorKey: 'jenis_transaksi',
        header: 'Jenis Transaksi'
    },
    {
        accessorKey: 'user_id',
        header: 'Poster'
    },
    {
        id: "actions",
        cell: ({ row }) => {
            <ActionSadaqah row={row}/>
        }
    },
]


