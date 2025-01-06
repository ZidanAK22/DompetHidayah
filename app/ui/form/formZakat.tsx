'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTableContext } from "@/context/tablecontext";
import { useEffect, useState } from "react";
import { supabase } from "@/app/utils/supabase/supabase_client";

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

type UpzItem = {
    id_upz: string;
    nama_upz: string;
};

export default function FormZakat() {
    const { selectedRow, userBenul } = useTableContext();
    const {
        register,
        handleSubmit,
        reset,
        setValue,        
        formState: { errors, isSubmitting }
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: selectedRow || {}, // Default to selected row or empty
    });

    const [upzList, setUpzList] = useState<UpzItem[]>([]);
    const [upzName, setUpzName] = useState('');

    useEffect(() => {
        // Fetch the UPZ list from an API or other data source
        const fetchUpzList = async () => {
            const { data, error } = await supabase.from("upz_pengumpulan").select("id_upz, nama_upz");
            console.log(error?.message);

            if (data) {
                // Set the UPZ list state
                setUpzList(data.map((item: { id_upz: string, nama_upz: string }) => ({
                    id_upz: item.id_upz,
                    nama_upz: item.nama_upz
                })));
            }
        };

        fetchUpzList();

        // Reset form if selectedRow exists
        if (selectedRow) {
            reset(selectedRow);
        }
    }, [selectedRow, reset]);  // Depend on selectedRow and reset to trigger updates


    // useEffect(() => {
    //     if (selectedRow) {
    //         reset(selectedRow);
    //     }
    // }, [selectedRow, reset]);

    const onSubmit = async (data: FormData) => {
        data.nama_upz = upzName;
        console.log("Submitted data:", data);
        const { error } = await supabase.from("zakat").insert(data);
        console.log(error?.message);
        if (!error) {
            window.location.reload();
        }
    };

    const handleNamaUpzChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const id_upz = event.target.value;
        const upz = upzList.find(upz => upz.id_upz === id_upz);
        if (upz) {
            setValue("id_upz", id_upz);
            setUpzName(upz.nama_upz);
        }

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-layout grid gap-4">
            <input {...register("id_upz")} className="input" readOnly type="hidden" />
            <select {...register("nama_upz")} onChange={handleNamaUpzChange} className="input">
                <option value="">Select Nama UPZ</option>
                {upzList.map((upz, index) => (
                    <option key={index} value={upz.id_upz}>
                        {upz.nama_upz}
                    </option>
                ))}
            </select>

            <input
                type="number"
                {...register("jumlah_muzaki")}
                placeholder="Jumlah Muzaki"
                className="input"
            />
            {errors.jumlah_muzaki && (
                <div className="text-red-500">{errors.jumlah_muzaki.message}</div>
            )}
            <input
                type="number"
                {...register("beras_muzaki")}
                placeholder="Beras Muzaki"
                className="input"
            />
            <input
                type="number"
                {...register("uang_muzaki")}
                placeholder="Uang Muzaki"
                className="input"
            />
            <input
                type="number"
                {...register("nilai_beras_muzaki")}
                placeholder="Nilai Beras Muzaki"
                className="input"
            />
            <input
                type="number"
                {...register("total_muzaki")}
                placeholder="Total Muzaki"
                className="input"
            />
            <input
                type="number"
                {...register("jumlah_mustahik")}
                placeholder="Jumlah Mustahik"
                className="input"
            />
            <input
                type="number"
                {...register("beras_mustahik")}
                placeholder="Beras Mustahik"
                className="input"
            />
            <input
                type="number"
                {...register("uang_mustahik")}
                placeholder="Uang Mustahik"
                className="input"
            />
            <input
                type="number"
                {...register("nilai_beras_mustahik")}
                placeholder="Nilai Beras Mustahik"
                className="input"
            />
            <input
                type="number"
                {...register("total_mustahik")}
                placeholder="Total Mustahik"
                className="input"
            />
            <textarea
                {...register("keterangan")}
                placeholder="Keterangan"
                className="input"
            />
            <button type="submit" className="btn-primary bg-primary w-48 p-4 my-4 rounded-xl">
                {isSubmitting ? "Submitting" : "Submit"}
            </button>
        </form>
    );
}
