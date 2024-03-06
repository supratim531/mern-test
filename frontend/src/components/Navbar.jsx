import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import RootContext from "../contexts/RootContext";

function Navbar() {
  const navigate = useNavigate();
  const rootContext = useContext(RootContext);

  return (
    <nav className="px-8 py-4 flex justify-between items-center bg-slate-200">
      <ul className="flex space-x-8">
        <li><NavLink to={'/'} className="">Home</NavLink></li>
        <li><NavLink to={"/employee-list"} className="">Employee List</NavLink></li>
      </ul>
      <div className="flex justify-between items-center gap-x-20">
        <div className=""><b>Welcome</b> {rootContext?.username}</div>
        <button onClick={() => {
          rootContext.setIsLogin(false);
          localStorage.clear();
          navigate("/login");
        }} className="px-4 py-1 rounded duration-200 hover:text-white hover:bg-red-600 bg-red-400">Logout</button>
      </div>
    </nav>
  )
}

export default Navbar;
