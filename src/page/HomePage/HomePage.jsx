import React from "react";
import ListMovie from "./ListMovie";
import TabMovie from "./TabMovie";

export default function HomePage() {
  return (
    <div>
      <TabMovie />
      <ListMovie />
    </div>
  );
}
