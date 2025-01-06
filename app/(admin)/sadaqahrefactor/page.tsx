import { createClient } from "@/app/utils/supabase/supabase_server";
import { redirect } from "next/navigation";
import { columns } from "./columns";
import { DataTable } from "../adminrefactor/data-table";
import FormSadaqah from "@/app/ui/form/formSadaqah";

export default async function SadaqahRefactor() {
    const supabase = await createClient();    
    const { data, error } = await supabase.from("sadaqahinfaq").select();

    if (error) {
        redirect(`/error?message=${error}`)
    }    

    return (
        <div className="rounded-xl p-12 text-text bg-secondary">
            <FormSadaqah />
            <DataTable columns={columns} data={data} />            
        </div>
    )
}