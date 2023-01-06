import React from 'react';
import LeaveButton from './LeaveButton';

function HouseDetails({ houseName, postcode, details }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="relative w-full h-32">
        <iframe
            title="mapsFrame"
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.google.com/maps/embed/v1/place?q=${houseName}+${postcode}&zoom=16&key=AIzaSyBP1iCuHuydFCFfPYmVVoO3pD83XoWcHDI`}
            allowFullScreen
        />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mt-4">{houseName}</h2>
      <p className="text-gray-700">{postcode}</p>
      <p className="text-gray-700">{details}</p>
      <LeaveButton/>
    </div>
 
  )}

  export default HouseDetails;
