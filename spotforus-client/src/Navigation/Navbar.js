import React from 'react'
import logo from '../assets/images/sfu-logo-blue-cropped.png'

export default function Navbar() {
  return (
    <>
<nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5">
  <div className="container flex flex-wrap justify-between items-center mx-auto">
    <a href="/" className="flex">
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="Spot For Us logo"/>
    </a>
    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get started</button>
  </div>
</nav>
    </>
  )
}
