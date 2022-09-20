const CustomLabel = (props) => {
  return (
    <label className="block mb-2 text-4xl font-medium text-gray-900 dark:text-gray-300">
      {props.inputName}
    </label>
  );
};


export default CustomLabel