import { Row } from "@tanstack/react-table"
import { useTableContext } from "@/context/tablecontext"
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

export function ActionZakat({ row }: { row: Row<any> }) {
    const { setSelectedRow } = useTableContext()
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
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(zakat.id_upz)}>
                    Copy Upz Id
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedRow(zakat)}>
                    Select Row
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}