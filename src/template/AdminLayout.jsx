import React from "react";
import Header from "../component/Header/Header";
import Slider from "../component/Slider/Slider";

export default function AdminLayout({ content }) {
  return (
    <div>
      <Header />

      <Slider content={content} />
    </div>
  );
}
