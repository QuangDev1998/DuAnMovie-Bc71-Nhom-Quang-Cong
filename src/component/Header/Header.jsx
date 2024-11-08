import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Header() {
  const user = useSelector((state) => state.userSlice.loginData);
  const cumRapRef = useRef(null);
  const handleLogout = () => {
    localStorage.removeItem("USER_LOGIN");
    window.location.href = "/login";
  };

  const handleGohome = () => {
    window.location.href = "/";
  };
  const handleGoToCumRap = () => {
    // Cuộn đến phần "Cụm Rạp" khi click
    const cumRapElement = document.getElementById("cumRapSection");
    if (cumRapElement) {
      cumRapElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  const handleGoToLichChieu = () => {
    // Cuộn đến phần "Cụm Rạp" khi click
    const lichChieuElement = document.getElementById("lichChieuSection");
    if (lichChieuElement) {
      lichChieuElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  const handleGoToUngDung = () => {
    // Cuộn đến phần "Cụm Rạp" khi click
    const ungDungElement = document.getElementById("ungDungSection");
    if (ungDungElement) {
      ungDungElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
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

        <ul className="items-stretch hidden space-x-3 lg:flex">
          {/* Các phần mục khác */}
          <li className="flex">
            <NavLink
              onClick={handleGohome}
              className="flex items-center px-4 font-semibold hover:text-red-600 transition cursor-pointer"
            >
              Trang Chủ
            </NavLink>
          </li>
          <li className="flex">
            <a
              onClick={handleGoToLichChieu}
              className="flex items-center px-4 font-semibold hover:text-red-600 transition cursor-pointer"
            >
              Lịch Chiếu
            </a>
          </li>
          <li className="flex">
            <a
              onClick={handleGoToCumRap}
              className=" flex items-center px-4 font-semibold hover:text-red-600 transition cursor-pointer"
            >
              Cụm Rạp
            </a>
          </li>
          <li className="flex">
            <a
              onClick={handleGoToUngDung}
              className="flex items-center px-4 font-semibold hover:text-red-600 transition cursor-pointer"
            >
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
