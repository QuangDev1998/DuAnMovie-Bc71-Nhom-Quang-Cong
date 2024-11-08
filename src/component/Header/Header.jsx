import React from "react";
import { useSelector } from "react-redux";

export default function Header() {
  const user = useSelector((state) => state.userSlice.loginData);

  const handleLogout = () => {
    localStorage.removeItem("USER_LOGIN");
    window.location.href = "/login";
  };

  const handleGohome = () => {
    window.location.href = "/";
  };

  return (
    <header className=" bg-white fixed w-full z-20 bg-opacity-90 ">
      <div className=" flex justify-between h-16 mx-auto">
        <a
          onClick={handleGohome}
          className="text-2xl self-center px-8 font-bold text-red-600 cursor-pointer"
        >
          Netflix
        </a>
        <a href="">
          <i class="fi fi-brands-youtube"></i>
        </a>
        <ul className="items-stretch hidden space-x-3 lg:flex">
          {/* Các phần mục khác */}
          <li className="flex">
            <a className="flex items-center px-4 font-semibold hover:text-red-600 transition cursor-pointer">
              Lịch Chiếu
            </a>
          </li>
          <li className="flex">
            <a className="flex items-center px-4 font-semibold hover:text-red-600 transition cursor-pointer">
              Cụm Rạp
            </a>
          </li>
          <li className="flex">
            <a className="flex items-center px-4 font-semibold hover:text-red-600 transition cursor-pointer">
              Ứng Dụng
            </a>
          </li>
        </ul>

        {/* Kiểm tra trạng thái đăng nhập */}
        <div className="items-center flex-shrink-0 hidden lg:flex px-8">
          {user ? (
            <>
              <span className="self-center px-4 font-semibold">
                {user.taiKhoan}
              </span>
              <button
                onClick={handleLogout}
                className="self-center px-3 py-3 font-semibold rounded hover:text-red-600 transition"
              >
                Đăng Xuất
              </button>
            </>
          ) : (
            <button
              onClick={() => (window.location.href = "/login")}
              className="self-center py-3 px-8 font-semibold rounded hover:text-red-600 transition"
            >
              Đăng Nhập
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
