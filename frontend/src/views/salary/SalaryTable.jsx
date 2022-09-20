import { useEffect, useState } from "react";
import appAxios from "../../utils/appAxios";
import Table from "../../components/Table/Table";
import ReactDatePicket from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SalaryTable = () => {
  const keys = [
    "companyName",
    "month",
    "year",
    "employeeCount",
    "totalNetSalary",
    "totalGrossSalary",
    "totalEmployeeContribute",
    "totalEmployerContribute",
    "totalTaxSalary",
    "totalSalary",
  ];
  const headers = [
    "Şirket Adı",
    "Ay",
    "Yil",
    "İşçi Sayı",
    "Net Maaş",
    "Brüt Maaş",
    "İşçi Katkisi",
    "İşverən Katkisi",
    "Vergi",
    "Toplam Gider",
  ];
  const header = "Maaşlar Listesi";
  const link = "salaries";
  const [data, setData] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [date, setDate] = useState(new Date());
  const getSalary = async () => {
    const { data } = await appAxios.get("/salaries");
    setData(data);
  };

  const getCompanies = async () => {
    const { data } = await appAxios.get("/companies");
    setCompanies(data);
  };

  const getSalariesByCompanyId = async (id) => {
    const { data } = await appAxios.get("/salaries/companies/" + id);
    setData(data);
  };

  const getSalariesByDate = async (date) => {
    setDate(date);
    const {data} = await appAxios.get('/salaries',{params:{month:date.getMonth() + 1, year:date.getFullYear()}});
    setData(data);
  };

  useEffect(() => {
    getCompanies();
    getSalary();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        <select
          onChange={(e) => getSalariesByCompanyId(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="0">Şirket Seçiniz</option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>

        <ReactDatePicket
          className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholderText="Tarih Secin"
          dateFormat="MM/yyyy"
          showMonthYearPicker
          onChange={(date) =>getSalariesByDate(date)}
          selected={date}
        />
      </div>
      <Table
        data={data}
        keys={keys}
        headers={headers}
        header={header}
        link={link}
      />
    </div>
  );
};

export default SalaryTable;
