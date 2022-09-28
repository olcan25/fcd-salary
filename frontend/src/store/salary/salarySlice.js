import {
  getSalaries,
  getSalariesByCompanyId,
  getSalariesByDate,
  getSalaryByHeadId,
  createSalary,
  updateSalary,
  deleteSalary,
} from "../../utils/services/salary";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const fetchSalaries = createAsyncThunk(
  "salary/fetchSalaries",
  async () => {
    try {
      const salaries = await getSalaries();
      return salaries;
    } catch (err) {
      toast.error("Hata oluştu");
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
      toast.error("Hata oluştu");
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
      toast.error("Hata oluştu");
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
      toast.error("Hata oluştu");
    }
  }
);

export const addSalary = createAsyncThunk(
  "salary/addSalary",
  async (salary) => {
    try {
      const newSalary = await createSalary(salary);
      toast.success("Maaş başarıyla eklendi");
      return newSalary;
    } catch (err) {
      toast.error("Hata oluştu");
    }
  }
);

export const changeSalary = createAsyncThunk(
  "salary/changeSalary",
  async (salary) => {
    try {
      const updatedSalary = await updateSalary(salary);
      toast.success("Maaş başarıyla güncellendi");
      return updateSalary;
    } catch (err) {
      toast.error("Hata oluştu");
    }
  }
);

export const removeSalary = createAsyncThunk(
  "salary/removeSalary",
  async (id) => {
    try {
      const deletedSalary = await deleteSalary(id);
      toast.success("Maaş başarıyla silindi");
      return id;
    } catch (err) {
      toast.error("Hata oluştu");
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
      state.salary = { ...action.payload };
    },
    [fetchSalaryByHeadId.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addSalary.pending]: (state) => {
      state.status = "loading";
    },
    [addSalary.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.salaries = [...state.salaries, action.payload];
    },
    [addSalary.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [changeSalary.pending]: (state) => {
      state.status = "loading";
    },
    [changeSalary.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.salaries = state.salaries.map((salary) =>
        salary.id === action.payload.id ? action.payload : salary
      );
    },
    [changeSalary.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [removeSalary.pending]: (state) => {
      state.status = "loading";
    },
    [removeSalary.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.salaries = state.salaries.filter(
        (salary) => salary.id !== action.payload
      );
    },
    [removeSalary.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default salarySlice.reducer;
