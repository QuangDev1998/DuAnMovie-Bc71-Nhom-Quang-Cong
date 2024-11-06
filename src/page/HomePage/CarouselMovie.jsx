import React from "react";
import { Carousel } from "antd";
import { useEffect, useState } from "react";
import { movieService } from "../../service/userService";
import { useNavigate } from "react-router-dom";
import SelectMovie from "./SelectMovie";
const contentStyle = {
  // height: "400px",
  // color: "#DC2626",
  // lineHeight: "160px",
  // textAlign: "center",
  backgroundPosition: "center",
  backgroudSize: "cover",
  backgroudRepeat: "no-repeat",
};
export default function CarouselMovie() {
  const [movieArr, setMovieArr] = useState([]);

  useEffect(() => {
    movieService
      .layDanhSachBanner()
      .then((result) => {
        setMovieArr(result.data.content);
      })
      .catch((err) => {});
  }, []);
  let renderMovie = () => {
    return movieArr.map((phim, index) => {
      return (
        <div
          key={index}
          className="h-screen"
          // style={{ ...contentStyle, backgroundImage: `url(${phim.hinhAnh})` }}
        >
          <img className="w-full h-full" src={phim.hinhAnh} alt="" />
        </div>
      );
    });
  };

  return (
    <div>
      <Carousel dotPosition="left" autoplay draggable>
        {renderMovie()}
      </Carousel>
      <SelectMovie />
    </div>
  );
}
