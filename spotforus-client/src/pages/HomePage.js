import React, {useEffect} from 'react'
import { Link } from "react-router-dom";

export default function HomePage() {
  useEffect(() => {
    console.log(window.location.href.includes("/home"))
  },)
  
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-6xl font-bold text-center">Welcome to spotforus!</h1>
      <Link to="/dashboard">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          Continue to the application
        </button>
      </Link>
    </div>
  )
}
