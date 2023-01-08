import React, {useEffect, useState} from 'react'
import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Auth0Api } from "../api/Auth0Api";
import { axiosClient } from "../api/AxiosClient";
import { useNavigate } from 'react-router-dom';

const EditSelectedUserPage = ({ user }) => {
    const location = useLocation();
    const data = location.state?.data;
    const { getAccessTokenWithPopup } = useAuth0();
    const [logs, setLogs] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [admin, setAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getUserDetails();
        getRoles();
        getLoginLogs();
      }, [data]);

    const handleDelete = async() => {
        try {
            const token = await getAccessTokenWithPopup({
                audience: `https://users-api.com`,
                scope: "crud:all",
              });
        
              axiosClient.defaults.headers.common['Authorization'] = "Bearer " + token;
        
              axiosClient.delete('/users/delete/' + data.id)
              .then(function(response){
                Auth0Api.delete(`/users/auth0%7C${data.id}`)
                .then(response => {
                    alert("Deletion successful.")
                    navigate("/manageUsers")
                })
                .catch(error => {
                    alert("Axios error: " + error)
                });
              }); 
        } 
        catch (e) {
          console.log(e.message);
        }
    };
    
    const handleBlockUnblock = async () => {
          try {    
            let blocked = {blocked:!userDetails.blocked};

            Auth0Api.patch(`/users/auth0%7C${data.id}`, JSON.stringify(blocked))
            .then(response => {
                setUserDetails(response.data)
            })
            .catch(error => {
                alert("Axios error: " + error)
            });
        } 
        catch (e) {
          console.log(e.message);
        }
      };

    // const handlePromoteDemote = async () => {
    //     try {
    //         const token = await getAccessTokenWithPopup({
    //             audience: `https://users-api.com`,
    //             scope: "crud:all",
    //           });
        
    //           axiosClient.defaults.headers.common['Authorization'] = "Bearer " + token;
        
    //           axiosClient.delete('/users/delete/' + data.id)
    //           .then(function(response){
    //             Auth0Api.delete(`/users/auth0%7C${data.id}`)
    //             .then(response => {
    //                 alert("Deletion successful.")
    //                 navigate("/manageUsers")
    //             })
    //             .catch(error => {
    //                 alert("Axios error: " + error)
    //             });
    //           }); 
    //     } 
    //     catch (e) {
    //       console.log(e.message);
    //     }
    // };

  const getUserDetails = async() =>{    
    try {
        Auth0Api.get(`/users/auth0%7C${data.id}`)
        .then(response => {
            setUserDetails(response.data)
        })
        .catch(error => {
            alert("Axios error: " + error)
        });
    } 
    catch (e) {
      console.log(e.message);
    }
  }

  const getRoles = async() =>{    
    try {
        Auth0Api.get(`/users/auth0%7C${data.id}/roles`)
        .then(response => {
            response.data.forEach((item)=>{
                if(item.name === "admin"){
                    setAdmin(true)
                }
            })
        })
        .catch(error => {
            alert("Axios error: " + error)
        });
    } 
    catch (e) {
      console.log(e.message);
    }
  }

  const getLoginLogs = async() =>{    
    try {
        Auth0Api.get(`/users/auth0%7C${data.id}/logs`)
        .then(response => {
            const filteredLogs = response.data.filter(x => x.type === "s" || x.type === "fu" || x.type === "f");
            setLogs(filteredLogs);
        })
        .catch(error => {
            alert("Axios error: " + error)
        });
    } 
    catch (e) {
      console.log(e.message);
    }
  }

  return (
    <>
    <div className="grid grid-cols-2 gap-2 p-2">
        {userDetails.blocked &&
        <div className="col-span-2 flex items-center justify-between bg-yellow-500 p-4 rounded-lg shadow-lg">
        <p className="text-lg font-bold mr-4">This user has been blocked from signing in.</p>
        <button onClick={handleBlockUnblock} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Unblock
        </button>
        </div>
        }
        <div className="col-span-2 sm:col-span-1 flex flex-col bg-white rounded-lg shadow-lg">
            <div className="text-2xl font-bold text-gray-900 mb-2">
            Basic details
            </div>
            <div className="text-gray-700 mb-2">
            <span className="font-bold">Nickname:</span> {userDetails.nickname}
            </div>
            <div className="text-gray-700 mb-2">
            <span className="font-bold">Email:</span> {userDetails.email}
            </div>
            <div className="text-gray-700 mb-2">
            <span className="font-bold">User ID:</span> {data.id}
            </div>
            <div className="flex flex-row justify-center gap-2 mb-4">
                {!userDetails.blocked &&
                <button
                className="bg-white border-2 border-red-500 hover:bg-red-100 text-red-500 font-bold py-2 px-4 rounded-full mt-4"
                onClick={handleBlockUnblock}
                >
                Block sign-in
                </button>
                }
                <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-4"
                onClick={handleDelete}
                >
                Delete user account
                </button>
            </div>
        </div>
        <div className="col-span-2 sm:col-span-1 flex flex-col bg-white rounded-lg shadow-lg">
            <div className="text-xl font-bold text-gray-900 mb-2">
                Admin Status
            </div>
            {admin
            ?
            <>
            <div className="text-gray-700 mb-2">
            <span className="font-bold">Admin role:</span> Yes
            </div>
            <div className="mb-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    
                    >
                    Demote
                </button>
            </div>
            </>
            :
            <>
            <div className="text-gray-700 mb-2">
            <span className="font-bold">Admin role:</span> No
            </div>
            <div className="mb-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    
                    >
                    Promote
                </button>
            </div>
            </>
            }
        
        </div>
    <div className="p-4 bg-white rounded-lg shadow-lg col-span-2">
      <h2 className="text-2xl font-bold mb-4">Login logs</h2>
      <table className="w-full text-left table-collapse">
        <thead>
          <tr>
            <th className="py-4 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 border-b border-gray-300">Date</th>
            <th className="py-4 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 border-b border-gray-300">Type</th>
            <th className="py-4 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 border-b border-gray-300">IP</th>
            <th className="py-4 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 border-b border-gray-300">Location</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.log_id}>
                <td className="py-4 px-6 border-b border-gray-300">{new Date(log.date).toLocaleString()}</td>
                <td className="py-4 px-6 border-b border-gray-300">
                    {log.type === "s" &&
                    "Success Login"
                    }
                    {log.type === "f" &&
                    "Failed Login"
                    }
                    {log.type === "fu" &&
                    "Failed Login (Invalid Email/Username)"
                    }
                </td>
                <td className="py-4 px-6 border-b border-gray-300">{log.ip}</td>
                <td className="py-4 px-6 border-b border-gray-300">{log.location_info.city_name}, {log.location_info.country_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </>
  );
};

export default EditSelectedUserPage;