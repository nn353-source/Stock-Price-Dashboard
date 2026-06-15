
import './App.css'
import Sidebar from "./components/Sidebar"
import Navbar from "./components/NavBar"
import Dashboard from "./components/Dashboard"
import { ThemeProvider } from '@mui/material/styles';
import theme from "./components/colorthemes.jsx"
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import {Home} from './Pages/Home'
import {Explore} from './Pages/Explore'
import {Info} from './Pages/Info'
import {Search} from './Pages/Search'
import {NotFound} from './Pages/NotFound'
import React, { useState, useEffect } from 'react'


function App() {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundColor: theme.palette.greens.light, minHeight: "100vh",
    width: "100%"}} >
        <Router> 
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/Explore" element={<Explore/>}/>
            <Route path="/Info" element={<Info/>}/>
            <Route path="/Search" element={<Search/>}/>
            <Route path="*" element={<NotFound />} />
          
          </Routes>
        </Router>
      </div>
      
    </ThemeProvider>

  )
}

export default App;
