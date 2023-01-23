import React, { useEffect, useState } from 'react';
import SearchBar from '../components/Households/Searchbar'
import List from '../components/Households/List'
import { axiosClient } from "../api/AxiosClient";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

export default function ManageHouseholdsPage() {
  const [households, setHouseholds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHouseholds, setFilteredHouseholds] = useState([]);
  const { getAccessTokenWithPopup } = useAuth0();

  useEffect(() => {
    getHouseholds();
  }, []);

  useEffect(() => {
    const searchResults = households.filter(household =>
      household.householdDetails.postcode.includes(searchTerm) || household.householdDetails.houseName.includes(searchTerm)
    );
    setFilteredHouseholds(searchResults);
  }, [searchTerm, households]);

  const getHouseholds = async () =>{
    const token = await getAccessTokenWithPopup({
      audience: `https://users-api.com`,
      scope: "crud:all",
    });

    axiosClient.defaults.headers.common['Authorization'] = "Bearer " + token;

    axiosClient.get('/household/get/all')
    .then(function (response) {
        setHouseholds(response.data)
      })
    .catch(function (error) {
        alert("Error: " + error.code)
    });
}

//todo: add to utils
function IsEmptyOrWhiteSpace(str) {
  return (str.match(/^\s*$/) || []).length > 0;
}

  return (
    <>
      {/* <SearchBar handleChange={handleChange}/>
      <List data={displayedResults}/> */}
      <div className="flex flex-col gap-2 m-2">
      <div className='flex flex-col sm:flex-row justify-between gap-2'>
        <div>
          <Link to="/createHousehold">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Add new household
            </button>
          </Link>
        </div>
        <div className="flex items-center mx-2 sm:w-1/2">
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Search by email or username"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-x-scroll">
        <table className="w-full text-left table-collapse">
          <thead>
            <tr>
              <th className="py-4 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 border-b border-gray-300">ID</th>
              <th className="py-4 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 border-b border-gray-300">Postcode</th>
              <th className="py-4 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 border-b border-gray-300">House number</th>
              <th className="py-4 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 border-b border-gray-300">Name</th>
              <th className="py-4 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 border-b border-gray-300">Actions</th>     
            </tr>
          </thead>
          <tbody>
            {filteredHouseholds.map(household => (
              <tr key={household.id} className="hover:bg-gray-100">
                <td className="py-4 px-6 border-b border-gray-200">{household.id}</td>
                <td className="py-4 px-6 border-b border-gray-200">{household.householdDetails.postcode}</td>
                <td className="py-4 px-6 border-b border-gray-200">{household.householdDetails.houseNumber}</td>
                <td className="py-4 px-6 border-b border-gray-200">{household.householdDetails.houseName}</td>
                <td className="py-4 px-6 border-b border-gray-200">
                  <Link to="/editHousehold"  state={{ data: household }}>
                    <button className="px-3 py-2 rounded-full text-sm font-semibold text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}
