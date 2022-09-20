import { Link } from "react-router-dom";

const NavButton = (props) => {
  return (
    <span>
      <Link
        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        to={props.router.path}
      >
        {props.router.name}
      </Link>
    </span>
  );
};

export default NavButton;
