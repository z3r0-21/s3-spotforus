import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { axiosClient } from "../api/AxiosClient";
import { useNavigate } from 'react-router-dom';


export default function AdminNewAnnouncement() {
  const navigate = useNavigate();
  const { user, getAccessTokenWithPopup, getAccessTokenSilently } = useAuth0();
  const [announcement, setAnnouncement] = useState({
    content: null,
    type: null,
    user:{
      id: null
    },
    admin: null,
    household: null
  });
  const location = useLocation();
  const householdId = location.state?.householdId;


  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () =>{
    const token = await getAccessTokenWithPopup({
      audience: `https://users-api.com`,
      scope: "crud:all",
    });

    axiosClient.defaults.headers.common['Authorization'] = "Bearer " + token;

    axiosClient.get('/users/get/' + trimAuth0Id(user.sub))
      .then(function(response){
        console.log(response.data)
        if(Object.entries(response.data).length > 0){
          const userDetails = {
            content: null,
            type: null,
            user:{
              id: response.data.id
            },
            admin: response.data.admin,
            household: householdId
          }
          setAnnouncement(userDetails);
        }
      }); 
  }

  const submitAnnouncement = async () =>{
    const token = await getAccessTokenSilently({
      audience: `https://users-api.com`,
      scope: "crud:all",
    });

    axiosClient.defaults.headers.common['Authorization'] = "Bearer " + token;

    axiosClient.post('/announcements/add', JSON.stringify(announcement))
    .then(function (response) {
    alert("Created successfully.")
    navigate('/manageAnnouncements', { state: { householdId:householdId } })
    })
    .catch(function (error) {
      console.log(error);
      alert("Error submitting announcement: " + error.code)
    });
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAnnouncement((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  function trimAuth0Id(str){
    return str.substring(str.indexOf("|") + 1);
  }

  return (

    <>
      <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
          <select id="type" name="type" autocomplete="announcement-type" onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
          <option value="Info">Info</option>
          <option value="Request">Request</option>
          <option value="Warning">Warning</option>
          </select>
      </div>
      <div>
      <label for="content" className="block text-sm font-medium text-gray-700">Content</label>
      <div className="mt-1">
          <textarea id="content" name="content" rows="5" onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required></textarea>
      </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button type="submit" onClick={submitAnnouncement} className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Submit</button>
      </div>
    </>
  )
}
