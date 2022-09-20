import CustomLabel from "./CustomLabel";

const CustomInput = (props) => {
  return (
    <>
      {props.inputName ? (
        <div className="mb-6">
          <CustomLabel inputName={props.inputName} />
          <input
            type={props.type}
            {...props.register}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      ) : (
        <input
          type={props.type}
          {...props.register}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      )}
    </>
  );
};

export default CustomInput;
