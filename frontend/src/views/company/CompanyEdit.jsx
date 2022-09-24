import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import SubmitButton from "../../components/Button/SubmitButton";
import CustomInput from "../../components/Input/CustomInput";
import { useDispatch } from "react-redux";
import { changeCompany, fetchCompany } from "../../store/company/companySlice";

const CompanyEdit = () => {
  let params = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, setValue } = useForm({});

  const getCompany = async () => {
    const data = await dispatch(fetchCompany(params.id));
    for (const [key, value] of Object.entries(data.payload)) {
      setValue(key, value);
    }
  };

  useEffect(() => {
    getCompany();
  }, []);

  const onSubmit = async (data) => {
    await dispatch(changeCompany(data));
    navigate("/companies");
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
          type={"text"}
        />
        <SubmitButton name={"Duzenle"} />
      </form>
    </div>
  );
};

export default CompanyEdit;
