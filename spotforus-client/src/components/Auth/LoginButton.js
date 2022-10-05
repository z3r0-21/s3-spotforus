import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
      <button onClick={() => loginWithRedirect({ returnTo: window.location.origin })} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Sign in/up
      </button>
);
};

export default LoginButton;