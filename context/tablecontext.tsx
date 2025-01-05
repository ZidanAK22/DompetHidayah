'use client'

import { createContext, useState, useContext } from "react";
import { ZakatDataSupabase} from "@/app/(admin)/adminrefactor/columns";

// Define the context type
type TableContextType = {
    selectedRow: ZakatDataSupabase | null;
    setSelectedRow: (row: ZakatDataSupabase | null) => void;
};

// Create the context with a default value
const TableContext = createContext<TableContextType | undefined>(undefined);

export function TableProvider({ children }: { children: React.ReactNode }) {
    const [selectedRow, setSelectedRow] = useState<ZakatDataSupabase | null>(null);

    return (
        <TableContext.Provider value={{ selectedRow, setSelectedRow }}>
            {children}
        </TableContext.Provider>
    );
}

export function useTableContext() {
    const context = useContext(TableContext);
    if (!context) {
        throw new Error("useTableContext must be used within a TableProvider");
    }
    return context;
}
