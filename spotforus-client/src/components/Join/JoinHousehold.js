import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { axiosClient } from "../../api/AxiosClient";
import { useNavigate } from 'react-router-dom';

export default function JoinHousehold() {
  const [code, setCode] = useState(null)
  const {user, isAuthenticated, getAccessTokenWithPopup} = useAuth0();
  const navigate = useNavigate();

  const join = async () => {
    let userId = trimAuth0Id(user.sub)

    try {
      const token = await getAccessTokenWithPopup({
        audience: `https://users-api.com`,
      });

      console.log(token)

      axiosClient.defaults.headers.common['Authorization'] = "Bearer " + token;

      axiosClient.put('/household/addTenant/' + userId + "/" + code)
      .then(function(response){
        alert("Nice, you have just joined a household.")
        navigate("/home")
      }); 
      } catch (e) {
        console.log(e.message);
      }
  }

  function handleChange(e) {
    const code = e.target.value
  
    if(!IsEmptyOrWhiteSpace(code)){
      setCode(code)
    }
    else if(code.length === 0){
      setCode(null)
    }
  }

  function IsEmptyOrWhiteSpace(str) {
    return (str.match(/^\s*$/) || []).length > 0;
  }

  function trimAuth0Id(str){
    return str.substring(str.indexOf("|") + 1);
  }

  return (
    <form>
        <div className='flex flex-col w-full items-center gap-2 px-4'>
            <label for="joinCode" className="block mb-2 text-sm font-medium text-black">Your join code</label>
            <input onChange={handleChange} type="number" name="joinCode" id="joinCode" className="bg-white border border-gray-400 text-black block w-full md:w-1/4 sm:w-1/2 p-2.5" required/>
            <button type="submit" onClick={join} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </div>
    </form>
  )
}
