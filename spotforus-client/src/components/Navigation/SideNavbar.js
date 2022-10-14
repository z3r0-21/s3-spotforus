import React, { useState } from 'react';
import logo from '../../assets/images/sfu-logo-blue-cropped.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from '../Auth/Profile'


export default function SideNavbar() {
    const [isOpen, setIsOpen] = useState(false); //todo
    const { logout } = useAuth0();

  return (
    <>
        <div class="w-60 h-screen shadow-md bg-gray-200 px-1 absolute">
            <ul class="relative flex flex-col h-full">
                <li class="relative">
                    <img src={logo} className="h-full flex items-center py-4 px-6 overflow-hiddentransition duration-300 ease-in-out" href="#!" alt="Spot For Us logo"/>
                </li>
                <Link to="/dashboard">
                    <li className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out">
                        <FontAwesomeIcon icon={['fas', 'house']} className="mr-1 md:mr-2"/>
                        <div>Home</div>
                    </li>
                </Link>
                <Link to="/">
                    <li className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out">
                        <FontAwesomeIcon icon={['far', 'calendar-days']} className="mr-1 md:mr-2"/>
                        <div>Calendar</div>
                    </li>
                </Link>
                <Link to="/">
                    <li className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out">
                        <FontAwesomeIcon icon={['fa', 'bullhorn']} className="mr-1 md:mr-2"/>
                        <div>Announcements</div>
                    </li>
                </Link>
                <Link to="/">
                    <li className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out">
                        <FontAwesomeIcon icon={['fa', 'users-rectangle']} className="mr-1 md:mr-2"/>
                        <div>My household</div>
                    </li>
                </Link>
                <Link to="test" onClick={() => logout({ returnTo: "http://localhost:3000/landing" })}>
                    <li className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out">
                        <FontAwesomeIcon icon={['fa', 'arrow-right-from-bracket']} className="mr-1 md:mr-2"/>
                        <div>Log out</div>
                    </li>
                </Link>
            </ul>
        </div>
        <Profile/>
    </>
  )
}
