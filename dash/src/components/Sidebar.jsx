import React from 'react'
import { FaTachometerAlt, FaShoppingCart, FaUsers, FaUser, FaBox } from "react-icons/fa";

const Sidebar = () => {
    return (
        <div className=
        'bg-gray-100 text-gray-900 h-screen px-4 fixed w-16 sm:w-64 border-r border-gray-300'>
            <h1 className='text-2xl font-bold hidden sm:block mt-4 text-center italic'>Stock Price Dashboard</h1>
            <ul className='flex flex-col mt-5 text-xl'>
                <li className = 'flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white'>
                    <FaTachometerAlt/>
                    <span className = 'hidden sm:inline'>Dashboard</span>
                </li>
                                <li className = 'flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white'>
                    <FaShoppingCart/>
                    <span className = 'hidden sm:inline'>Orders</span>
                </li>
                                <li className = 'flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white'>
                    <FaUsers/>
                    <span className = 'hidden sm:inline'>Customers</span>
                </li>
                                <li className = 'flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white'>
                    <FaUser/>
                    <span className = 'hidden sm:inline'>Users</span>
                </li>
                                <li className = 'flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white'>
                    <FaBox/>
                    <span className = 'hidden sm:inline'>Products</span>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar