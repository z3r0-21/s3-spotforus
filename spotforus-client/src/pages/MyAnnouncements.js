import React, { useState, useEffect } from 'react'
import AnnouncementTile from '../components/Announcements/AnnouncementTile';
import Searchbar from '../components/Households/Searchbar';
import FilterRow from '../components/Announcements/FilterRow';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function MyAnnouncements() {
    const[initialAnnouncements, setInitialAnnouncements] = useState([]);
    const[filteredAnnouncements, setFilteredAnnouncements] = useState([]);
    const location = useLocation();
    const data = location.state?.data;

    //search and filter
    const[filters, setFilters] = useState({
      searchIput: null,
      announcementType: "all",
      listOrder: "desc",
    });
      
    useEffect(() => {
      setInitialAnnouncements(data)
    }, [data]);
  
    useEffect(() => {
      let result = initialAnnouncements;
      result = filterByAnnouncementType(result);
      result = filterListOrder(result);
      result = filterByInputString(result);
      setFilteredAnnouncements(result);
  }, [filters, initialAnnouncements]);
  
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
      <Link to="/newAnnouncement" className='sm:ml-auto'>
      <div className="flex items-center h-12 overflow-hidden">
          <div>New announcement</div>
      </div>
      </Link>
      <Link to="/announcements" className='sm:ml-auto'>
      <div className="flex items-center h-12 overflow-hidden">
          <div>All announcements</div>
      </div>
      </Link>
      <Searchbar handleChange={updateSarchInput}/>
      <FilterRow name={"announcementType"} values={["all", "info","warning","request"]} labels={["All", "Info","Warning", "Request"]} handleChange={handleChange}/>
      <FilterRow name={"listOrder"} values={["desc", "asc"]} labels={["Newer first", "Older first"]} handleChange={handleChange}/>
      {filteredAnnouncements.map((a) => (
        <AnnouncementTile 
        key={a.id} 
        id={a.id} 
        type={a.type} 
        content={a.content} 
        userId={a.user.id} 
        date={a.created_on} 
        byAdmin={a.admin}/>
      ))}
      </>
    )
  }
