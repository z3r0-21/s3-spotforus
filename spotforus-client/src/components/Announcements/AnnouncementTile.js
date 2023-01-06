import React, { useState, useEffect } from 'react'
import { axiosClient } from "../../api/AxiosClient";
import { useAuth0 } from "@auth0/auth0-react";

export default function AnnouncementTile({id, type, content, date, userId, byAdmin, getAnnouncments}) {
  const { getAccessTokenWithPopup, user } = useAuth0();
  let style;

switch (type) {
  case "Info":
    style = "border-sky-300 bg-sky-200";
    break;
  case "Warning":
    style = "border-yellow-300 bg-yellow-200";
    break;
  case "Request":
    style = "border-green-300 bg-green-200";
    break;
  default:
    style="border-gray-300 bg-gray-200";   
}

const deleteAnnouncement = async () =>{
  const token = await getAccessTokenWithPopup({
    audience: `https://users-api.com`,
    scope: "crud:all",
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
    <div className={`flex flex-col ${style} rounded-lg border-2 md:my-4 md:mx-10 sm:my-3 sm:mx-8 my-2 mx-4 text-left sm:px-4 px-2`}>
      <div>
        <span className="font-bold text-xl">{type}</span>
        {byAdmin === true &&
          <span className='ml-2 px-1 border border-black rounded-lg text-xs'>Admin</span>
        }
      </div>
      <hr className='border-gray-400'/>
      <div className='text-base'>{content}</div>
      <div className='font-light italic text-sm'>{new Date(Date.parse(date)).toLocaleString()}</div>
      {trimAuth0Id(user.sub) === userId &&
        <button onClick={deleteAnnouncement}>delete</button>
      }
    </div>
  )
}
