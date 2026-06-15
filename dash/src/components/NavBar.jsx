import React from 'react'
import { ThemeProvider } from '@mui/material/styles';
import theme from "./colorthemes.jsx"
const Navbar = ({page}) => {
    return (
        <ThemeProvider theme={theme}>
            <div className='flex items-center gap-5 px-4' style={{ backgroundColor: theme.palette.greens.medium }}>
            <div >
                <div><img src="/navbarim.png" alt="" className="w-40"/></div>
            </div>
            <h1 className='text-3xl sm:block ' style={{ color: theme.palette.greens.darker }}>{page}</h1>
        
        </div>
        </ThemeProvider>
        


    )
}

export default Navbar