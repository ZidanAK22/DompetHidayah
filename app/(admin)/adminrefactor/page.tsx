import { redirect } from "next/navigation";
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { createClient } from "@/app/utils/supabase/supabase_server";
import FormZakat from "@/app/ui/form/formZakat";

export default async function adminrefactor() {
    const supabase = await createClient();
    const { data, error } = await supabase.from("zakat").select();

    if (error) {
        redirect(`/error?message=${error}`)
    }

    if (!data || data.length === 0) {
        const noDataMsg = 'No data found. Check back later.' as const;
        redirect(`/error?message=${noDataMsg}`)
    }

    return (        
            <div className="rounded-xl bg-secondary text-text p-4">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt hic modi numquam dolores voluptate ducimus labore impedit fugiat asperiores voluptates, ea accusamus vero, quas mollitia fugit alias iste sit similique!</p>
                <FormZakat />
                <DataTable columns={columns} data={data} />
            </div>
        
    )
}   