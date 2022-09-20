import { useState, useEffect } from "react";
import appAxios from "../../../utils/appAxios";
import LineHeader from "../components/LineHeader";
import LineData from "../components/LineData";

const SalaryLineUpdate = ({ fields, register, append, remove, setValue }) => {
  const getEmployees = async () => {
    const response = await appAxios.get("/employees");
    return response.data.map((item) => {
      return {
        value: item.id,
        label: `${item.firstName}  ${item.lastName}  ${item.nationalId}`,
      };
    });
  };
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getEmployees().then((data) => {
      setOptions(data);
    });
  }, []);

  return (
    <div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-12 ml-12"
      >
        Duzenle
      </button>
      <button
        type="button"
        className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          append({
            employeeId: 0,
            netSalary: 0,
            grossSalary: 0,
            employeeContribute: 0,
            employerContribute: 0,
            taxSalary: 0,
            isPrimary: true,
          });
        }}
      >
        Yeni Satir Ekle
      </button>

      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <LineHeader />
          </thead>
          <tbody>
            <LineData
              fields={fields}
              register={register}
              setValue={setValue}
              options={options}
              remove={remove}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalaryLineUpdate;
