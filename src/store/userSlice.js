import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await fetch("https://randomuser.me/api/");
  const data = await response.json();
  const name =
    data.results && data.results[0]
      ? `${data.results[0].name.first} ${data.results[0].name.last}`
      : "Unknown";
  return name;
});

const initialState = {
  name: "No user",
  status: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "complete";
        state.name = action.payload;
      });
  },
});

export const selectUserName = (state) => state.user.name;
export const selectUserFetchStatus = (state) => state.user.status;
export default userSlice.reducer;
