import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getEmployees,
    getEmployee,
    createEmployee,
    deleteEmployee,
    updateEmployee,
} from "../../utils/services/employee";

export const fetchEmployees = createAsyncThunk(
    "employee/fetchEmployees",
    async () => {
        const employees = await getEmployees();
        return employees;
    }
);

export const fetchEmployee = createAsyncThunk(
    "employee/fetchEmployee",
    async (id) => {
        const employee = await getEmployee(id);
        return employee;
    }
);

export const addEmployee = createAsyncThunk(
    "employee/addEmployee",
    async (employee) => {
        const newEmployee = await createEmployee(employee);
        return newEmployee;
    }
);

export const removeEmployee = createAsyncThunk(
    "employee/removeEmployee",
    async (id) => {
        await deleteEmployee(id);
        return id;
    }
);

export const changeEmployee = createAsyncThunk(
    "employee/changeEmployee",
    async (employee) => {
        const changedEmployee = await updateEmployee(employee);
        return changedEmployee;
    }
);

const employeeSlice = createSlice({
    name: "employee",
    initialState: {
        employees: [],
        employee: {},
        status: null,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [fetchEmployees.pending]: (state, action) => {
            state.status = "loading";
        },
        [fetchEmployees.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.employees = action.payload;
        },
        [fetchEmployees.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
        [fetchEmployee.pending]: (state, action) => {
            state.status = "loading";
        },
        [fetchEmployee.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.employee = action.payload;
        },
        [fetchEmployee.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
        [addEmployee.pending]: (state, action) => {
            state.status = "loading";
        },
        [addEmployee.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.employees = [...state.employees, action.payload];
        },
        [addEmployee.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
        [removeEmployee.pending]: (state, action) => {
            state.status = "loading";
        },
        [removeEmployee.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.employees = state.employees.filter(
                (employee) => employee.id !== action.payload
            );
        },
        [removeEmployee.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
        [changeEmployee.pending]: (state, action) => {
            state.status = "loading";
        },
        [changeEmployee.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.employees = state.employees.map((employee) =>
                employee.id === action.payload.id ? action.payload : employee
            );
        },
        [changeEmployee.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
    },
});


export default employeeSlice.reducer;