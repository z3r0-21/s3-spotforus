import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";


export default function ListItem({id, postCode, houseNumber, houseName, currentTenants, maxTenants}) {
  return (
    <li className="flex flex-row gap-4 justify-start py-2 px-4 mx-2 text-base border-2 rounded-lg hover:border-4 divide-x-2 divide-gray-300" key={id}>
      <span className='font-bold'>{postCode} {houseNumber}</span>
      <span className='px-2'>
        <span>{houseName}</span>
        <span className='pl-4 pr-2 text-gray-500'>
          <FontAwesomeIcon icon={['fas', 'users']}/>
        </span>
        <span>{currentTenants}/{maxTenants}</span>
      </span>
      <span className='ml-auto px-2' >
        <Link to="/dashboard">
          <FontAwesomeIcon icon={['fas', 'pen-to-square']}/>
        </Link>
        <FontAwesomeIcon className='pl-2 text-red-600' icon={['fas', 'trash']}/>
      </span>

    </li>
  )
}
