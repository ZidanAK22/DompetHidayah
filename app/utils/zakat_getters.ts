import { Pool } from 'pg';
import { UpzPengumpulan, PenerimaanZakat, PendistribusianZakat } from '../models/zakat_definitions';
import { ProviderContext } from '@nextui-org/react';

const pool = new Pool({
    // Your database configuration
    user: process.env.SUPABASE_USER,
    host: process.env.SUPABASE_DB_HOST_URL,
    password: process.env.SUPABASE_DB_PASS,
    port: 6543,
});

// Function to get all UPZ Pengumpulan
export const getAllUpzPengumpulan = async (): Promise<UpzPengumpulan[]> => {
    const result = await pool.query('SELECT * FROM public.upz_pengumpulan;');
    return result.rows;
};

// Function to get all Penerimaan Zakat
export const getAllPenerimaanZakat = async (): Promise<PenerimaanZakat[]> => {
    const result = await pool.query('SELECT * FROM public.penerimaan_zakat;');
    return result.rows;
};

// Function to get all Pendistribusian Zakat
export const getAllPendistribusianZakat = async (): Promise<PendistribusianZakat[]> => {
    const result = await pool.query('SELECT * FROM public.pendistribusian_zakat;');
    return result.rows;
};

// Function to get a specific UPZ Pengumpulan by ID
export const getUpzPengumpulanById = async (id: string): Promise<UpzPengumpulan | null> => {
    const result = await pool.query('SELECT * FROM public.upz_pengumpulan WHERE id_upz = $1;', [id]);
    return result.rows[0] || null;
};

// Function to get a specific Penerimaan Zakat by ID
export const getPenerimaanZakatById = async (id: string): Promise<PenerimaanZakat | null> => {
    const result = await pool.query('SELECT * FROM public.penerimaan_zakat WHERE id_penerimaan = $1;', [id]);
    return result.rows[0] || null;
};

// Function to get a specific Pendistribusian Zakat by ID
export const getPendistribusianZakatById = async (id: string): Promise<PendistribusianZakat | null> => {
    const result = await pool.query('SELECT * FROM public.pendistribusian_zakat WHERE id_pendistribusian = $1;', [id]);
    return result.rows[0] || null;
};