import { configureStore } from '@reduxjs/toolkit'
import saveData  from 'features/saveDataSlice'
import dataManage from 'features/userDataSlice';

export const store = configureStore({
  reducer: {
    manage: saveData,
    dataManage: dataManage
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch