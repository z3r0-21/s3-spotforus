import React, { useState } from 'react'
import ListItem from './ListItem'

export default function List({data}) {
    const listItems = data.map((object) => (<ListItem id={object.id} postCode={object.householdDetails.postcode}currentTenants={object.tenants.length} 
    houseName={object.householdDetails.houseName} houseNumber={object.householdDetails.houseNumber} maxTenants={object.householdSettings.maxTenants}/>));
  return (
    <ul class="flex flex-col">
        <div>{listItems}</div>
    </ul>
  )
}
