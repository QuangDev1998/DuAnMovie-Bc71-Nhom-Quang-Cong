import { createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "../service/userService";
export let loginActionService = createAsyncThunk(
  "userSlice/loginActionService",
  async (dataForm) => {
    let result = await userService.loginAction(dataForm);
    return result.data.content;
  }
);
