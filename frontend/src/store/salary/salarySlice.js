import {
  getSalaries,
  getSalariesByCompanyId,
  getSalariesByDate,
    getSalaryByHeadId,
} from "../../utils/services/salary";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

export const fetchSalaries = createAsyncThunk(
  "salary/fetchSalaries",
  async () => {
    try {
      const salaries = await getSalaries();
      return salaries;
    } catch (err) {
      toast.error("Error fetching salaries");
    }
  }
);

export const fetchSalariesByCompanyId = createAsyncThunk(
  "salary/fetchSalariesByCompanyId",
  async (companyId) => {
    try {
      const salaries = await getSalariesByCompanyId(companyId);
      return salaries;
    } catch (err) {
      toast.error("Error fetching salaries");
    }
  }
);

export const fetchSalariesByDate = createAsyncThunk(
  "salary/fetchSalariesByDate",
  async (date) => {
    try {
      const salaries = await getSalariesByDate(date);
      return salaries;
    } catch (err) {
      toast.error("Error fetching salaries");
    }
  }
);

export const fetchSalaryByHeadId = createAsyncThunk(
    "salary/fetchSalaryByHeadId",
    async (headId) => {
        try {
            const salary = await getSalaryByHeadId(headId);
            return salary;
        } catch (err) {
            toast.error("Error fetching salary");
        }
    }
);

export const salarySlice = createSlice({
  name: "salary",
  initialState: {
    salaries: [],
    salary: {},
    status: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchSalaries.pending]: (state) => {
      state.status = "loading";
    },
    [fetchSalaries.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.salaries = action.payload;
    },
    [fetchSalaries.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [fetchSalariesByCompanyId.pending]: (state) => {
      state.status = "loading";
    },
    [fetchSalariesByCompanyId.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.salaries = action.payload;
    },
    [fetchSalariesByCompanyId.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [fetchSalariesByDate.pending]: (state) => {
      state.status = "loading";
    },
    [fetchSalariesByDate.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.salaries = action.payload;
    },
    [fetchSalariesByDate.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [fetchSalaryByHeadId.pending]: (state) => {
        state.status = "loading";
    },
    [fetchSalaryByHeadId.fulfilled]: (state, action) => {
        state.status = "succeeded";
        state.salary = action.payload;
    },
    [fetchSalaryByHeadId.rejected]: (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
    },
  },
});

export default salarySlice.reducer;
