import React, { useEffect, useState } from 'react';
import ContactForm from '../components/MyHousehold/ContactForm'
import HouseDetails from '../components/MyHousehold/HouseDetails'
import HousematesList from '../components/MyHousehold/HousematesList'
import { axiosClient } from "../api/AxiosClient";
import { useAuth0 } from "@auth0/auth0-react";
import JoinHousehold from '../components/Join/JoinHousehold';

export default function MyHouseholdPage() {
  const[household, setHousehold] = useState(null);
  const { user, getAccessTokenWithPopup, isLoading, getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

  useEffect(() => {
    if(!loading){
      getUserDetails()
    }
    ;
  }, [loading]);

  const getUserDetails = async () =>{
    const token = await getAccessTokenWithPopup({
      audience: `https://users-api.com`,
    }); 

    axiosClient.defaults.headers.common['Authorization'] = "Bearer " + token;

    axiosClient.get('/users/get/' + trimAuth0Id(user.sub))
      .then(function(response){
        if(Object.entries(response.data).length > 0){
          setHousehold(response.data.household)
          console.log(household)
        }
      }); 
  }

  function trimAuth0Id(str){
    return str.substring(str.indexOf("|") + 1);
  }

  return (
    <>
    {household !== null 
    ?
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mx-4 mt-2 mb-4">
        <div className="sm:col-span-4">
          <HouseDetails
            houseName={household.householdDetails.houseName}
            postcode={household.householdDetails.houseNumber}
            details={household.householdDetails.details}
          />
        </div>
        <div className="sm:col-span-1">
          <HousematesList
            users={household.tenants}
            maxTenants={household.householdSettings.maxTenants}
          />
        </div>
        <div className="sm:col-span-3">
          <ContactForm/>
        </div>
      </div>
      :
      <JoinHousehold/>
      }
    </>
  )
}
