import Sidebar from "../components/Sidebar"
import Navbar from "../components/NavBar"
import Dashboard from "../components/Dashboard"
import { ThemeProvider } from '@mui/material/styles';
import {Link} from "react-router-dom"
import theme from "../components/colorthemes.jsx"
import Card from "../components/Card.jsx"
import { FaSearch, FaHome, FaQuestionCircle } from "react-icons/fa";
import { FaMoneyBillTrendUp } from 'react-icons/fa6';

export function Home(){
    return (
        <>
            <ThemeProvider theme={theme}>
                <div className="flex ">
                <Sidebar />
                    <div className='grow ml-64' style={{ minHeight: "100vh", backgroundColor: theme.palette.greens.light }}>
                    <Navbar page="Home"/>
                        <div
                            className="p-1 rounded-sm shadow-md mb-4"
                            style={{
                                backgroundColor:
                                    theme.palette.greens.light
                            }}
                        >
                            <h2
                                className="text-3xl mb-2 font-bold text-center"
                                style={{
                                    color:
                                        theme.palette.greens.darker
                                }}
                            >
                                Welcome to Neha's Stock Price Dashboard!
                            </h2>
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
                            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2 mb-6">

                            <Card
                                icon={<FaHome/>}
                                title="Home"
                                value="You Are Here!"
                            />

                            <Card
                                icon={<FaSearch/>}
                                title="Search"
                                value="Search for specific stock symbols to retrieve the current price, percent change, daily high, daily low, and a graph with 100 days of historical data."
                            />
                            
                            <Card
                                icon={<FaMoneyBillTrendUp/>}
                                title="Explore"
                                value="Fetch the current price, percent change, daily high, and daily low for the top 5 U.S. mega-cap stocks with the greatest percent change today, along with a graph with 100 days of historical data for each, sorted in decreasing order."
                            />
  


                                                        <Card
                                icon={<FaQuestionCircle/>}
                                title="Info"
                                value="Find information and frequently asked questions here!"
                            />
                        </div>
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
                </div>


            </ThemeProvider>

        </>
    )
}