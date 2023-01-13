import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import AnnouncementTile from '../components/Announcements/AnnouncementTile';
import Searchbar from '../components/Households/Searchbar';
import FilterRow from '../components/Announcements/FilterRow';
import { Link } from "react-router-dom";
import { axiosClient } from "../api/AxiosClient";
import { useAuth0 } from "@auth0/auth0-react";

export default function AnnouncementsPage() {
  const[initialAnnouncements, setInitialAnnouncements] = useState([]);
  const[filteredAnnouncements, setFilteredAnnouncements] = useState([]);

  const { getAccessTokenWithPopup, getAccessTokenSilently } = useAuth0();


  //search and filter
  const[filters, setFilters] = useState({
    searchIput: null,
    userType: "all",
    announcementType: "all",
    listOrder: "desc",
  });

  const householdId = useSelector((state) => state.user.householdId)


  const getAnnouncments = async () => {
    try {
      const token = await getAccessTokenWithPopup({
        audience: `https://users-api.com`,
      });

      console.log(token)

      axiosClient.defaults.headers.common['Authorization'] = "Bearer " + token;

      axiosClient.get('/announcements/get/perHousehold/' + householdId)
      .then(function(response){
        setInitialAnnouncements(response.data)
      }); 

      } catch (e) {
        console.log(e.message);
      }
  };
  
  useEffect(() => {
    getAnnouncments();
  }, [householdId]);

  useEffect(() => {
    let result = initialAnnouncements;
    result = filterByAnnouncementType(result);
    result = filterByUserType(result);
    result = filterListOrder(result);
    result = filterByInputString(result);
    setFilteredAnnouncements(result);
}, [filters, initialAnnouncements]);

  const filterByUserType = (array) => {
    switch(filters.userType){
      case "admin":
        return array.filter((item) => item.admin === true);
      case "tenant":
        return array.filter((item) => item.admin === false);
      default:
        return array;
    }
  };

  const filterListOrder = (array) => {
    switch(filters.listOrder){
      case "asc":
        console.log(1)
        return array.sort((a, b) => b.created_on.localeCompare(a.created_on));
      case "desc":
        console.log(2)
        return array.sort((a, b) => a.created_on.localeCompare(b.created_on));
      default:
        console.log(3)
        return array.sort((a, b) => b.created_on.localeCompare(a.created_on));
    }
  };

  const filterByAnnouncementType = (array) => {
    switch(filters.announcementType){
      case "request":
        return array.filter((item) => item.type === "Request");
      case "warning":
        return array.filter((item) => item.type === "Warning");
      case "info":
        return array.filter((item) => item.type === "Info");
      default:
        return array;
    }
  };

  const filterByInputString = (array) => {
    if(filters.searchIput !== null){
      return array.filter((item) => item.content.includes(filters.searchIput));
    }
    else{
      return array
    }
  }

  function updateSarchInput(e) {
    const value = e.target.value
  
    if(!IsEmptyOrWhiteSpace(value)){
      setFilters((prevState) => {
        return({
          ...prevState,
          searchIput: value
        });
      });
    }
    else if(IsEmptyOrWhiteSpace(value)){
      setFilters((prevState) => {
        return({
          ...prevState,
          searchIput: null
        });
      });
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  
  //todo: add to utils
  function IsEmptyOrWhiteSpace(str) {
    return (str.match(/^\s*$/) || []).length > 0;
  }

  return (
    <>
    <div className='flex flex-row gap-3 m-2 justify-start'>
      <Link to="/newAnnouncement">
      <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            <div>New announcement</div>
        </div>
      </Link>
      <Link to="/myAnnouncements"  state={{ data: initialAnnouncements }}>
        <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            <div>My announcements</div>
        </div>
      </Link>
    </div>
    <Searchbar handleChange={updateSarchInput}/>
    <FilterRow name={"announcementType"} values={["all", "info","warning","request"]} labels={["All", "Info","Warning", "Request"]} handleChange={handleChange}/>
    <FilterRow name={"userType"} values={["all", "admin","tenant"]} labels={["All", "Admin","Teanant"]} handleChange={handleChange}/>
    <FilterRow name={"listOrder"} values={["desc", "asc"]} labels={["Newer first", "Older first"]} handleChange={handleChange}/>
    {filteredAnnouncements.map((a) => (
      <AnnouncementTile 
      key={a.id} 
      id={a.id} 
      type={a.type} 
      content={a.content} 
      userId={a.user.id} 
      date={a.created_on} 
      byAdmin={a.admin} 
      getAnnouncments={getAnnouncments}
    />
    ))}
    </>
  )
}
