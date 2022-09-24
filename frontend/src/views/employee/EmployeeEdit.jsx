import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import SubmitButton from "../../components/Button/SubmitButton";
import CustomInput from "../../components/Input/CustomInput";
import { useDispatch } from "react-redux";
import {
  changeEmployee,
  fetchEmployee,
} from "../../store/employee/employeeSlice";

const EmployeeEdit = () => {
  let params = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, setValue } = useForm({});

  const getEmployee = async () => {
    const data = await dispatch(fetchEmployee(params.id));
    for (const [key, value] of Object.entries(data.payload)) {
      setValue(key, value);
    }
  };

  useEffect(() => {
    getEmployee();
  }, []);

  const onSubmit = async (data) => {
    await dispatch(changeEmployee(data));
    navigate("/employees");
  };

  return (
    <div className="grid grid-cols-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          register={register("firstName")}
          inputName={"Ad"}
          type={"text"}
        />
        <CustomInput
          register={register("lastName")}
          inputName={"Soyad"}
          type={"text"}
        />
        <CustomInput
          register={register("nationalId")}
          inputName={"Kosova Numarasi"}
          type={"text"}
        />
        <SubmitButton name={"Duzenle"} />
      </form>
    </div>
  );
};

export default EmployeeEdit;
