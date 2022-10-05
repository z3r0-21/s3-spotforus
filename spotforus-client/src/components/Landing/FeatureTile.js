import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function FeatureTile() {
    const [initialValue, setInitialValue] = useState("Initial value");


  return (
    <div className='outline outline-2 outline-blue-700 overflow-auto bg-blue-100 border-solid border-1 rounded-xl mx-2 my-4 max-w-xs'>
        <h1 className='my-3 text-xl font-medium'>Calendar</h1>
        <FontAwesomeIcon icon={['far', 'calendar-days']} size="4x"/>
        <p className='my-2 mx-2 text-base font-light leading-relaxed'>Keep track of tasks assigned to you and your housemates.</p>
    </div>
  )
}


// <div className='overflow-auto bg-blue-100 border-solid border-1 rounded outline outline-2 outline-blue-700'>
// <h1 className='my-3 text-xl font-bold'>Calendar</h1>
// <FontAwesomeIcon icon={['far', 'calendar-days']} size="4x"/>
// <p className='my-2 mx-2 text-base font-light leading-relaxed'>Keep track of tasks assigned to you and your housemates</p>
// </div>
