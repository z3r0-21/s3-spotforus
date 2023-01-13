import React, { useState } from 'react';
import { useEffect } from 'react';
import { axiosClient } from "../api/AxiosClient";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { getAccessTokenWithPopup } = useAuth0();

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const searchResults = users.filter(user =>
      user.email.includes(searchTerm) || user.username.includes(searchTerm)
    );
    setFilteredUsers(searchResults);
  }, [searchTerm, users]);

  const getUsers = async () =>{
    const token = await getAccessTokenWithPopup({
      audience: `https://users-api.com`,
      scope: "crud:all",
    });

    axiosClient.defaults.headers.common['Authorization'] = "Bearer " + token;

    axiosClient.get('/users/get/all')
    .then(function (response) {
        setUsers(response.data)
      })
    .catch(function (error) {
        alert("Error: " + error.code)
    });
  }
  
  return (
    <div className="my-2">
      <div className="flex items-center mx-2 mb-4">
        <input
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Search by email or username"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-scroll">
        <table className="w-full text-left table-collapse">
          <thead>
            <tr>
              <th className="py-4 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 border-b border-gray-300">Nickname</th>
              <th className="py-4 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 border-b border-gray-300">Email</th>
              <th className="py-4 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 border-b border-gray-300">Is Admin</th>
              <th className="py-4 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 border-b border-gray-300">Actions</th>     
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="py-4 px-6 border-b border-gray-200">{user.username}</td>
                <td className="py-4 px-6 border-b border-gray-200">{user.email}</td>
                <td className="py-4 px-6 border-b border-gray-200">{user.admin.toString()}</td>
                <td className="py-4 px-6 border-b border-gray-200">
                  <Link to="/editUser"  state={{ data: user }}>
                    <button className="px-3 py-2 rounded-full text-sm font-semibold text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageUsersPage;
