import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="ml-20 mt-16 p-6">
    {/* Example content */}
    <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
      <Link to='/jobform'>
        Create Interview
      </Link>
      </button>
    {/* Add your content here */}
  </div>
  )
}

export default Home
