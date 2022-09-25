import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import CustomSelect from "../../../components/Input/CustomSelect";
import CustomInput from "../../../components/Input/CustomInput";
import appAxios from "../../../utils/appAxios";
import SalaryLineUpdate from "./SalaryLineUpdate";
import { yearOptions, monthOptions } from "../year-month-data/yeardata";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../../../store/company/companySlice";
import {
  changeSalary,
  fetchSalaryByHeadId,
} from "../../../store/salary/salarySlice";
import { Toaster } from "react-hot-toast";

const SalaryHeadUpdate = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const salary = useSelector((state) => state.salary.salary);

  const companies = useSelector((state) =>
    state.company.companies.map((item) => ({
      value: item.id,
      label: `${item.name}  ${item.tradeName}  ${item.uidNumber}  ${item.vatNumber}`,
    }))
  );

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
  useEffect(() => {
    dispatch(fetchSalaryByHeadId(params.id));
    dispatch(fetchCompanies());
  }, [dispatch]);

  useEffect(() => {
    const { salaryLines, company, ...salaryHead } = salary;
    setValue("salaryHead", salaryHead);
    setValue("salaryLines", salaryLines);
  }, [salary]);

  async function onSubmit(data) {
    await dispatch(changeSalary(data));
    setTimeout(() => {
      navigate("/salaries");
    }, 2000);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-3 gap-4">
        <div className="form-group mb-6">
          <CustomSelect
            register={register("salaryHead.companyId")}
            inputName={"Sirket Ismi"}
            options={companies}
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
          <Toaster />
    </form>

  );
};

export default SalaryHeadUpdate;
