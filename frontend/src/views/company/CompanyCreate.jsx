import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../components/Button/SubmitButton";
import CustomInput from "../../components/Input/CustomInput";
import { useDispatch } from "react-redux";
import { addCompany } from "../../store/company/companySlice";
import SuccessToast from "../../utils/toast/SuccessToast";
import toast, { Toaster } from "react-hot-toast";

const CompanyCreate = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      tradeName: "",
      uidNumber: "",
      vatNumber: "",
    },
  });

  const onSubmit = async (data) => {
    await dispatch(addCompany(data));
    // try {
    //   toast.success("Company added successfully");
    //   navigate("/companies");
    // } catch (error) {
    //   toast.error("Error adding company");
    // }
    () => {
      toast.success("Company added successfully");
      // navigate("/companies");
    };
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
        <SubmitButton name={"Ekle"} />
      </form>
    </div>
  );
};

export default CompanyCreate;
