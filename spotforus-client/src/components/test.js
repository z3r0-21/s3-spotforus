import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loginAdmin, loginUser, joinHousehold, leaveHousehold, logout } from '../redux/userSlice'

export default function Test() {
    const loggedin = useSelector((state) => state.isLoggedIn)
    const dispatch = useDispatch()
  return (
    <button onClick={() => dispatch(joinHousehold())}>asdasd</button>
  )
}
