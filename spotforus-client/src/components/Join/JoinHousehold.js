import React, { useState } from 'react';

export default function JoinHousehold({joinHouseholdWithCode}) {
  const [code, setCode] = useState(null)

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

  return (
    <div className="flex flex-col ">
      <h1 className="text-3xl font-bold my-2">Your housemates are waiting for you.</h1>
      <p className="text-gray-600">
        You can use your unique join code to join your household. No join code? Make sure to get in touch with your house manager.
      </p>
      <div className="flex flex-row gap-2 mt-4 justify-center">
        <input onChange={handleChange} id="joinCode" name="joinCode" className="bg-gray-200 p-2 rounded-lg" type="number" placeholder="Enter code" required/>
        <button onClick={() => joinHouseholdWithCode(code)} className="bg-blue-500 p-2 rounded-lg text-white">Join</button>
      </div>
    </div>
  )
}
