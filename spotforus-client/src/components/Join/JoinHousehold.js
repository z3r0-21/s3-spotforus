import React, { useState } from 'react';
import { joinHousehold } from '../../api/HouseholdApi';
import { useAuth0 } from "@auth0/auth0-react";

export default function JoinHousehold() {
  const [code, setCode] = useState(null)
  const {user, isAuthenticated} = useAuth0();

  function join(){
    let userId = trimAuth0Id(user.sub)
    joinHousehold(userId, code)
    .then(function(response){
      console.log(response.data)
    });
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
            <input onChange={handleChange} type="joinCode" id="joinCode" className="bg-white border border-gray-400 text-black block w-full md:w-1/4 sm:w-1/2 p-2.5" required/>
            <button type="submit" onClick={join} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </div>
    </form>
  )
}
