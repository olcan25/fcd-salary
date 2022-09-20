import { useRoutes } from "react-router-dom";
import EmployeeCreate from "../views/employee/EmployeeCreate";
import EmployeeTable from "../views/employee/EmployeeTable";
import Home from "../views/Home";
import CompanyTable from "../views/company/CompanyTable";
import EmployeeEdit from "../views/employee/EmployeeEdit";
import CompanyCreate from "../views/company/CompanyCreate";
import CompanyEdit from "../views/company/CompanyEdit";
import SalaryHeadCreate from "../views/salary/create/SalaryHeadCreate";
import SalaryHeadUpdate from "../views/salary/update/SalaryHeadUpdate";
import SalaryTable from '../views/salary/SalaryTable';

export default function Routers() {
  let element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/employees",
      element: <EmployeeTable />,
    },
    {
      path: "/employees/create",
      element: <EmployeeCreate />,
    },
    {
      path: "/employees/edit/:id",
      element: <EmployeeEdit />,
    },
    {
      path: "/companies",
      element: <CompanyTable />,
    },
    {
      path: "/companies/create",
      element: <CompanyCreate />,
    },
    {
      path: "/companies/edit/:id",
      element: <CompanyEdit />,
    },
    {
      path: "/salaries/create",
      element: <SalaryHeadCreate />,
    },
    {
      path: "/salaries/edit/:id",
      element: <SalaryHeadUpdate />,
    },
    {
      path: "/salaries",
      element: <SalaryTable />,
    },
  ]);
  return element;
}
