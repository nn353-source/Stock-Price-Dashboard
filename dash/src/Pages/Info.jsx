import Sidebar from "../components/Sidebar"
import Navbar from "../components/NavBar"
import Dashboard from "../components/Dashboard"
import Card from "../components/Card"
import { ThemeProvider } from '@mui/material/styles';
import {Link} from "react-router-dom"
import theme from "../components/colorthemes.jsx"

export function Info(){
    return (
        <>
                
            <ThemeProvider theme={theme}>
                <div className="flex ">
                <Sidebar />
                    <div className='grow ml-64' style={{ minHeight: "100vh", backgroundColor: theme.palette.greens.light }}>
                    <Navbar page="Info"/>
                        
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
                                INFO & FAQ
                            </h2>
                                                        
                        </div>

                            <div
                            className="p-1 rounded-sm shadow-md mb-2"
                            style={{
                                backgroundColor:
                                    theme.palette.greens.light
                            }}
                        >                               <h2
                                className="text-2xl mb-2 font-bold text-center"
                                style={{
                                    color:
                                        theme.palette.greens.darker
                                }}
                            >
                                Data Sources
                            </h2>
                            
                            <h2
                                className="text-1xl mb-2 font-bold text-center"
                                style={{
                                    color:
                                        theme.palette.greens.darker
                                }}
                            >
                                The data that powers this site comes from the Finnhub and Alpha Vanguard APIs.
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
                        </div>
                                                      <h2
                                className="text-2xl mb-2 font-bold text-center"
                                style={{
                                    color:
                                        theme.palette.greens.darker
                                }}
                            >
                                FAQ
                            </h2>
                        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2 mb-6">

                            <Card
                                icon=""
                                title="My graphs aren't showing up!"
                                value="Our graphs are powered by the free tier of Alpha Vanguard. This, unfortunately, means that we have limited pull requests per day. Please try again later!"
                            />

                            <Card
                                icon=""
                                title="The data for some stocks aren't showing up!"
                                value="We are probably recieving a high amount of traffic. Please refresh until the requested data shows up."
                            />

                            <Card
                                title="Where can I find the code for this website?"
                                value={
                                    <>
                                    This GitHub Repo is open source at:
                                    <a
                                        href="https://github.com/your-repo-link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline hover:text-blue-700 ml-2"
                                    >
                                        https://github.com/your-repo-link
                                    </a>
                                    </>
                                }
                            />
  


                                                        <Card
                                icon=""
                                title="What companies can be listed on the explore page?"
                                value="Due to API limitations, we use 20 leading U.S. mega-cap stocks. These stocks include Apple, Microsoft, NVIDIA, Amazon, Meta, Alphabet, Berkshire Hathaway, JPMorgan Chase, Visa, Mastercard, Walmart, Costco, ExxonMobil, Chevron, Johnson & Johnson, Procter & Gamble, Coca-Cola, PepsiCo, Home Depot, and McDonald’s."
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

            </ThemeProvider>
                
        </>
    )
}