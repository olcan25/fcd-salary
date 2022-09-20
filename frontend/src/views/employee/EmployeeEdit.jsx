import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import SubmitButton from "../../components/Button/SubmitButton";
import CustomInput from "../../components/Input/CustomInput";
import appAxios from "../../utils/appAxios";

const EmployeeEdit = () => {
  let params = useParams();
  let navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      id: params.id,
      firstName: "",
      lastName: "",
      nationalId: "",
      salary: 0,
    },
  });

  const getData = async () => {
    const { data } = await appAxios.get(`/employees/${params.id}`);
    setValue("firstName", data.firstName);
    setValue("lastName", data.lastName);
    setValue("nationalId", data.nationalId);
    setValue("salary", data.salary);
  };

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = async(data) => {
   let response = await appAxios.put("/employees", data);
    try{
        navigate("/employees");
    }
    catch(error){
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
        <SubmitButton name={"Duzenle"} />
      </form>
    </div>
  );
};

export default EmployeeEdit;
