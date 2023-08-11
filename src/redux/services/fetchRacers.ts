import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Racer } from "../../types/index";

export const fetchRacers = createAsyncThunk<
  Racer[],
  undefined,
  {
    rejectValue: string;
  }
>("racers/fetchRacers", async (_, { rejectWithValue, getState }) => {
  const { racers } = getState();
  const url = `https://fkvm5j-8080.csb.app/racers?_sort=time&_order=asc&_page=${racers.currentPage}&_limit=50`;
  const response = await axios.get<Racer[]>(url);
  if (!response) {
    return rejectWithValue("Server Error!");
  }
  const data = response.data;
  return data;
});
