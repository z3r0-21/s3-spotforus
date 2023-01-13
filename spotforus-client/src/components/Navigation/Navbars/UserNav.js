import React, { useState } from 'react';
import logo from '../../../assets/images/sfu-logo-blue-cropped.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector} from 'react-redux'

export default function UserNav() {
    const { logout } = useAuth0();
    const isAdmin = useSelector((state) => state.user.isAdmin)
    const isHouseholdTenant = useSelector((state) => state.user.isHouseholdTenant)


  return (
    <nav class="flex flex-col text-center justify-end sm:flex-row p-2 sm:gap-4 bg-blue-200 w-full">
        
        <div class="mb-2 sm:mb-0 sm:mr-auto">
        <Link to="/dashboard">
                <img src={logo} className="h-6 sm:h-9" alt="Spot For Us logo"/>
            
        </Link>
        </div>
        {isHouseholdTenant 
        ?
        <>
        <Link to="/dashboard">
            <div className="flex items-center h-12 overflow-hidden">
                <FontAwesomeIcon icon={['fas', 'house']} className="mr-1"/>
                <div>Home</div>
            </div>
        </Link>
        <Link to="/home">
            <div className="flex items-center h-12 overflow-hidden">
                <FontAwesomeIcon icon={['far', 'calendar-days']} className="mr-1"/>
                <div>Calendar</div>
            </div>
        </Link>
        <Link to="/announcements">
            <div className="flex items-center h-12 overflow-hidden">
                <FontAwesomeIcon icon={['fa', 'bullhorn']} className="mr-1"/>
                <div>Announcements</div>
            </div>
        </Link>
        <Link to="/myHousehold">
            <div className="flex items-center h-12 overflow-hidden">
                <FontAwesomeIcon icon={['fa', 'users-rectangle']} className="mr-1"/>
                <div>My household</div>
            </div>
        </Link>
        </>
        :
        <Link to="/home" className='sm:ml-auto'>
            <div className="flex items-center h-12 overflow-hidden">
                <FontAwesomeIcon icon={['fas', 'circle-plus']} className="mr-1"/>
                <div>Join household</div>
            </div>
        </Link>
        }
        {isAdmin &&
        <>
        <Link to="/manageUsers">
            <div className="flex items-center font-bold h-12 overflow-hidden">
                <FontAwesomeIcon icon={['fas', 'users']} className="mr-1"/>
                <div>Users</div>
            </div>
        </Link>
        <Link to="/manageHouseholds">
            <div className="flex items-center font-bold h-12 overflow-hidden">
                <FontAwesomeIcon icon={['fas', 'users-rectangle']} className="mr-1"/>
                <div>Households</div>
            </div>
        </Link>
        </>
        }
        <Link to="test" onClick={() => logout({ returnTo: "http://localhost/landing" })}>
            <div className="flex items-center h-12 overflow-hidden">
                <FontAwesomeIcon icon={['fa', 'arrow-right-from-bracket']} className="mr-1"/>
                <div>Log out</div>
            </div>
        </Link>
    </nav>
  )
}
