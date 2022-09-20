import appAxios from "../../utils/appAxios";
import { useLocation, useNavigate } from "react-router-dom";
import excelData from "../../utils/excel-service";

const TableData = (props) => {
  let navigate = useNavigate();
  const remove = async (id) => {
    const { data } = await appAxios.delete(props.link + "/" + id);
    try {
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const excel = async (id) => {
    const { data } = await appAxios.get(props.link + "/excel/" + id);
    // console.log(data);
    // await appAxios.post('http://localhost:3000', data);
    excelData(data);
  };

  const edit = (id) => {
    navigate("edit/" + id);
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="py-4 px-6 font-medium text-lg text-gray-900 whitespace-nowrap dark:text-white text-center">
        {props.index + 1}
      </td>
      {props.keys.map((key) => (
        <td
          className="py-4 px-6 font-medium text-lg text-gray-900 whitespace-nowrap dark:text-white text-center"
          key={key}
        >
          {props.data[key]}
        </td>
      ))}
      <td>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => remove(props.data.id)}
        >
          Sil
        </button>
        {
          // edit button
        }
        <button
          className="bg-yellow-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => edit(props.data.id)}
        >
          Düzenle
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => excel(props.data.id)}
        >
          E
        </button>
      </td>
    </tr>
  );
};

export default TableData;
