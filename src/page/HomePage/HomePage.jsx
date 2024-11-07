import React from "react";
import ListMovie from "./ListMovie";
import TabMovie from "./TabMovie";
import CarouselMovie from "./CarouselMovie";
import Footer from "./Footer";

export default function HomePage() {
  return (
    <div>
      <CarouselMovie />
      <ListMovie />
      <TabMovie />
      <Footer />
    </div>
  );
}
