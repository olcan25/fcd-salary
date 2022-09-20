import NavButton from "./NavButton";
import NavLogo from "./NavLogo";
import { useState } from "react";

const Navbar = () => {
  const routerValues = [
    { name: "Home", path: "/" },
    { name: "Isciler", path: "/test" },
    { name: "Sirketler", path: "/test2" },
    { name: "Islemler", path: "/test2" },
  ];
  const [routers, setRouters] = useState(routerValues);
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <NavLogo />

            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {routers.map((x) => (
                  <NavButton router={x} key={x.name} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
