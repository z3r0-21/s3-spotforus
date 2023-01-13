import React from 'react'
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <Link to="/dashboard">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        Enter
      </button>
    </Link>
  )
}
