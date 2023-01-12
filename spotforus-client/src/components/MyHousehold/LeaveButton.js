import React from 'react';
import { axiosClient } from "../../api/AxiosClient";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from 'react-redux'
import { leaveHousehold } from '../../redux/userSlice'
import { useNavigate } from 'react-router-dom';

function LeaveButton() {
    const {user, getAccessTokenWithPopup, getAccessTokenSilently} = useAuth0();
    const householdId = useSelector((state) => state.user.householdId)
    const dispatch = useDispatch()
    const navigate = useNavigate();

  const handleClick = async () => {
    try {
        const token = await getAccessTokenWithPopup({
          audience: `https://users-api.com`,
          scope: "crud:all",
        });
  
        axiosClient.defaults.headers.common['Authorization'] = "Bearer " + token;


        if (window.confirm('Are you sure you want to delete?')) {
            axiosClient.put("/household/removeTenant/" + trimAuth0Id(user.sub) + "/" + householdId)
            .then(function () {
                dispatch(leaveHousehold())
                alert("Deleted successfully")
                navigate("/home")
              })
            .catch(function (error) {
                alert("Error: " + error.code)
            });
          }
  
        } catch (e) {
          console.log(e.message);
        }
  };

  function trimAuth0Id(str){
    return str.substring(str.indexOf("|") + 1);
  }

  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleClick}
    >
      Leave household
    </button>
  );
}

export default LeaveButton;
