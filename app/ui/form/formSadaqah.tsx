'use client'

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTableContext } from "@/context/tablecontext";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/app/utils/supabase/supabase_client";

const schema = z.object({
    nama_pengirim: z.string(),
    ceklis_hide: z.boolean(),
    jumlah: z.number().min(0),
    created_at: z.date(),
    jenis_transaksi: z.string().nonempty(),
    user_id: z.string().min(1, "User ID is required"),
});

type FormData = z.infer<typeof schema>;

export default function FormSadaqah() {
    const { selectedSadaqah, userBenul } = useTableContext();
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        getValues,
        control,
        formState: { errors, isSubmitting }
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            ...selectedSadaqah,
            created_at: new Date(),
            ceklis_hide: selectedSadaqah?.ceklis_hide || false,
            user_id: userBenul?.id,
        }
    });

    const onSubmit = async (dataForm: FormData) => {
        console.log("Submitted data:", dataForm);

        console.log(getValues("user_id"))

        const hide = getValues("ceklis_hide")
        if (hide) {
            setValue('nama_pengirim', 'hamba allah')
        }

        const { error } = await supabase.from("sadaqahinfaq").insert(dataForm);
        console.log(error?.message);
        if (!error) {
            window.location.reload();
        }
    };

    useEffect(() => {
        if (userBenul?.id) {
            setValue('user_id', userBenul.id);
        }
    }, [userBenul, setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-layout grid gap-4">
            <p>Nama Pengirim</p>
            <input {...register("nama_pengirim")} className="input" placeholder="Hamba Allah" />
            {errors.nama_pengirim && (
                <div className="text-red-500">{errors.nama_pengirim.message}</div>
            )}
            <Controller
                name="ceklis_hide"
                control={control}
                render={({ field }) => (
                    <div className="flex flex-row items-center space-x-2">
                        <Checkbox id="ceklis_hide" checked={field.value || false} onCheckedChange={(checked) => field.onChange(!!checked)} />
                        <span>Sembunyikan Nama Pengirim</span>
                    </div>
                )}
            />
            {errors.ceklis_hide && (
                <div className="text-red-500">{errors.ceklis_hide.message}</div>
            )}
            <p>Jumlah</p>
            <input {...register("jumlah", { valueAsNumber: true })} className="input" type="number" />
            {errors.jumlah && (
                <div className="text-red-500">{errors.jumlah.message}</div>
            )}
            <p>Jenis Transaksi</p>
            <select {...register("jenis_transaksi")} className="input">
                <option value="infaq">Infaq</option>
                <option value="sadaqah">Sadaqah</option>
            </select>
            {errors.jenis_transaksi && (
                <div className="text-red-500">{errors.jenis_transaksi.message}</div>
            )}
            <input type="hidden" {...register("created_at", { valueAsDate: true })} />
            {errors.created_at && (
                <div className="text-red-500">{errors.created_at.message}</div>
            )}

            <input {...register("user_id")} type="hidden"/>
            {errors.user_id && (
                <div className="text-blue-900">{errors.user_id.message}</div>
            )}


            <button type="submit" className="btn-primary bg-primary w-48 p-4 rounded-xl">
                {isSubmitting ? 'Submitting' : 'Submit'}
            </button>
            {errors.root && (
                <div className="text-red-500">{errors.root.message}</div>
            )}
        </form>
    );
}
