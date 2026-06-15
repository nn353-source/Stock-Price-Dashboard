import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/NavBar";
import Dashboard from "../components/Dashboard";
import { getTopMovers } from "../data/table.js";
import { ThemeProvider } from '@mui/material/styles';
import theme from "../components/colorthemes.jsx"

export function Explore() {
    const fromDate = new Date("2025-06-14");

    const [topMovers, setTopMovers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadMovers() {
            try {
                const movers = await getTopMovers();
                setTopMovers(movers);
            } catch (err) {
                console.error("Failed to load top movers:", err);
            } finally {
                setLoading(false);
            }
        }

        loadMovers();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <div className="flex">
                <Sidebar />

                <div className="grow ml-64  " className='grow ml-64' style={{ minHeight: "100vh", backgroundColor: theme.palette.greens.light }}>
                    <Navbar page="Explore" />
                    <h2
                        className="text-3xl mb-2 font-bold text-center"
                        style={{
                            color:
                                theme.palette.greens.darker
                        }}
                    >
                        Top 5 Stocks in the SMP 500 with Today's Highest Percent Change in Decreasing Order
                    </h2>
                    <h5
                        className="text-1xl mb-2 font-bold text-center italics"
                        style={{
                            color:
                                theme.palette.greens.darker
                        }}
                    >
                       Compiled from a list of 20 leading U.S. mega-cap stocks (see list in INFO)
                    </h5>
                    {loading ? (
                        <div className="p-6">
                            <h2 className="text-xl font-semibold">
                                Loading top movers...
                            </h2>
                        </div>
                    ) : topMovers.length === 0 ? (
                        <div className="p-6">
                            <h2 className="text-xl font-semibold">
                                Sorry, Finnhub is not sending data at this time.
                            </h2>
                        </div>
                    ) : (
                        topMovers.map((stock) => (
                            <Dashboard
                                key={stock.symbol}
                                symbol={stock.symbol}
                                fromDate={fromDate}
                            />
                        ))
                    )}
                </div>
            </div>

        </ThemeProvider>
        
    );
}

