import React from "react";
import FormLogin from "./FormLogin";
import bgImg from "../../../asset/movie-poster-bg.jpg";
export default function LoginPage() {
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
      <div className="z-10 fixed top-0 left-0 h-screen w-screen flex justify-center items-center ">
        <FormLogin />
      </div>
    </div>
  );
}

// flex justify-center items-center h-screen
