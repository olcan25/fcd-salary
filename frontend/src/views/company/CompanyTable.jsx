import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import appAxios from "../../utils/appAxios";

const keys = ["name", "tradeName", "uidNumber", "vatNumber"];
const headers = ["Ad", "Ticari Ad", "UID Numarasi", "KDV Numarasi"];
const header = "Sirketler";
const link = "companies";

const CompanyTable = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await appAxios.get(`/companies`);
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

export default CompanyTable;
