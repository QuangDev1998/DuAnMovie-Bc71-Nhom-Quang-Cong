import { createSlice } from "@reduxjs/toolkit";
let loginJson = localStorage.getItem("USER_LOGIN");
const initialState = {
  loginData: loginJson ? JSON.parse(loginJson) : null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setLoginData: (state, action) => {
      state.loginData = action.payload;
    },
  },
});

export const { setLoginData } = userSlice.actions;

export default userSlice.reducer;
