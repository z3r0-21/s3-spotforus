import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
      <button onClick={() => logout({ returnTo: "http://localhost:3000/landing" })} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Log out
      </button>
  );
};

export default LogoutButton;