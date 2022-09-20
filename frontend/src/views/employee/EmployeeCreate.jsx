import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../components/Button/SubmitButton";
import CustomInput from "../../components/Input/CustomInput";
import appAxios from "../../utils/appAxios";

const EmployeeCreate = () => {
  let navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      nationalId: "",
      salary: 0,
    },
  });

  const onSubmit = async (data) => {
    let response = await appAxios.post("/employees", data);
    try {
      navigate("/employees");
    }
    catch (error) {
      console.log(error);
    }
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
        <CustomInput
          register={register("salary")}
          inputName={"Maas"}
          type={"number"}
        />
        <SubmitButton name={"Ekle"} />
      </form>
    </div>
  );
};

export default EmployeeCreate;
