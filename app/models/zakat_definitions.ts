// Define the model for the upz_pengumpulan table
export interface UpzPengumpulan {
    id_upz: string;
    nama_upz: string;
    created_at: Date;
}

// Define the model for the penerimaan_zakat table
export interface PenerimaanZakat {
    id_penerimaan: string;
    id_upz_pengumpul: string;
    jml_muzakki: bigint;
    kg_beras: number;
    uang_diterima: number;
    beras_diuangkan: number;
    created_at: Date;
}

// Define the model for the pendistribusian_zakat table
export interface PendistribusianZakat {
    id_pendistribusian: string;
    id_upz_pengumpul: string;
    jml_mustahik: bigint;
    kg_beras: number;
    uang_didistribusikan: number;
    beras_diuangkan: number;
    created_at: Date;
}
