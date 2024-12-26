'use client'

import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function AdminPage() {
    // Data untuk Chart Bulanan
    const barData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Juli', 'Agt'],
        datasets: [
            {
                label: 'Infaq',
                data: [0, 10, 5, 2, 20, 30, 45, 50],
                backgroundColor: '#F1C232',
            },
            {
                label: 'Zakat',
                data: [0, 5, 15, 10, 5, 20, 25, 35],
                backgroundColor: '#F66251',
            },
            {
                label: 'Shodaqoh',
                data: [0, 2, 8, 15, 10, 5, 12, 20],
                backgroundColor: '#52B788',
            },
        ],
    };

    // Data untuk Chart Tahunan
    const pieData = {
        labels: ['Zakat (62)', 'Infaq (36)', 'Shodaqoh (20)'],
        datasets: [
            {
                data: [62, 36, 20],
                backgroundColor: ['#F66251', '#F1C232', '#52B788'],
                hoverOffset: 4,
            },
        ],
    };

    return (
        <div className="min-h-screen bg-[#8B1D1A] flex flex-col items-center p-8">
            {/* Header */}
            <h1 className="text-4xl font-bold text-[#F6EFE2] mb-12">Admin Dashboard</h1>
            
            {/* Container untuk Chart */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-7xl">
                {/* Chart Bulanan */}
                <div className="bg-[#F6EFE2] rounded-lg shadow-md p-8 h-[500px]">
                    <h2 className="text-2xl font-bold text-[#8B1D1A] mb-6 text-center">Chart Bulanan</h2>
                    <Bar 
                        data={barData} 
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: { legend: { position: 'top' } },
                        }} 
                        height={400}
                    />
                </div>

                {/* Chart Tahunan */}
                <div className="bg-[#F6EFE2] rounded-lg shadow-md p-8 h-[500px]">
                    <h2 className="text-2xl font-bold text-[#8B1D1A] mb-6 text-center">Chart Tahunan</h2>
                    <Pie 
                        data={pieData} 
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: { legend: { position: 'right' } },
                        }} 
                        height={400}
                    />
                </div>
            </div>
        </div>
    );
}
