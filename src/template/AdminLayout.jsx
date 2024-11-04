import React from "react";
import Header from "../Component/Header/Header";
import Slider from "../Component/Slider/Slider";
export default function AdminLayout({ content }) {
  return (
    <div>
      <Header />
      <Slider content={content} />
    </div>
  );
}
