import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { axiosClient } from "../api/AxiosClient";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function GenerateSchedulePage() {
    const[week, setWeek] = useState();
    const[year, setYear] = useState();
    const { getAccessTokenWithPopup } = useAuth0();
    const location = useLocation();
    const household = location.state?.data;
    const navigate = useNavigate();

    const generateSchedule = async (event) => {
        event.preventDefault();

        const token = await getAccessTokenWithPopup({
            audience: `https://users-api.com`,
            scope: "crud:all",
        });
        axiosClient.defaults.headers.common['Authorization'] = "Bearer " + token;
        console.log(`${household.id}/${week}/${year}`)
        axiosClient.post(`/tasks/generateSchedue/${household.id}/${year}/${week}`)
        .then(response => {
            alert("Generated successfully.")
            navigate('/manageHouseholds')
        })
        .catch(error => {
            alert(error)
        });
    }

  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 m-6" onSubmit={generateSchedule}>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="trashCans">
        Week:
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="number"
        id="week"
        name="week"
        min="1" max="52"
        placeholder='Enter week'
        onChange={event => setWeek(event.target.value)}
        required
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otherRooms">
        Year: 
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="number"
        id="year"
        name="year"
        min="2022" max="2025"
        placeholder='Enter year'
        onChange={event => setYear(event.target.value)}
        required
      />
    </div>
  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
      Generate schedule
  </button>
  </form>
  )
}
