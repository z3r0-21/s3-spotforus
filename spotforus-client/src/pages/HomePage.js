import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { loginAdmin, loginUser, joinHousehold, leaveHousehold, logout } from '../redux/userSlice'
import JoinHousehold from '../components/Join/JoinHousehold';
import { useDispatch, useSelector } from 'react-redux'
import { axiosClient } from "../api/AxiosClient";
 import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [householdId, setHouseholdId] = useState(-1);
  const {user, isAuthenticated, getAccessTokenWithPopup} = useAuth0();
  const dispatch = useDispatch()
  const isAdmin = useSelector((state) => state.user.isAdmin)
  const navigate = useNavigate();
  const checkUserExist = async () => {
    try {
      const token = await getAccessTokenWithPopup({
        audience: `https://users-api.com`,
        scope: "create:user getid:user",
      });

      axiosClient.defaults.headers.common['Authorization'] = "Bearer " + token;

      if(isAuthenticated){
        axiosClient.get('/users/get/' + trimAuth0Id(user.sub))
        .then(function(response){
          if(Object.entries(response.data).length > 0){
            if(response.data.admin === true){
              dispatch(loginAdmin())
            }
            else{
              dispatch(loginUser())
              
              if(Object.entries(response.data.household).length > 0){
                dispatch(joinHousehold(response.data.household.id))
                setHouseholdId(response.data.household.id)
              }
            }
          }
          else{
            const userDetails = {
              id: trimAuth0Id(user.sub),
              username: user.nickname,
              email: user.email,
              admin: false,
              household: null
            }

            axiosClient.post('/users/add', JSON.stringify(userDetails))
            .then(function(response){
              navigate("/home")
            }); 
          }
        }); 
      }

      } catch (e) {
        console.log(e.message);
      }
  };

    useEffect(() => {
      checkUserExist();

    },[isAuthenticated]);

    //todo add to utils
    function trimAuth0Id(str){
      return str.substring(str.indexOf("|") + 1);
    }
    
  return (
    <>
        {householdId === -1 && isAdmin === false ? <JoinHousehold /> : <div>Welcome {user.nickname}!</div>}
    </>
  )
}
