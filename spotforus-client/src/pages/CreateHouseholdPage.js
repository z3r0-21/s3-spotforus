import React, {useState} from 'react'
import { axiosClient } from "../api/AxiosClient";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';

export default function CreateHouseholdPage() {
    const { getAccessTokenWithPopup } = useAuth0();
    const navigate = useNavigate();

    const [householdDetails, setHouseholdDetails] = useState({
          postcode: "",
          houseNumber: null,
          houseName: "",
          details: ""
    });
    
    const [householdSettings, setHouseholdSettings] = useState({
        maxTenants: null,
        bathrooms: null,
        kitchens: null,
        otherRooms: null,
        trashCans: null
    });

    const handleChangeHd = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    
    setHouseholdDetails((prevalue) => {
        return {
        ...prevalue,            
        [name]: value
        }
    })
    }

    const handleChangeHs = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    
    setHouseholdSettings((prevalue) => {
        return {
        ...prevalue,            
        [name]: value
        }
    })
    }

    const createHousehold = async () =>{
        const token = await getAccessTokenWithPopup({
        audience: `https://users-api.com`,
        scope: "crud:all",
        });

        axiosClient.defaults.headers.common['Authorization'] = "Bearer " + token;

        const newHousehold = {
            householdDetails,
            householdSettings,
            tenants: [],
            joinCodes: []
          }

        axiosClient.post('/household/add', JSON.stringify(newHousehold))
        .then(function (response) {
            alert("Created successfully.")
            navigate('/manageHouseholds')
        })
        .catch(function (error) {
            console.log(error);
            alert("Error creating new household: " + error.code)
        });
    }



  return (
    <div className='flex flex-col gap-1 m-2'>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="postcode">
            Postcode:
            </label>
            <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="postcode"
            name="postcode"
            onChange={handleChangeHd}
            required
            />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="houseNumber">
            House number:
            </label>
            <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="houseNumber"
            name="houseNumber"
            onChange={handleChangeHd}
            required
            />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="houseName">
            House name:
            </label>
            <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="houseName"
            name="houseName"
            onChange={handleChangeHd}
            required
            />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="houseName">
            Additional details:
            </label>
            <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="details"
            name="details"
            onChange={handleChangeHd}
            required
            />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maxTenants">
            Max tenants:
            </label>
            <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            id="maxTenants"
            name="maxTenants"
            min="1" max="50"
            onChange={handleChangeHs}
            required
            />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bathrooms">
            Bathrooms:
            </label>
            <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            id="bathrooms"
            name="bathrooms"
            min="1" max="50"
            onChange={handleChangeHs}
            required
            />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="kitchens">
            Kitchens:
            </label>
            <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            id="kitchens"
            name="kitchens"
            min="1" max="20"
            onChange={handleChangeHs}
            required
            />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="trashCans">
            Trashcans:
            </label>
            <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            id="trashCans"
            name="trashCans"
            min="0" max="20"
            onChange={handleChangeHs}
            required
            />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otherRooms">
            Other rooms:
            </label>
            <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            id="otherRooms"
            name="otherRooms"
            min="0" max="20"
            onChange={handleChangeHs}
            required
            />
        </div>
        <button onClick={createHousehold} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Submit
        </button>
    </div>
  )
}
