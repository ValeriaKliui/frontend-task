import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import racersSlice from "../slices/racersSlice";

export const store = configureStore({
  reducer: { racers: racersSlice },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
