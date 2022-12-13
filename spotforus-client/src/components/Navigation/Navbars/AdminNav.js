import React, { useState } from 'react';
import logo from '../../../assets/images/sfu-logo-blue-cropped.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function AdminNav() {
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
                <FontAwesomeIcon icon={['fas', 'users']} className="mr-1"/>
                <div>Users</div>
            </div>
        </Link>
        <Link to="/manageHouseholds">
            <div className="flex items-center h-12 overflow-hidden">
                <FontAwesomeIcon icon={['fas', 'users-rectangle']} className="mr-1"/>
                <div>Households</div>
            </div>
        </Link>
        <Link to="test" onClick={() => logout({ returnTo: "http://localhost/landing" })}>
            <div className="flex items-center h-12 overflow-hidden">
                <FontAwesomeIcon icon={['fa', 'arrow-right-from-bracket']} className="mr-1"/>
                <div>Log out</div>
            </div>
        </Link>
    </nav>
  )
}
