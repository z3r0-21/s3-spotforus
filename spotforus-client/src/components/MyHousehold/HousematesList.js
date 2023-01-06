import React from 'react';

function HousematesList({ users, maxTenants }) {
  return (
    <div className="bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 my-2">Housemates</h2>
      <ul className="list-none">
        {users.map((user) => (
          <li key={user.id} className="text-gray-700 mb-2">
            {user.username}
          </li>
        ))}
      </ul>
      <p className="text-gray-700 pb-2">
        {users.length}/{maxTenants} tenants
      </p>
    </div>
  );
}

export default HousematesList;
