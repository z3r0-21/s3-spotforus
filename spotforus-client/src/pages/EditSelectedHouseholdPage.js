import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Auth0Api } from "../api/Auth0Api";
import { axiosClient } from "../api/AxiosClient";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useClipboard } from 'use-clipboard-copy';

export default function EditSelectedHouseholdPage() {
    const location = useLocation();
    let data = location.state?.data;
    const { getAccessTokenWithPopup } = useAuth0();
    const navigate = useNavigate();
    const [copied, setCopied] = useState(null);
    const clipboard = useClipboard();

    const handleCopy = (code) => {
        clipboard.copy(code.toString());
        setCopied(code);
    };

    const handleDelete = async() => {
    try {
        const token = await getAccessTokenWithPopup({
            audience: `https://users-api.com`,
            scope: "crud:all",
            });
    
            axiosClient.defaults.headers.common['Authorization'] = "Bearer " + token;
    
            axiosClient.delete('/household/delete/' + data.id)
            .then(function(response){
                alert("Deleted successfully.")
                navigate('/manageHouseholds')
            }); 
    } 
    catch (e) {
        console.log(e.message);
    }
    };

    const handleRemoveTenant = async(userId) => {
        try {
            const token = await getAccessTokenWithPopup({
                audience: `https://users-api.com`,
                scope: "crud:all",
                });
                console.log(userId)
                axiosClient.defaults.headers.common['Authorization'] = "Bearer " + token;
        
                axiosClient.put('/household/removeTenant/' + userId + "/" + data.id)
                .then(function(response){
                    alert("Removed successfully.")
                    navigate('/manageHouseholds')
                }); 
        } 
        catch (e) {
            console.log(e.message);
        }
    };

  return (
    <>
     <div className="relative w-full h-32">
        <iframe
            title="mapsFrame"
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.google.com/maps/embed/v1/place?q=${data.householdDetails.houseName}+${data.householdDetails.postcode}&zoom=16&key=AIzaSyBP1iCuHuydFCFfPYmVVoO3pD83XoWcHDI`}
            allowFullScreen
        />
      </div>
    <div className="grid grid-cols-2 gap-x-3 gap-y-5 p-2">
        <div className="col-span-2 sm:col-span-1 flex flex-col bg-white rounded-lg shadow-lg">
                <div className="text-2xl font-bold text-gray-900 mb-2">
                Household details
                </div>
                <div className="text-gray-700 mb-2">
                <span className="font-bold">ID:</span> {data.id}
                </div>
                <div className="text-gray-700 mb-2">
                <span className="font-bold">Postcode:</span> {data.householdDetails.postcode}
                </div>
                <div className="text-gray-700 mb-2">
                <span className="font-bold">House number:</span> {data.householdDetails.houseNumber}
                </div>
                <div className="text-gray-700 mb-2">
                <span className="font-bold">House name:</span> {data.householdDetails.houseName}
                </div>
                <div className="text-gray-700 mb-2">
                <span className="font-bold">Details:</span> {data.householdDetails.details}
                </div>
                <div className="flex flex-row justify-center gap-2 my-4">
                    <Link to="/editHouseholdDetails"  state={{ data: data }}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4">
                            Edit details
                        </button>
                    </Link>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-4" onClick={handleDelete}>
                        Delete household
                    </button>
                </div>
        </div>
        <div className="col-span-2 sm:col-span-1 flex flex-col bg-white rounded-lg shadow-lg">
                <div className="text-2xl font-bold text-gray-900 mb-2">
                Settings
                </div>
                <div className="text-gray-700 mb-2">
                <span className="font-bold">Max tenants:</span> {data.householdSettings.maxTenants}
                </div>
                <div className="text-gray-700 mb-2">
                <span className="font-bold">Current tenants:</span> {data.tenants.length}
                </div>
                <div className="text-gray-700 mb-2">
                <span className="font-bold">Toilets:</span> {data.householdSettings.bathrooms}
                </div>
                <div className="text-gray-700 mb-2">
                <span className="font-bold">Kitchens:</span> {data.householdSettings.kitchens}
                </div>
                <div className="text-gray-700 mb-2">
                <span className="font-bold">Trashcans:</span> {data.householdSettings.trashCans}
                </div>
                <div className="text-gray-700 mb-2">
                <span className="font-bold">Other rooms:</span> {data.householdSettings.trashCans}
                </div>
                <div className="flex flex-row justify-center gap-2 mb-4">
                <Link to="/editHouseholdSettings"  state={{ data: data }}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Edit settings
                    </button>
                </Link>
                </div>
        </div>
        <div className="col-span-2 sm:col-span-1 flex flex-col bg-white rounded-lg shadow-lg">
                <div className="text-2xl font-bold text-gray-900 mb-2">
                Announcements
                </div>
                <span>There are {data.announcements.length} announcements in this household.</span>
                <div className="flex flex-row justify-center gap-2 my-4">
                    <Link to="/AdminNewAnnouncement"  state={{ householdId: data.id }}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                            Create new announcement
                        </button>
                        </Link>

                    <Link to="/manageAnnouncements"  state={{ householdId: data.id }}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                            View and manage announcements
                        </button>
                    </Link>
                </div>

        </div>
        <div className="col-span-2 sm:col-span-1 flex flex-col bg-white rounded-lg shadow-lg">
                <div className="text-2xl font-bold text-gray-900 mb-2">
                Calendar
                </div>
                {/* <span>There are 11 calendar tasks in this household.</span> */}
                <div className="flex flex-row justify-center gap-2 my-4">
                    <Link to="/generateSchedule"  state={{ data: data }}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Generate task schedule
                    </button>
                    </Link>
                    <Link to="/manageHouseholdSchedule"  state={{ data: data }}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        View and manage calendar
                    </button>
                    </Link>
                </div>
        </div>
        <div className="col-span-2 flex flex-col bg-white rounded-lg shadow-lg">
            <div className="text-2xl font-bold text-gray-900 mb-2">
                Join codes
            </div>
            <span>Click on any of the join codes to copy it. Used join codes are disabled and can not be coppied.</span>
            <div className="flex flex-col md:flex-row md:flex-wrap">
                {data.joinCodes.map((code) => (
                code.used 
                ? 
                <div
                    key={code.code}
                    className="bg-gray-500 rounded p-2 m-2 hover:bg-gray-400 cursor-not-allowed	select-none"
                    >
                    {code.code}
                </div>
                : 
                <div
                    key={code.code}
                    className="bg-gray-200 rounded p-2 m-2 hover:bg-gray-300 cursor-pointer select-none"
                    onClick={() => handleCopy(code.code)}
                    >
                    {code.code}
                    {copied === code.code && (
                        <span className="text-green-500 ml-2">Copied!</span>
                    )}
                </div>
            ))}
            </div> 
        </div>
    <div className="col-span-2 flex flex-col bg-white rounded-lg shadow-lg">
    <div className="text-2xl font-bold text-gray-900 mb-2">
        Tenants
    </div>
    <span className='mb-6'>All tenants of the currely selected households are shows in the table. You can use the buttons on the right to remove them or manage their profiles.</span>
    <div className="overflow-x-scroll">
        <table className="w-full text-left table-collapse">
          <thead>
            <tr>
              <th className="py-4 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 border-b border-gray-300">Nickname</th>
              <th className="py-4 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 border-b border-gray-300">Email</th>
              <th className="py-4 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 border-b border-gray-300">Actions</th>     
            </tr>
          </thead>
          <tbody>
            {data.tenants.map(user => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="py-4 px-6 border-b border-gray-200">{user.username}</td>
                <td className="py-4 px-6 border-b border-gray-200">{user.email}</td>
                <td className="py-4 px-6 border-b border-gray-200 flex flex-row gap-2 items-center">
                  <Link to="/editUser"  state={{ data: user }}>
                    <button className="px-3 py-2 rounded-full text-sm font-semibold text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                      View
                    </button>
                  </Link>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"  onClick={() => handleRemoveTenant(user.id)}>
                        Remove tenant
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </>
  )
}
