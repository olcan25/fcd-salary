import { useEffect } from "react";
import Table from "../../components/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies, removeCompany } from "../../store/company/companySlice";
import { Toaster } from "react-hot-toast";

const keys = ["name", "tradeName", "uidNumber", "vatNumber"];
const headers = ["Ad", "Ticari Ad", "UID Numarasi", "KDV Numarasi"];
const header = "Sirketler";
const link = "companies";


const CompanyTable = () => {
  const dispatch = useDispatch();
  const { companies, status, error } = useSelector((state) => state.company);
  useEffect(() => {
   dispatch(fetchCompanies());
  },[dispatch]);

  return (
    <div>
      <Table
        data={companies}
        keys={keys}
        headers={headers}
        header={header}
        link={link}
        dispatch={removeCompany}
      />
      <Toaster />
    </div>
  );
};

export default CompanyTable;
