import { redirect } from "next/navigation";
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { createClient } from "@/app/utils/supabase/supabase_server";
import FormZakat from "@/app/ui/form/formZakat";
import PrintWrapper from "./printwrapper";

export default async function adminrefactor() {
    const supabase = await createClient();
    const { data, error } = await supabase.from("zakat").select();

    if (error) {
        redirect(`/error?message=${error}`)
    }

    // if (!data || data.length === 0) {
    //     const noDataMsg = 'No data found. Check back later.' as const;
    //     redirect(`/error?message=${noDataMsg}`)
    // }

    return (
        <div className="rounded-xl bg-secondary text-text p-12">
            <FormZakat />

            <PrintWrapper title="Data Zakat">
                <DataTable columns={columns} data={data} />
            </PrintWrapper>

        </div>

    )
}