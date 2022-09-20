function TableHead(props) {
  return (
    <thead className="text-lg text-white uppercase bg-indigo-600 dark:bg-gray-700 dark:text-gray-200">
      <tr>
        <th className="py-3 px-6 text-center">Sira No</th>
        {props.headers.map((header) => (
          <th className="py-3 px-6 text-center" key={header}>
            {header}
          </th>
        ))}
         <th className="py-3 px-6 text-center"></th>
      </tr>
    </thead>
  );
}

export default TableHead;
