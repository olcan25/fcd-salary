import { configureStore } from '@reduxjs/toolkit'
import companyReducer from './company/companySlice'
import employeeReducer from './employee/employeeSlice'

export const store = configureStore({
  reducer: {
    company: companyReducer,
    employee: employeeReducer,
  },
})
