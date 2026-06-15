import React from 'react'
import { FaSearch, FaHome, FaQuestionCircle } from "react-icons/fa";
import { FaMoneyBillTrendUp } from 'react-icons/fa6';
import Button from "@mui/material/Button";
import theme from "./colorthemes.jsx"
import { ThemeProvider } from '@mui/material/styles';
import {Link} from 'react-router-dom'

const Sidebar = () => {
    return (
        <ThemeProvider theme={theme}>
            <div className=
        ' h-screen px-4 fixed w-16 sm:w-64 ' style={{ backgroundColor: theme.palette.greens.medium }}>
            <h1 className='text-4xl font-bold hidden sm:block mt-4 text-center italic' style={{ color: theme.palette.greens.darker }}>Stock Price Dashboard</h1>
            <ul className='flex flex-col mt-5 text-xl'>
                <li className = 'flex items-center py-3 px-2 space-x-4 ' style={{ color: theme.palette.greens.darker }}>
                    <FaHome/>
                    <Link to="/">  <Button variant="contained" size="medium" color = "greens">Home</Button> </Link>
                </li>

                <li className = 'flex items-center py-3 px-2 space-x-4 ' style={{ color: theme.palette.greens.darker }}>
                    <FaSearch/>
                    <Link to="/Search"> <Button variant="contained" size="medium" color = "greens">Search</Button> </Link>
                </li>
                <li className = 'flex items-center py-3 px-2 space-x-4 ' style={{ color: theme.palette.greens.darker }}>
                    <FaMoneyBillTrendUp/>
                   <Link to="/Explore">  <Button variant="contained" size="medium" color = "greens">Explore</Button> </Link>
                </li>
                <li className = 'flex items-center py-3 px-2 space-x-4 ' style={{ color: theme.palette.greens.darker }}>
                    <FaQuestionCircle/>
                   <Link to="/Info">  <Button variant="contained" size="medium" color = "greens">Info</Button> </Link>
                </li>
                                
                                
            </ul>
        </div>
        </ThemeProvider>
        
    )
}

export default Sidebar