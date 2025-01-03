import { ZakatDataSupabase, columns } from "./columns"
import { DataTable } from "./data-table"
import { createClient } from "@/app/utils/supabase/supabase_server";

export default async function adminrefactor() {
    const supabase = createClient();
    const { data, error } = await (await supabase).from('zakat').select();

    return (
        <div className="bg-secondary text-text">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt hic modi numquam dolores voluptate ducimus labore impedit fugiat asperiores voluptates, ea accusamus vero, quas mollitia fugit alias iste sit similique!</p>
            <DataTable columns={columns} data={data} />
        </div>
    )
}   