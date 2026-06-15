import React, {
    useState,
    useEffect
} from "react";

import { ThemeProvider } from "@mui/material/styles";

import theme from "./colorthemes.jsx";

import { getChartData } from "../data/table.js";

import { Line } from "react-chartjs-2";

import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
);

const Chart = ({
    symbol,
    fromDate
}) => {
    const [chartData, setChartData] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        let active = true;

        const loadChart = async () => {
            setLoading(true);

            try {
                const data =
                    await getChartData(
                        symbol,
                        fromDate
                    );

                if (!active) return;

                setChartData(data);
            } catch (err) {
                console.error(err);

                if (!active) return;

                setChartData({
                    labels: [],
                    datasets: []
                });
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        if (symbol) {
            loadChart();
        }

        return () => {
            active = false;
        };
    }, [symbol, fromDate]);

    const hasData =
        chartData?.datasets?.length > 0 &&
        chartData.datasets.some(
            dataset =>
                dataset.data?.length > 0
        );

    return (
        <ThemeProvider theme={theme}>
            <div
                className="p-4 rounded-lg shadow-md"
                style={{
                    backgroundColor:
                        theme.palette
                            .greens.light
                }}
            >
                <h3 className="text-lg font-semibold mb-4">
                    {symbol} Stock Data
                </h3>

                {loading ? (
                    <p>
                        Loading chart...
                    </p>
                ) : hasData ? (
                    <Line
                        data={chartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio:
                                true
                        }}
                    />
                ) : (
                    <p>
                        Historical chart data
                        is currently
                        unavailable. This
                        may be due to Alpha
                        Vantage rate limits.
                    </p>
                )}
            </div>
        </ThemeProvider>
    );
};

export default Chart;