import { Link } from "react-router-dom";

function Header(props) {
  return (
    <>
      <div className="px-4 py-5 sm:px-6">
        <h1 className="text-2xl font-medium leading-6 text-gray-900 py-4">
          {props.header} Tablosu
        </h1>
        <Link to={`/${props.link}/create`}>
        <button
          className="inline-block rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-center font-medium text-white hover:bg-indigo-700"
        >
          Ekle
        </button>
        </Link>
      </div>
    </>
  );
}

export default Header;
