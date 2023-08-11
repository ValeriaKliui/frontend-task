import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { fetchRacers } from "../services/fetchRacers";
import { Racer } from "../../types";

interface initialStateRacers {
  racers: Racer[];
  isLoading: true | false;
  error: string | undefined;
  currentPage: number;
}

const initialState: initialStateRacers = {
  racers: [],
  isLoading: true,
  error: undefined,
  currentPage: 1,
};

export const racersSlice = createSlice({
  name: "racers",
  initialState,
  reducers: {
    increaseCurrentPage: (state) => {
      state.currentPage = state.currentPage + 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRacers.pending, (state) => {})
      .addCase(
        fetchRacers.fulfilled,
        (state, action: PayloadAction<Racer[]>) => {
          state.isLoading = false;
          state.racers = [...state.racers, ...action.payload];
        }
      )
      .addCase(fetchRacers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { increaseCurrentPage } = racersSlice.actions;

export default racersSlice.reducer;
