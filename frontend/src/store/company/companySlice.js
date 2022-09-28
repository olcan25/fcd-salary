import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCompanies,
  getCompany,
  createCompany,
  deleteCompany,
  updateCompany,
} from "../../utils/services/company";
import { toast } from "react-toastify";


export const fetchCompanies = createAsyncThunk(
  "company/fetchCompanies",
  async () => {
    try{
      const companies = await getCompanies();
      return companies
    }catch(err){
      toast.error('Hata oluştu');
    }
  }
);

export const fetchCompany = createAsyncThunk(
  "company/fetchCompany",
  async (id) => {
    try{
      const company = await getCompany(id);
      return company;
    }catch(err){
      toast.error('Hata oluştu');
    }
  }
);

export const addCompany = createAsyncThunk(
  "company/addCompany",
  async (company) => {
    try{
      const newCompany = await createCompany(company);
      toast.success('Firma başarıyla eklendi');
      return newCompany;

    }catch(err){
      toast.error('Hata oluştu');
    }
  }
);

export const removeCompany = createAsyncThunk(
  "company/removeCompany",
  async (id) => {
    try{
      await deleteCompany(id);
      toast.success('Firma başarıyla silindi');
      return id;
    }catch(err){
      toast.error('Hata oluştu');
    }
  }
);
export const changeCompany = createAsyncThunk(
  "company/changeCompany",
  async (company) => {
    try{
      const updatedCompany = await updateCompany(company);
      toast.success('Firma başarıyla güncellendi');
      return updatedCompany;
    }catch(err){
      toast.error('Hata oluştu');
    }
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
