import { configureStore } from '@reduxjs/toolkit'
import companyReducer from './company/companySlice'
import employeeReducer from './employee/employeeSlice'
import salaryReducer from './salary/salarySlice'

export const store = configureStore({
  reducer: {
    company: companyReducer,
    employee: employeeReducer,
    salary: salaryReducer,
  },
  devTools:true
})
