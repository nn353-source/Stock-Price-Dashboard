import React, { useState } from "react";
import { ThemeProvider } from '@mui/material/styles';
import theme from "./colorthemes.jsx"
const Searchbar = ({ onSearch }) => {
    const [input, setInput] = useState("");

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            onSearch(input.toUpperCase());
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <div className="w-full px-6 py-4" style={{ backgroundColor: theme.palette.greens.darker }} >
                <input
                    className="w-full rounded border px-3 py-2"
                    style= {{ backgroundColor: theme.palette.greens.light }}
                    type="search"
                    placeholder="Type Stock Symbol"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </ThemeProvider>

    )
};

export default Searchbar;