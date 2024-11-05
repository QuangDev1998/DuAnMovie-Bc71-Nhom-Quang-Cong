import React from "react";
import Header from "../component/Header/Header";
export default function Layout({ content }) {
  return (
    <div>
      <Header />
      {content}
    </div>
  );
}
