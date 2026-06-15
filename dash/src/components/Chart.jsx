import React, { useState, useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles';
import theme from "./colorthemes.jsx"
import { getChartData } from '../data/table.js'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, BarElement, CategoryScale, LinearScale, PointElement } from 'chart.js'
ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, PointElement)

const Chart = ({ symbol, fromDate }) => {
    const [chartData, setChartData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getChartData(symbol, fromDate).then(data => {
            if (typeof data === 'string') {
                setError(data);
            } else if (data) {
                setChartData(data);
            }
        });
    }, [symbol, fromDate]);

    return (
        <ThemeProvider theme={theme}>
            <div className='p-4 rounded-lg shadow-md' style={{ backgroundColor: theme.palette.greens.light }}>
                <h3 className='text-lg font-semibold mb-4'>{symbol} Stock Data</h3>
                {error ? <p>{error}</p> : chartData ? <Line data={chartData} /> : <p>Error.</p>}
            </div>
        </ThemeProvider>
    );
}

export default Chart