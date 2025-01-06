'use client'

import { Row } from "@tanstack/react-table"
import { useTableContext } from "@/context/tablecontext"
import { supabase } from "@/app/utils/supabase/supabase_client"
import { Sadaqah } from "./columns"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

function ActionCell({ row }: { row: Row<Sadaqah> }) {
    const { setSelectedSadaqah } = useTableContext()
    const sadaqah = row.original

    async function DeleteSadaqah(id: number) {
        if (!id) return null
        const { error } = await supabase
            .from('sadaqahinfaq')
            .delete()
            .eq('id_sadaqah_infaq', id)

        if (error) {
            console.error("Error deleting Sadaqah:", error)
        } else {
            window.location.reload()
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open Menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#f2e0b6]">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                    onClick={() => {
                        if (sadaqah.id_sadaqah_infaq !== undefined) {
                            DeleteSadaqah(sadaqah.id_sadaqah_infaq)
                        }
                    }}
                >
                    Delete
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedSadaqah(sadaqah)}>
                    Select Row
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}