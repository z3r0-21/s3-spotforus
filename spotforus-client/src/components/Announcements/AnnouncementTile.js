import React from 'react'

export default function AnnouncementTile({type, content, date, byAdmin}) {
let style;

switch (type) {
  case "info":
    style = "border-sky-300 bg-sky-200";
    break;
  case "warning":
    style = "border-yellow-300 bg-yellow-200";
    break;
  case "request":
    style = "border-green-300 bg-green-200";
    break;
  default:
    style="border-gray-300 bg-gray-200";   
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
    </div>
  )
}
