'use client';

import { supabase } from "../utils/supabase_client";
import { useState, useEffect } from "react";
import { UpzPengumpulan } from "../models/zakat_definitions";

export default function Tester() {
  const [upz, setUpz] = useState<UpzPengumpulan[] | null>(null);

  useEffect(() => {
    const fetchUpz = async () => {      

      let { data, error } = await supabase.from("upz_pengumpulan").select();
      if (error) {
        console.error("Error fetching UPZ Pengumpulan:", error);
      } else {
        setUpz(data);
        console.log('data fetched');
        console.log(data);
      }
    };
    fetchUpz();
  }, []);

  return (
    <div>
      {/* timestamp udah jadi string dari supabase */}
      <h1>UPZ Pengumpulan Data</h1>
      {upz ? (
        <ul className="h-1/2 w-1/2">
          {upz.map((item) => (
            <li key={item.id_upz}>            
              {item.id_upz}: {item.nama_upz} - Created At {item.created_at} 
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
      <pre>
        {JSON.stringify(upz, null, 2)}
      </pre>
    </div>
  );
}
