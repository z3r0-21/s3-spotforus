import React, { useState, useEffect } from 'react';
import { axiosClient } from "../api/AxiosClient";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function EditHouseholdDetailsPage() {
    const [houseDetails, setHouseDetails] = useState({
        postcode: '',
        houseNumber: '',
        houseName: '',
        details: ''
    });
    const location = useLocation();
    const household = location.state?.data;
    const { getAccessTokenWithPopup } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        setHouseDetails(household.householdDetails)
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
          householdDetails: houseDetails,
          householdSettings: household.householdSettings
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
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="postcode">
          Postcode:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="postcode"
          name="postcode"
          value={houseDetails.postcode}
          onChange={event => setHouseDetails({ ...houseDetails, postcode: event.target.value })}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="houseNumber">
          House number:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="houseNumber"
          name="houseNumber"
          value={houseDetails.houseNumber}
          onChange={event => setHouseDetails({ ...houseDetails, houseNumber: event.target.value })}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="houseName">
          House name:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="houseName"
          name="houseName"
          value={houseDetails.houseName}
          onChange={event => setHouseDetails({ ...houseDetails, houseName: event.target.value })}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="houseName">
          Additional details:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="details"
          name="details"
          value={houseDetails.details}
          onChange={event => setHouseDetails({ ...houseDetails, details: event.target.value })}
          required
        />
      </div>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Submit
    </button>
    </form>
  );
}

export default EditHouseholdDetailsPage;
