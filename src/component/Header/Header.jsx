import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";

export default function Header() {
  let user = useSelector((state) => state.userSlice.dataLogin);
  console.log("user:", user);
  let handleLogout = () => {
    localStorage.removeItem("USER_LOGIN");
    window.location.href = "/login";
  };
  let handleGohome = () => {
    window.location.href = "/";
  };
  // let renderMenu = () => {
  //   if (user) {
  //     return (
  //       <>
  //         <strong className="text-xl mr-2">{user.hoTen}</strong>
  //         <button
  //           onClick={handleLogout}
  //           className="bg-white px-10 py-1 rounded border-2 text-red-600 border-red-600"
  //         >
  //           Logout
  //         </button>
  //       </>
  //     );
  //   } else {
  //     return (
  //       <>
  //         <NavLink
  //           to="/login"
  //           className="text-white px-10 py-2 rounded border-2 bg-red-600"
  //         >
  //           Login
  //         </NavLink>
  //       </>
  //     );
  //   }
  // };
  // return (
  //   <div className="">
  //     <div className="container h-20 flex justify-between items-center">
  //       <NavLink to="/" className="text-2xl font-bold text-red-600">
  //         CyberFlix
  //       </NavLink>
  //       <div>{renderMenu()}</div>
  //     </div>
  //   </div>
  // );
  return (
    <header className=" bg-white fixed w-full z-10 bg-opacity-90 ">
      <div className=" flex justify-between h-16 mx-auto">
        <a
          onClick={handleGohome}
          className="text-2xl self-center px-8 font-bold text-red-600"
        >
          Netflix
        </a>
        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <a
              // rel="noopener noreferrer"
              href="#"
              className="flex items-center px-4 font-semibold hover:text-red-600 transition"
            >
              Lịch Chiếu
            </a>
          </li>
          <li className="flex">
            <a
              // rel="noopener noreferrer"
              href="#"
              className="flex items-center px-4 font-semibold  hover:text-red-600 transition "
            >
              Cụm Rạp
            </a>
          </li>
          <li className="flex">
            <a
              // rel="noopener noreferrer"
              href="#"
              className="flex items-center px-4 font-semibold  hover:text-red-600 transition "
            >
              Ứng Dụng
            </a>
          </li>
        </ul>
        <div className="items-center flex-shrink-0 hidden lg:flex">
          <button
            onClick={handleLogout}
            className="self-center py-3 font-semibold rounded  hover:text-red-600 transition "
          >
            Đăng Nhập
          </button>
          <button
            onClick={handleLogout}
            className="self-center px-3 py-3 font-semibold rounded  hover:text-red-600 transition "
          >
            Đăng Xuất
          </button>
        </div>
        {/* <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 dark:text-gray-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button> */}
        {/* <div>{renderMenu()}</div> */}
      </div>
    </header>
  );
}
