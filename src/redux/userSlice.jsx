import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "../service/userService";
import { message } from "antd";
import { loginActionService } from "./action";

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
  extraReducers: (builder) => {
    builder.addCase(loginActionService.fulfilled, (state, action) => {
      state.loginData = action.payload;
      message.success("Login success");
    });
    builder.addCase(loginActionService.rejected, (state, action) => {
      message.error("Login fail");
    });
  },
});

export const { setLoginData } = userSlice.actions;

export default userSlice.reducer;
