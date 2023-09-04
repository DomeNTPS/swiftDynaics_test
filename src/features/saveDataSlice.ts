import { createSlice } from "@reduxjs/toolkit";
import { DataType } from "../types/interface";

export interface IssueInitialState {
  data: DataType;
}

const initialState: IssueInitialState = {
  data: {
    key: "",
    dateOfBirth: "",
    gender: "",
    nameTitles: "",
    nationality: "",
    passport: "",
    salary: "",
    surname: "",
    telephone: {
      code: "",
      number: "",
    },
    username: "",
  },
};

export const saveData = createSlice({
  name: "usersData",
  initialState,
  reducers: {
    addItem: (state, action) => {
      console.log(state.data, action.payload);
      state.data = action.payload;
      console.log(state.data);
      localStorage.setItem(
        `user:${state.data.username}`,
        JSON.stringify(state.data)
      );
      console.log(state.data);
    },
  },
});

export const { addItem } = saveData.actions;

export default saveData.reducer;
