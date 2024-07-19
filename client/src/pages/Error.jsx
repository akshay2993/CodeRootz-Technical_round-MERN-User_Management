import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className="w-full max-w-[820px] mx-auto bg-gray-200 p-6 px-1 md:px-6 rounded-xl">
        <h1 className='text-3xl'>Error! 404 : Page not Found!</h1>
        <p>Go back to </p><Link to='/'>Home</Link>
    </div>
  )
}

export default Error
