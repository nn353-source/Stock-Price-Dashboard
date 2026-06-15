import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/NavBar";
import Dashboard from "../components/Dashboard";
import Searchbar from "../components/Searchbar";
import { ThemeProvider } from '@mui/material/styles';
import theme from "../components/colorthemes.jsx"

export function Search() {
    const [symbol, setSymbol] = useState("");
    const [loading, setLoading] = useState(false);

    const fromDate = new Date("2025-06-14");

    const handleSearch = (newSymbol) => {
        setLoading(true);
        setSymbol(newSymbol);
    };

    return (
        <div className="flex">
            <Sidebar />

            <div className='grow ml-64' style={{ minHeight: "100vh", backgroundColor: theme.palette.greens.light }}>
                <Navbar page="Search" />

                <Searchbar onSearch={handleSearch} />
                                            <div
                                style={{
                                    width: "100%",
                                    height: "100px",
                                    backgroundImage: "url('/navbarim.png')",
                                    backgroundRepeat: "repeat-x",
                                    backgroundSize: "100px 100px",
                                    backgroundPosition: "center",
                                }}
                            ></div>


                {symbol && (
                    <Dashboard
                        symbol={symbol}
                        fromDate={fromDate}
                        onLoaded={() => setLoading(false)}
                    />
                )}
                                            <div
                                style={{
                                    width: "100%",
                                    height: "100px",
                                    backgroundImage: "url('/navbarim.png')",
                                    backgroundRepeat: "repeat-x",
                                    backgroundSize: "100px 100px",
                                    backgroundPosition: "center",
                                }}
                            ></div>
            </div>
        </div>
    );
}

export default Search;