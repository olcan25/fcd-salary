import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import ReactDatePicket from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchCompanies } from "../../store/company/companySlice";
import {
  fetchSalaries,
  fetchSalariesByCompanyId,
  fetchSalariesByDate,
  removeSalary,
} from "../../store/salary/salarySlice";

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

  const dispatch = useDispatch();
  const { salaries, status, error } = useSelector((state) => state.salary);
  const { companies } = useSelector((state) => state.company);
  const [date, setDate] = useState(new Date());

  const getSalariesByDate = async (date) => {
    setDate(date);
    await dispatch(
      fetchSalariesByDate({
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      })
    );
  };

  useEffect(() => {
    dispatch(fetchCompanies());
    dispatch(fetchSalaries());
  }, [dispatch]);

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        <select
          onChange={(e) => dispatch(fetchSalariesByCompanyId(e.target.value))}
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
          onChange={(date) => getSalariesByDate(date)}
          selected={date}
        />
      </div>
      <Table
        data={salaries}
        keys={keys}
        headers={headers}
        header={header}
        link={link}
        dispatch={removeSalary}
      />
    </div>
  );
};

export default SalaryTable;
