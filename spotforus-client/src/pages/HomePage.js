import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { getUser, addUser } from '../api/UserApi';
import { loginAdmin, loginUser, joinHousehold, leaveHousehold, logout } from '../redux/userSlice'
import JoinHousehold from '../components/Join/JoinHousehold';
import { useDispatch, useSelector } from 'react-redux'

export default function HomePage() {
  const [householdId, setHouseholdId] = useState(-1);
  const {user, isAuthenticated} = useAuth0();
  const dispatch = useDispatch()
  const isAdmin = useSelector((state) => state.user.isAdmin)

    useEffect(() => {
      if(isAuthenticated){
        getUser(trimAuth0Id(user.sub))
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
            registerNewUser(user.sub, user.nickname, user.email)
          }
        }); 
      }
    });

    //todo add to utils
    function trimAuth0Id(str){
      return str.substring(str.indexOf("|") + 1);
    }

    function registerNewUser(userId, username, email){
      const user = {
        id: trimAuth0Id(userId),
        username: username,
        email: email,
        admin: false,
        household: null
      }

      addUser(user)
      .then(function(response){
        console.log(response.data)
      }); 
    }
    
  return (
    <>
        {householdId === -1 && isAdmin === false ? <JoinHousehold/> : <div>Welcome {user.nickname}!</div>}
    </>
  )
}
