import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { loginAdmin, loginUser, joinHousehold, leaveHousehold, logout } from '../redux/userSlice'
import JoinHousehold from '../components/Join/JoinHousehold';
import { useDispatch, useSelector } from 'react-redux'
import { axiosClient } from "../api/AxiosClient";
import { useNavigate } from 'react-router-dom';

export default function Das() {
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const {user, isLoading, getAccessTokenWithPopup, isAuthenticated, loginWithRedirect} = useAuth0();
  const dispatch = useDispatch()
  const isHouseholdTenant = useSelector((state) => state.user.isHouseholdTenant)
  let accessToken;

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

  useEffect(() => {
    getUserDetails();
  }, [loading])

  const joinHouseholdWithCode = async (code) => {    
    try {
      const token = await getAccessTokenWithPopup({
        audience: `https://users-api.com`,
      });

      console.log(token)

      axiosClient.defaults.headers.common['Authorization'] = "Bearer " + token;
      axiosClient.put('/household/addTenant/' + trimAuth0Id(user.sub) + "/" + code)
      .then(function(response){
        alert("Nice, you have just joined a household.")
        console.log(response.data)
        getUserDetails();
      }); 
      } catch (e) {
        alert("Somethings went wrong.\nDouble-check your join code an try again. If in doubt contact your property manager.")
        console.log(e.message);
      }
    }


  const createNewUser = async () => {
    const userDetails = {
      id: trimAuth0Id(user.sub),
      username: user.nickname,
      email: user.email,
      admin: false,
      household: null
    }

    axiosClient.defaults.headers.common['Authorization'] = "Bearer " + accessToken;

    axiosClient.post('/users/add', JSON.stringify(userDetails))
    .then(function(response){
      setUserDetails(response.data);
    }); 
  }
  
  const getUserDetails = async () => {
    console.log("Get")

    try {
      const token = await getAccessTokenWithPopup({
        audience: `https://users-api.com`,

      });

      accessToken = token;

      axiosClient.defaults.headers.common['Authorization'] = "Bearer " + accessToken;

      if(Object.entries(userDetails).length === 0){
        axiosClient.get('/users/get/' + trimAuth0Id(user.sub))
        .then(function(response){
          console.log(response.data)
          if(Object.entries(response.data).length === 0){
            console.log("CU")
            createNewUser();
          }
          else{
            if(response.data.household !== null){
              dispatch(joinHousehold(response.data.household.id));
            }

            if(response.data.admin){
              console.log("login admin")
              dispatch(loginAdmin())
            }
            else{
              console.log("login user")
              dispatch(loginUser())
            }
            setUserDetails(response.data);
          }
        }); 
      }

      } catch (e) {
        console.log(e);
      }
  };


    function trimAuth0Id(str){
      return str.substring(str.indexOf("|") + 1);
    }
    
  return (
    <>
        {!isHouseholdTenant
        ? 
        <JoinHousehold joinHouseholdWithCode={joinHouseholdWithCode} accessToken={accessToken}/> 
        : 
        <div name="welcomeMessage">Welcome {user.nickname}!</div>
        }
    </>
  )
}
