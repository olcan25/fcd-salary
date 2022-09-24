import Header from "./Header";
import TableData from "./TableData";
import TableHead from "./TableHead";

const Table = (props) => {
  return (
    <div className="container mx-auto px-4">
      <Header header={props.header} link={props.link} />
      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <TableHead headers={props.headers} />
          <tbody>
            {props.data.map((item,index) => (
              <TableData data={item} key={item.id} keys={props.keys} index={index} link={props.link} dispatch={props.dispatch} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
