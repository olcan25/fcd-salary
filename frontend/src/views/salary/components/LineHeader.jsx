const LineHeader = () => {
  return (
    <>
      <tr>
        <th scope="col" className="py-3 px-6">
          Calisanlar
        </th>
        <th scope="col" className="py-3 px-6">
          Net Maas
        </th>
        <th scope="col" className="py-3 px-6">
          Brut Maas
        </th>
        <th scope="col" className="py-3 px-6">
          Isci Kontribute
        </th>
        <th scope="col" className="py-3 px-6">
          Isveren Kontribute
        </th>
        <th scope="col" className="py-3 px-6">
          Isci Vergi
        </th>
        {/* <th scope="col" className="py-3 px-6">
            Primar Mi?
          </th> */}
        <th scope="col" className="py-3 px-6">
        </th>
      </tr>
    </>
  );
};

export default LineHeader;
