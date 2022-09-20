import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import appAxios from "../../utils/appAxios";

const keys = ["firstName", "lastName", "nationalId", "salary"];
const headers = ["Ad", "Soyad", "Kosova Numarasi", "Maas"];
const header = "Calisanlar";
const link = "employees";

const EmployeeTable = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await appAxios.get(`/employees`);
    setData(data);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Table
      data={data}
      keys={keys}
      headers={headers}
      header={header}
      link={link}
    />
  );
};

export default EmployeeTable;
