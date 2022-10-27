import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  isHouseholdTenant: false,
  isAdmin: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginAdmin: (state) => {
      state.isLoggedIn = true;
      state.isAdmin = true;
    },
    loginUser: (state) => {
        state.isLoggedIn = true;
      },
    joinHousehold: (state) => {
    state.isHouseholdTenant = true;
    },
    leaveHousehold: (state) => {
    state.isHouseholdTenant = false;
    },
    logout: (state) => {
      state = initialState
    },
  },
})

export const { loginAdmin, loginUser, joinHousehold, leaveHousehold, logout } = userSlice.actions

export default userSlice.reducer