import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDate = (props) =>{
    <DatePicker
    selected={startDate}
    onChange={(date) => setStartDate(date)}
    dateFormat={props.dateFormat}
    showMonthYearPicker
    className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  />
}

export default CustomDate;