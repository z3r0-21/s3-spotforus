import React, { useState, useEffect } from 'react';
import { axiosClient } from "../api/AxiosClient";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function EditHouseholdSettingsPage() {
    const [householdSettings, setHouseholdSettings] = useState({
        maxTenants: 0,
        bathrooms: 0,
        kitchens: 0,
        trashCans: 0,
        otherRooms: 0
    });
    const location = useLocation();
    const household = location.state?.data;
    const { getAccessTokenWithPopup } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        setHouseholdSettings(household.householdSettings)
    }, [household]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = await getAccessTokenWithPopup({
            audience: `https://users-api.com`,
            scope: "crud:all",
        });
    
        const updatedHousehold = {
          id: household.id,
          tenants: household.tenants,
          joinCodes: household.joinCodes,
          announcements: household.announcements,
          householdDetails: household.householdDetails,
          householdSettings: householdSettings
        }

        axiosClient.defaults.headers.common['Authorization'] = "Bearer " + token;
        
        axiosClient.post('/household/add', JSON.stringify(updatedHousehold))
        .then(response => {
            alert("Updated successfully.")
            navigate('/manageHouseholds')
        })
        .catch(error => {
            alert(error)
        });
    }

  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maxTenants">
          Max tenants:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          id="maxTenants"
          name="maxTenants"
          min="1" max="50"
          value={householdSettings.maxTenants}
          onChange={event => setHouseholdSettings({ ...householdSettings, maxTenants: event.target.value })}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bathrooms">
          Bathrooms:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          id="bathrooms"
          name="bathrooms"
          min="1" max="50"
          value={householdSettings.bathrooms}
          onChange={event => setHouseholdSettings({ ...householdSettings, bathrooms: event.target.value })}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="kitchens">
          Kitchens:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          id="kitchens"
          name="kitchens"
          min="1" max="20"
          value={householdSettings.kitchens}
          onChange={event => setHouseholdSettings({ ...householdSettings, kitchens: event.target.value })}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="trashCans">
          Trashcans:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          id="trashCans"
          name="trashCans"
          min="0" max="20"
          value={householdSettings.trashCans}
          onChange={event => setHouseholdSettings({ ...householdSettings, trashCans: event.target.value })}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otherRooms">
          Other rooms:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          id="otherRooms"
          name="otherRooms"
          min="0" max="20"
          value={householdSettings.otherRooms}
          onChange={event => setHouseholdSettings({ ...householdSettings, otherRooms: event.target.value })}
          required
        />
      </div>


    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Submit
    </button>
    </form>
  );
}

export default EditHouseholdSettingsPage;
