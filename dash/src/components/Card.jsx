import React from 'react'


const Card = ({icon, title, value}) => {
    return (
        <div className='bg-white rounded-lg shadow p-4 flex items-center space-x-4'>
            <div className='text-blue-600 text-3xl'>{icon}</div>
            <div>
                <h2 className='text-sm text-gray-500'>{title}</h2>
                <p className='text-2xl font-bold text-gray-800'>{value}</p>
            </div>
        </div>
    )
}

export default Card