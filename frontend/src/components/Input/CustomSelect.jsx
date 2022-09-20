import CustomLabel from "./CustomLabel";

const CustomSelect = (props) => {
  return (
    <>
      {props.inputName ? (
        <div className="mb-6">
          <CustomLabel inputName={props.inputName} />
          <Select register={props.register} options={props.options} />
        </div>
      ) : (
        <Select register={props.register} options={props.options} />
      )}
    </>
  );
};

export default CustomSelect;

const Select = (props) => {
  return (
    <select
      {...props.register}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option value="0">Seciniz</option>
      {props.options.map((item, index) => {
        return (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        );
      })}
    </select>
  );
};
