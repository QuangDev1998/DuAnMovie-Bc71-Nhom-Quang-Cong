import React from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";

export default function Header() {
  let navigate = useNavigate();
  let loginData = useSelector((state) => state.userSlice.loginData);
  let renderLoginOut = () => {
    if (loginData) {
      return (
        <Dropdown
          menu={{
            items,
          }}
          trigger={["hover"]}
        >
          <a onClick={(e) => e.preventDefault()}>
            <div className="flex space-x-2">
              <strong>{loginData.taiKhoan}</strong>
              <UserOutlined
                style={{
                  fontSize: "24px",
                  borderRadius: "50%",
                  borderColor: "black",
                  borderWidth: "2px",
                }}
              />
            </div>
          </a>
        </Dropdown>
      );
      // <div>

      {
        /* </div> */
      }
    } else {
      return (
        <div className="flex space-x-2 ">
          <button
            onClick={() => {
              window.location.href = "/login";
            }}
            type="button"
            className=" py-1 px-3 bg-blue-600 rounded text-white"
          >
            {" "}
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            type="button"
            className=" py-1 px-3 bg-green-600 rounded text-white"
          >
            {" "}
            Register
          </button>
        </div>
      );
    }
  };
  // logout function
  let handleLogout = () => {
    localStorage.removeItem("USER_LOGIN");
    window.location.href = "/";
  };
  // Dropdown data
  const items = [
    {
      label: (
        <a
          onClick={() => {
            if (loginData.maLoaiNguoiDung === "QuanTri") {
              navigate("/admin/acc-info");
            } else {
              navigate("/acc-info");
            }
          }}
        >
          Account info
        </a>
      ),
      key: "0",
    },
    {
      label: <a onClick={handleLogout}>Logout</a>,
      key: "1",
    },
  ];

  return (
    <div className="sticky top-0 z-50">
      <div className="bg-white flex justify-between py-5 px-2 items-center border-2 ">
        <NavLink to="/" className="text-red-600 font-bold text-2xl ">
          Cinema
        </NavLink>
        <div className="">{renderLoginOut()}</div>
      </div>
    </div>
  );
}
