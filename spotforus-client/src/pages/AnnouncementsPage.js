import React, { useState, useEffect } from 'react'
import { getAllAnnouncements } from '../api/Announcements'

export default function AnnouncementsPage() {
  const[announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    getAllAnnouncements()
    .then(function(response){
      setAnnouncements(response.data)
    }); 
  });

  return (
    <div>dddd</div>
  )
}
