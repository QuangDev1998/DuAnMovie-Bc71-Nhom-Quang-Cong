import React from "react";
import Header from "../component/Header/Header";
import Footer from "../component/Footer/Footer";

export default function Layout({ content }) {
  return (
    <div>
      <Header />
      {content}
      <Footer />
    </div>
  );
}
