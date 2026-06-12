
import './App.css'
import Sidebar from "./components/Sidebar"
import Navbar from "./components/NavBar"
import Dashboard from "./components/Dashboard"

function App() {
  return (
    <div className="flex ">
      <Sidebar />
        <div className= 'grow ml-64 h-full lg:h-screen bg-gray-100 text-gray-900'>
          <Navbar />
            <div><Dashboard /> </div>
        </div>
    </div>
  )
}

export default App;
