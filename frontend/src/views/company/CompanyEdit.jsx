import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import SubmitButton from "../../components/Button/SubmitButton";
import CustomInput from "../../components/Input/CustomInput";
import appAxios from "../../utils/appAxios";

const CompanyEdit = () => {
  let params = useParams();
  let navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      id: params.id,
      name: "",
      tradeName: "",
      uidNumber: "",
      vatNumber: "",
    },
  });

  const getData = async () => {
    const { data } = await appAxios.get(`/companies/${params.id}`);
    setValue("name", data.name);
    setValue("tradeName", data.tradeName);
    setValue("uidNumber", data.uidNumber);
    setValue("vatNumber", data.vatNumber);
  };

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = async(data) => {
   let response = await appAxios.put("/companies", data);
    try{
        navigate("/companies");
    }
    catch(error){
        console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          register={register("name")}
          inputName={"Sirket Ismi"}
          type={"text"}
        />
        <CustomInput
          register={register("tradeName")}
          inputName={"Sirket Ticari Ismi"}
          type={"text"}
        />
        <CustomInput
          register={register("uidNumber")}
          inputName={"UID Numarasi"}
          type={"text"}
        />
        <CustomInput
          register={register("vatNumber")}
          inputName={"KDV Numarasi"}
          type={"number"}
        />
        <SubmitButton name={"Duzenle"} />
      </form>
    </div>
  );
};

export default CompanyEdit;
