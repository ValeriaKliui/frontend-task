import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Racer } from "../../types/index";

export const fetchRacers = createAsyncThunk<
  Racer[],
  number,
  {
    rejectValue: string;
  }
>("racers/fetchRacers", async (page, { rejectWithValue }) => {
  const url = `https://fkvm5j-8080.csb.app/racers?_page=${page}&_limit=50`;
  const response = await axios.get<Racer[]>(url);
  if (!response) {
    return rejectWithValue("Server Error!");
  }
  const data = response.data;
  return data;
});
