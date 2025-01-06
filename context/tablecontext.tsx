'use client'

import { createContext, useState, useContext } from "react";
import { ZakatDataSupabase} from "@/app/(admin)/adminrefactor/columns";
import { Sadaqah } from "@/app/(admin)/sadaqahrefactor/columns";
import { User } from "@supabase/supabase-js";

// Define the context type
type TableContextType = {
    selectedRow: ZakatDataSupabase | null;
    setSelectedRow: (row: ZakatDataSupabase | null) => void;
    selectedSadaqah: Sadaqah | null;
    setSelectedSadaqah: (row: Sadaqah | null) => void;
    userBenul: User | null
    setUserBenul: (row: User | null) => void;
};

// Create the context with a default value
const TableContext = createContext<TableContextType | undefined>(undefined);

export function TableProvider({ children, userInput }: { children: React.ReactNode, userInput: User | null }) {
    const [selectedRow, setSelectedRow] = useState<ZakatDataSupabase | null>(null);
    const [selectedSadaqah, setSelectedSadaqah] = useState<Sadaqah | null>(null);    
    const [userBenul, setUserBenul] = useState<User | null>(userInput);

    return (
        <TableContext.Provider value={{ selectedRow, setSelectedRow, selectedSadaqah, setSelectedSadaqah, userBenul, setUserBenul}}>
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
