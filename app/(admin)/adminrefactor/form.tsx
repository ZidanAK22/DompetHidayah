'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTableContext } from "@/context/tablecontext";
import { useEffect } from "react";

const schema = z.object({
    id_upz: z.string().nonempty(),
    nama_upz: z.string().nonempty(),
    jumlah_muzaki: z.number().min(0),
    beras_muzaki: z.number().min(0),
    uang_muzaki: z.number().min(0),
    nilai_beras_muzaki: z.number().min(0),
    total_muzaki: z.number().min(0),
    jumlah_mustahik: z.number().min(0),
    beras_mustahik: z.number().min(0),
    uang_mustahik: z.number().min(0),
    nilai_beras_mustahik: z.number().min(0),
    total_mustahik: z.number().min(0),
    keterangan: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function FormZakat() {
    const { selectedRow } = useTableContext();

    const { register, handleSubmit, reset } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: selectedRow || {}, // Default to selected row or empty
    });

    const onSubmit = (data: FormData) => {
        console.log("Submitted data:", data);
    };

    // Reset the form when the selected row changes
    useEffect(() => {
        reset(selectedRow || {});
    }, [selectedRow, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-layout grid gap-4">
            <input {...register("nama_upz")} placeholder="Nama UPZ" className="input" />
            <input
                type="number"
                {...register("jumlah_muzaki")}
                placeholder="Jumlah Muzaki"
                className="input"
            />
            {/* Add other fields similarly */}
            <button type="submit" className="btn-primary mt-4">
                Submit
            </button>
        </form>
    );
}
