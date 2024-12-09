"use client"

import { MdMoreHoriz } from 'react-icons/md';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Pzt',
        Konteyner: 60,
        'Yol (Km)': 40,
    },
    {
        name: 'Sal',
        Konteyner: 50,
        'Yol (Km)': 20,
    },
    {
        name: 'Car',
        Konteyner: 35,
        'Yol (Km)': 15,
    },
    {
        name: 'Per',
        Konteyner: 70,
        'Yol (Km)': 60,
    },
    {
        name: 'Cum',
        Konteyner: 80,
        'Yol (Km)': 34,
    },
    {
        name: 'Cts',
        Konteyner: 56,
        'Yol (Km)': 67,
    },
    {
        name: 'Paz',
        Konteyner: 45,
        'Yol (Km)': 13,
    },
];

const ProgressChart = () => {
    return (
        <div className='bg-white rounded-lg h-full p-4'>
            {/* TITLE */}
            <div className='flex justify-between items-center'>
                <h1 className='text-lg font-semibold'>Konteyner/Yol</h1>
                <MdMoreHoriz />
            </div>
            {/* CHART */}
            <ResponsiveContainer width="100%" height="90%">
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    barSize={20}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                        dataKey="Konteyner"
                        fill="#FAE27C"
                        legendType='circle'
                        radius={[10,10,0,0]}
                    />
                    <Bar
                        dataKey="Yol (Km)"
                        fill="#C3EBFA"
                        legendType='circle'
                        radius={[10,10,0,0]}
                    />
                </BarChart>
            </ResponsiveContainer>

        </div>
    );
};

export default ProgressChart