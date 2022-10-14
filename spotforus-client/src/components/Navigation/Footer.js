import React from 'react'
import logo from '../../assets/images/sfu-logo-blue-cropped.png'

export default function Footer() {
  return (
    
    <footer className="bg-white py-4 px-8 mt-4 dark:bg-gray-900">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
            <a href="/" className="flex">
                <img src={logo} className="h-8" alt="Spot For Us logo"/>
            </a>
            <div type="button" className="text-sm text-gray-500 dark:text-gray-400 ">© 2022 <a href="/" className="hover:underline">Spot For Us</a>. All Rights Reserved.</div>
        </div>
    </footer>
  )
}
