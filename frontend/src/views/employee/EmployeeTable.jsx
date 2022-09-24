import { useEffect } from "react";
import Table from "../../components/Table/Table";
import { fetchEmployees, removeEmployee } from "../../store/employee/employeeSlice";
import { useDispatch, useSelector } from "react-redux";

const keys = ["firstName", "lastName", "nationalId"];
const headers = ["Ad", "Soyad", "Kosova Numarasi"];
const header = "Calisanlar";
const link = "employees";

const EmployeeTable = () => {
  const dispatch = useDispatch();
  const { employees, status, error } = useSelector((state) => state.employee);
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch, fetchEmployees]);

  return (
    <Table
      data={employees}
      keys={keys}
      headers={headers}
      header={header}
      link={link}
      dispatch={removeEmployee}
    />
  );
};

export default EmployeeTable;
