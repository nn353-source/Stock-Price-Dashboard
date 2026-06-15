import React, { useState, useEffect } from 'react';
import Card from './Card';
import Chart from './Chart';
import { FaPercent } from 'react-icons/fa';
import { BsThermometerLow, BsThermometerHigh } from "react-icons/bs";
import { MdAttachMoney } from "react-icons/md";
import { ThemeProvider } from '@mui/material/styles';
import theme from "./colorthemes.jsx";

import {
    getSymbolPrice,
    isValidSymbol
} from '../data/table.js';

const Dashboard = ({ symbol, fromDate }) => {
    const [price, setPrice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError("");
            setPrice(null);

            try {
                const valid = await isValidSymbol(symbol);

                if (!valid) {
                    setError("Incorrect Symbol");
                    setLoading(false);
                    return;
                }

                const data = await getSymbolPrice(symbol);
                setPrice(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load stock data");
            }

            setLoading(false);
        };

        if (symbol) {
            fetchData();
        }
    }, [symbol]);

    if (loading) {
        return (
            <div className="p-6">
                <h2 className="text-xl font-semibold">
                    Loading...
                </h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <h2 className="text-2xl font-bold text-red-600">
                    {error}
                </h2>
            </div>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <div
                className="grow p-6"
                style={{
                    backgroundColor:
                        theme.palette.greens.contrastText
                }}
            >
                <div
                    className="p-1 rounded-sm shadow-md mb-4"
                    style={{
                        backgroundColor:
                            theme.palette.greens.light
                    }}
                >
                    <h2
                        className="text-3xl mb-2 font-bold"
                        style={{
                            color:
                                theme.palette.greens.darker
                        }}
                    >
                        {symbol}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <Card
                        icon={<MdAttachMoney />}
                        title="Price"
                        value={price?.c ? `${price.c.toFixed(2)} USD` : "N/A"}
                    />

                    <Card
                        icon={<FaPercent />}
                        title="% Change"
                        value = {price?.dp?.toFixed(2) ?? "N/A"}
                    />

                    <Card
                        icon={<BsThermometerHigh />}
                        title="Day's High"
                        value={price?.h ? `${price.h.toFixed(2)} USD` : "N/A"}
                    />

                    <Card
                        icon={<BsThermometerLow />}
                        title="Day's Low"
                        value={price?.l ? `${price.l.toFixed(2)} USD` : "N/A"}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <Chart
                        symbol={symbol}
                        fromDate={fromDate}
                    />
                </div>
            </div>
        </ThemeProvider>
    );
};

export default Dashboard;