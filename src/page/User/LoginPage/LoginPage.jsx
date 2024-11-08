import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormLogin from "./FormLogin";
import bgImg from "../../../asset/movie-poster-bg.jpg";

export default function LoginPage() {
  const user = useSelector((state) => state.userSlice.loginData);
  const navigate = useNavigate();

  useEffect(() => {
    // Nếu người dùng đã đăng nhập, điều hướng về trang chủ
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="relative">
      {/* background image */}
      <div
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          filter: "blur(1px) brightness(30%)",
        }}
        className="h-screen w-screen z-0 fixed top-0 left-0"
      ></div>
      <div className="z-10 fixed top-0 left-0 h-screen w-screen flex justify-center items-center">
        <FormLogin />
      </div>
    </div>
  );
}
