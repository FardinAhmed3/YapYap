import React from 'react'
import Navbar from '../components/Navbar'

const HomePage = () => {
  return (
    <>
    <Navbar />
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold">Welcome to YapYap!</h2>
            <p className="text-gray-700 mt-4">
                This is the homepage of YapYap. Explore our services and learn more about us!
            </p>
        </div>
    </>
  )
}

export default HomePage