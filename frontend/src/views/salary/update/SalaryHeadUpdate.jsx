import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import CustomSelect from "../../../components/Input/CustomSelect";
import CustomInput from "../../../components/Input/CustomInput";
import appAxios from "../../../utils/appAxios";
import SalaryLineUpdate from "./SalaryLineUpdate";
import { yearOptions, monthOptions } from "../year-month-data/yeardata";
import { useParams, useNavigate } from "react-router-dom";

const SalaryHeadUpdate = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { register, control, setValue, handleSubmit } = useForm({
    defaultValues: {
      salaryHead: {
        companyId: 0,
        month: "",
        year: "",
      },
      salaryLines: [
        {
          employeeId: 0,
          netSalary: 0,
          grossSalary: 0,
          employeeContribute: 0,
          employerContribute: 0,
          taxSalary: 0,
          isPrimary: true,
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "salaryLines",
  });
  const [options, setOptions] = useState([]);
  const [salary, setSalary] = useState([]);

  const getCompanies = async () => {
    const response = await appAxios.get("/companies");
    return response.data.map((item) => {
      return {
        value: item.id,
        label: `${item.name}  ${item.tradeName}  ${item.uidNumber}  ${item.vatNumber}`,
      };
    });
  };

  const getSalary = async () => {
    const { data } = await appAxios.get(`/salaries/update/${params.id}`);
    const { salaryLines, company, ...salaryHead } = data;
    setValue("salaryHead", salaryHead);
    setValue("salaryLines", salaryLines);
  };

  useEffect(() => {
    getSalary();
    getCompanies().then((data) => {
      setOptions(data);
    });
  }, []);

  async function onSubmit(data) {
    let response = await appAxios.put("/salaries", data);
    try {
      navigate("/salaries");
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-3 gap-4">
        <div className="form-group mb-6">
          <CustomSelect
            register={register("salaryHead.companyId")}
            inputName={"Sirket Ismi"}
            options={options}
          />

          <div className="grid grid-cols-2">
            <CustomSelect
              register={register("salaryHead.month")}
              inputName={"Ay"}
              options={monthOptions}
            />
            <CustomSelect
              register={register("salaryHead.year")}
              inputName={"Yil"}
              options={yearOptions}
            />
          </div>
        </div>
      </div>

      <SalaryLineUpdate
        fields={fields}
        append={append}
        remove={remove}
        register={register}
        setValue={setValue}
      />
    </form>
  );
};

export default SalaryHeadUpdate;
