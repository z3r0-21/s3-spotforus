import React, { useState } from 'react';
import logo from '../../../assets/images/sfu-logo-blue-cropped.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function UserNav() {
    const { logout } = useAuth0();
  return (
    <nav class="flex flex-col text-center sm:flex-row p-2 sm:gap-4 bg-blue-200 w-full">
        <div class="mb-2 sm:mb-0">
            <a href="/home">
                <img src={logo} className="h-6 sm:h-9" alt="Spot For Us logo"/>
            </a>
        </div>
        <Link to="/dashboard" className='sm:ml-auto'>
            <div className="flex items-center h-12 overflow-hidden">
                <FontAwesomeIcon icon={['fas', 'house']} className="mr-1"/>
                <div>Home</div>
            </div>
        </Link>
        <Link to="/dashboard">
            <div className="flex items-center h-12 overflow-hidden">
                <FontAwesomeIcon icon={['far', 'calendar-days']} className="mr-1"/>
                <div>Calendar</div>
            </div>
        </Link>
        <Link to="/dashboard">
            <div className="flex items-center h-12 overflow-hidden">
                <FontAwesomeIcon icon={['fa', 'bullhorn']} className="mr-1"/>
                <div>Announcements</div>
            </div>
        </Link>
        <Link to="/dashboard">
            <div className="flex items-center h-12 overflow-hidden">
                <FontAwesomeIcon icon={['fa', 'users-rectangle']} className="mr-1"/>
                <div>My household</div>
            </div>
        </Link>
        <Link to="test" onClick={() => logout({ returnTo: "http://localhost:3000/landing" })}>
            <div className="flex items-center h-12 overflow-hidden">
                <FontAwesomeIcon icon={['fa', 'arrow-right-from-bracket']} className="mr-1"/>
                <div>Log out</div>
            </div>
        </Link>
    </nav>
  )
}
