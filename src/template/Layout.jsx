import React from "react";
import Header from "../component/Header/Header";
import Slider from "../component/Slider/Slider";

export default function Layout({ content }) {
  return (
    <div>
      <Header />

      {content}
    </div>
  );
}
