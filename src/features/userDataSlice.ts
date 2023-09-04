import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { UserInterface } from "../types/interface";

export interface IssueInitialState {
  data: UserInterface[];
  selectedData: string[];
}

const initialState: IssueInitialState = {
  data: [],
  selectedData: [],
};

export const dataManage = createSlice({
  name: "usersData",
  initialState,
  reducers: {
    getItem: (state, action) => {
      console.log(state.data, action.payload);
      state.data = [...state.data, action.payload];
      console.log(state.data);
    },
    selectItem: (state, action) => {
      console.log(state.data, action.payload);
      state.selectedData = [...state.selectedData, action.payload];
      console.log(state.selectedData);
    },
    deleteItem: (state) => {
      console.log(state.selectedData, "delete", state.data);
      state.selectedData.forEach((i) => {
        localStorage.removeItem(`user:${i}`);
      });
      // for (let i = 0; i < state.data.length; i++) {
      //   if (arr[i] === "splice") {
      //     let spliced = arr.splice(i, 1);
      //     console.log("Removed element: " + spliced);
      //     console.log("Remaining elements: " + arr);
      //   }
      // }
      console.log();

      state.selectedData.forEach((i) => {
        console.log(i);
      });
      state.data.forEach((i) => {
        console.log(i);
        // console.log(i.userData[0].username)
        // i.userData[0].username === state.selectedData;
      });
      console.log(state.selectedData, "delete", state.data);
    },
    clearAlltem: (state) => {
      localStorage.clear();
      state.data = [];
      console.log(state);
    },
  },
});

export const { getItem, clearAlltem, deleteItem, selectItem } =
  dataManage.actions;

export const selectData = (state: RootState) => state.dataManage.data;

export default dataManage.reducer;
