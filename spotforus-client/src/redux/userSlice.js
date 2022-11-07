import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  isHouseholdTenant: false,
  isAdmin: false,
  householdId: null
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
    joinHousehold: (state, action) => {
      state.isHouseholdTenant = true;
      state.householdId = action.payload;
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