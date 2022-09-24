import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCompanies,
  getCompany,
  createCompany,
  deleteCompany,
  updateCompany,
} from "../../utils/services/company";

export const fetchCompanies = createAsyncThunk(
  "company/fetchCompanies",
  async () => {
    const companies = await getCompanies();
    return companies;
  }
);

export const fetchCompany = createAsyncThunk(
  "company/fetchCompany",
  async (id) => {
    const company = await getCompany(id);
    return company;
  }
);

export const addCompany = createAsyncThunk(
  "company/addCompany",
  async (company) => {
    const newCompany = await createCompany(company);
    return newCompany;
  }
);

export const removeCompany = createAsyncThunk(
  "company/removeCompany",
  async (id) => {
    await deleteCompany(id);
    return id;
  }
);
export const changeCompany = createAsyncThunk(
  "company/changeCompany",
  async (company) => {
    const changedCompany = await updateCompany(company);
    return changedCompany;
  }
);

const companySlice = createSlice({
  name: "company",
  initialState: {
    companies: [],
    company: {},
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchCompanies.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchCompanies.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.companies = action.payload;
    },
    [fetchCompanies.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [fetchCompany.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchCompany.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.company = { ...action.payload };
    },
    [fetchCompany.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addCompany.pending]: (state, action) => {
      state.status = "loading";
    },
    [addCompany.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.companies = [...state.companies, action.payload];
    },
    [addCompany.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [removeCompany.pending]: (state, action) => {
      state.status = "loading";
    },
    [removeCompany.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.companies = state.companies.filter(
        (company) => company.id !== action.payload
      );
    },
    [removeCompany.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [changeCompany.pending]: (state, action) => {
      state.status = "loading";
    },
    [changeCompany.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.companies = state.companies.map((company) =>
        company.id === action.payload.id ? action.payload : company
      );
    },
    [changeCompany.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default companySlice.reducer;


