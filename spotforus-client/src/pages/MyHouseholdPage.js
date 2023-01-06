import React, { useEffect, useState } from 'react';
import ContactForm from '../components/MyHousehold/ContactForm'
import HouseDetails from '../components/MyHousehold/HouseDetails'
import HousematesList from '../components/MyHousehold/HousematesList'
import { axiosClient } from "../api/AxiosClient";
import { useAuth0 } from "@auth0/auth0-react";

export default function MyHouseholdPage() {
  const users = [
    { id: 1, username: 'John' },
    { id: 2, username: 'Jane' },
  ];
  const [housemates, setHousemates] = useState([])
  const [capacity, setCapacity] = useState()
  const { user, getAccessTokenWithPopup } = useAuth0();

  useEffect(() => {
    getUserDetails();
  },[]);

  const getUserDetails = async () =>{
    const token = await getAccessTokenWithPopup({
      audience: `https://users-api.com`,
      scope: "getid:user",
    });

    axiosClient.defaults.headers.common['Authorization'] = "Bearer " + token;

    axiosClient.get('/users/get/' + trimAuth0Id(user.sub))
      .then(function(response){
        if(Object.entries(response.data).length > 0){
          setHousemates(response.data.household.tenants)
          setCapacity(response.data.household.householdSettings.maxTenants)
        }
      }); 
  }

  function trimAuth0Id(str){
    return str.substring(str.indexOf("|") + 1);
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mx-4 mt-2 mb-4">
        <div className="sm:col-span-4">
          <HouseDetails
            houseName="Prins Hendrikstraat 45"
            postcode="5281CK"
            details="This is a nice house in a great location"
          />
        </div>
        <div className="sm:col-span-1">
          <HousematesList
            users={housemates}
            maxTenants={capacity}
          />
        </div>
        <div className="sm:col-span-3">
          <ContactForm/>
        </div>
      </div>
    </>
  )
}
