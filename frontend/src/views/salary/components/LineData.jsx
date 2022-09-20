import CustomSelect from "../../../components/Input/CustomSelect";
import NetSalaryCalculation from "../../../utils/salary-calculation/net-salary-calcultation";
import GrossSalaryCalculation from "../../../utils/salary-calculation/gross-salary-calculation";

const LineData = ({ fields, register, setValue, options, remove }) => {
  const netSalaryResult = (event, index) => {
    const netSalary = Number(event.target.value);
    let { contribute, grossSalary, taxSalary } =
      NetSalaryCalculation(netSalary);
    setValue(`salaryLines[${index}].employeeContribute`, contribute);
    setValue(`salaryLines[${index}].employerContribute`, contribute);
    setValue(`salaryLines[${index}].grossSalary`, grossSalary);
    setValue(`salaryLines[${index}].taxSalary`, taxSalary);
  };

  const grossSalaryResult = (event, index) => {
    const grossSalary = Number(event.target.value);
    let { contribute, netSalary, taxSalary } =
      GrossSalaryCalculation(grossSalary);
    setValue(`salaryLines[${index}].employeeContribute`, contribute);
    setValue(`salaryLines[${index}].employerContribute`, contribute);
    setValue(`salaryLines[${index}].netSalary`, netSalary);
    setValue(`salaryLines[${index}].taxSalary`, taxSalary);
  };

  return (
    <>
      {fields.map((field, i) => (
        <tr
          key={field.id}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <th
            scope="row"
            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            <CustomSelect
              register={register(`salaryLines.${i}.employeeId`)}
              options={options}
            />
          </th>
          <td className="py-4 px-6">
            <input
              type="text"
              {...register(`salaryLines.${i}.netSalary`)}
              onInput={(e) => netSalaryResult(e, i)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </td>
          <td className="py-4 px-6">
            <input
              type="text"
              {...register(`salaryLines.${i}.grossSalary`)}
              onInput={(e) => grossSalaryResult(e, i)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </td>
          <td className="py-4 px-6">
            <input
              type="number"
              {...register(`salaryLines.${i}.employeeContribute`)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              disabled
            />
          </td>
          <td className="py-4 px-6">
            <input
              type="number"
              {...register(`salaryLines.${i}.employerContribute`)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              disabled
            />
          </td>
          <td className="py-4 px-6">
            <input
              type="number"
              {...register(`salaryLines.${i}.taxSalary`)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              disabled
            />
          </td>
          <td className="py-4 px-6">
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium"
              onClick={() => remove(i)}
            >
              Sil
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default LineData;
