import React, { useEffect, useState } from 'react';
import SearchBar from '../components/Households/Searchbar'
import List from '../components/Households/List'
import {getAllHouseholds} from '../api/HouseholdApi';
import UserNav from '../components/Navigation/Navbars/UserNav';
import AdminNav from '../components/Navigation/Navbars/AdminNav'
import NewUserNav from '../components/Navigation/Navbars/NewUserNav';
import CtaNav from '../components/Navigation/Navbars/CtaNav';

export default function ManageHouseholdsPage() {
  const [data, setData] = useState([]);

const [searchInput, setSearchInput] = useState("");
const [displayedResults, setDisplayedResults] = useState(data);

useEffect(() => {
  getAllHouseholds()
  .then(function(response){
    setData(response.data)
    setDisplayedResults(response.data)
  });
}, []);

function handleChange(e) {
  setSearchInput(e.currentTarget.value);
  const value = e.target.value

  if(!IsEmptyOrWhiteSpace(value)){
      setDisplayedResults(
        data.filter(h => {
          if (h.householdDetails.postcode === value || h.id === value || h.householdDetails.houseNumber === parseInt(value) || h.householdDetails.houseName === value || h.householdDetails.details === value) {
            return true
          }         
          return false
      })
    )
  }
  else if(IsEmptyOrWhiteSpace(value)){
      setDisplayedResults(data)
    }
}

//todo: add to utils
function IsEmptyOrWhiteSpace(str) {
  return (str.match(/^\s*$/) || []).length > 0;
}

  return (
    <>
      <AdminNav/>
      <UserNav/>
      <NewUserNav/>
      <CtaNav/>
      <SearchBar handleChange={handleChange}/>
      <List data={displayedResults}/>
    </>
  )
}
