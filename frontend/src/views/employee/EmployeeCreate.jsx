import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../components/Button/SubmitButton";
import CustomInput from "../../components/Input/CustomInput";
import { useDispatch } from "react-redux";
import { addEmployee } from "../../store/employee/employeeSlice";

const EmployeeCreate = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      nationalId: "",
      salary: 0,
    },
  });

  const onSubmit = async (data) => {
    await dispatch(addEmployee(data));
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
        <SubmitButton name={"Ekle"} />
      </form>
    </div>
  );
};

export default EmployeeCreate;
