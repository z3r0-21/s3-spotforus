import React from 'react'

export default function FilterRow({name, values, labels, handleChange}) {
  return (
    <>  
    <div className='m-2'>
        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-400 sm:flex" onChange={handleChange}>
        {values.map((value, index) => (
            <li className="w-full rounded-lg border-b border-gray-200 sm:border-b-0 sm:border-r">
                <div className="flex items-center pl-3">
                    {index === 0
                    ? <input id={`${labels[index]}-radio`} type="radio" value={value} name={name} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" defaultChecked/>
                    : <input id={`${labels[index]}-radio`} type="radio" value={value} name={name} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"/>
                    }
                    <label for={`${labels[index]}-radio`} className="py-3 ml-2 w-full text-sm font-medium text-black">{labels[index]}</label>
                </div>
            </li>
        ))}
        </ul>
    </div>
    </>
  )
}
