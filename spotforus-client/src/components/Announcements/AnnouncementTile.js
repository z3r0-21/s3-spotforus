import React, { useState, useEffect } from 'react'
import { axiosClient } from "../../api/AxiosClient";
import { useAuth0 } from "@auth0/auth0-react";
import {  useSelector } from 'react-redux'

export default function AnnouncementTile({id, type, content, date, userId, byAdmin, getAnnouncments}) {
  const { getAccessTokenWithPopup, user } = useAuth0();
  let isAdmin = useSelector((state) => state.user.isAdmin);
  const adminClass = byAdmin ? 'font-bold' : '';
  const bgClass = type === 'Info' ? 'border-sky-300 bg-sky-200' :
    type === 'Warning' ? 'border-yellow-300 bg-yellow-200' : 
    type === 'Request' ? 'border-green-300 bg-green-200' :
    'border-gray-300 bg-gray-200';

const deleteAnnouncement = async () =>{
  const token = await getAccessTokenWithPopup({
    audience: `https://users-api.com`,
  });

  axiosClient.defaults.headers.common['Authorization'] = "Bearer " + token;
  console.log(id)
  axiosClient.delete('/announcements/delete/' + id)
    .then(function () {
      alert("Deleted successfully")
      getAnnouncments();
    })
    .catch(function (error) {
      console.log(error);
      alert("Error deleting announcement: " + error.code)
    });
}

function trimAuth0Id(str){
  return str.substring(str.indexOf("|") + 1);
}

  return (
    <div className={`flex flex-col rounded-lg ${bgClass} shadow-md p-4 m-4`}>
      <div className={`flex flex-row ${adminClass} items-center`}>
        <div className="font-bold text-xl">{type}</div>
        {byAdmin && 
         <div className="ml-2 px-1 border border-black rounded-lg text-xs">Admin</div>
        }
        {(trimAuth0Id(user.sub) === userId || isAdmin) &&
        <button onClick={deleteAnnouncement} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg ml-auto text-sm">Delete</button>
        }
      </div>
      <hr class="bg-gray-400 mt-2 border-1 "/>
      <div className="p-2 text-base text-start">{content}</div>
      <div className="px-2 text-sm text-start font-light">{new Date(Date.parse(date)).toLocaleString()}</div>
    </div>
  )
}
