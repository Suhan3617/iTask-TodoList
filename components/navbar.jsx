import React from 'react'

const navbar = () => {
  return (
    <nav className='flex justify-between bg-violet-900 text-white py-3'>
        <div className="logo">
            <span className='font-bold text-3xl mx-9'>iTask</span>
        </div>
        <ul className="flex gap-8 mx-9">
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Your tasks</li>
        </ul>
    </nav>
  )
}

export default navbar
