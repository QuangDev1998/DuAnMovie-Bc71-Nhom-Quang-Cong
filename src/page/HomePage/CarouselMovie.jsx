import React from "react";
import { Carousel } from "antd";
import { useEffect, useState } from "react";
import { movieService } from "../../service/userService";
import { useNavigate } from "react-router-dom";
const contentStyle = {
  height: "400px",
  color: "#DC2626",
  lineHeight: "160px",
  textAlign: "center",
  backgroundPosition: "center",
  backgroudSize: "100%",
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
    return movieArr.map((phim) => {
      return (
        <div
          className=""
          style={{ ...contentStyle, backgroundImage: `url(${phim.hinhAnh})` }}
        >
          <img
            className="w-full h-85 object-cover rounded-lg"
            src={phim.hinhAnh}
            alt=""
          />
        </div>
      );
    });
  };

  return (
    <div>
      {" "}
      <Carousel autoplay>{renderMovie()}</Carousel>
    </div>
  );
}
