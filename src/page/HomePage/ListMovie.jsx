import React, { useEffect, useState } from "react";
import { movieService } from "../../service/userService";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { useNavigate } from "react-router-dom";

export default function ListMovie() {
  const [movieArr, setMovieArr] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    movieService
      .layDanhSachPhim()
      .then((result) => {
        setMovieArr(result.data.content);
      })
      .catch((err) => {});
  }, []);
  let renderMovie = () => {
    return movieArr.map((phim) => {
      return (
        <Card
          id="lichChieuSection"
          key={phim.maPhim}
          className="hover:bg-red-600 hover:scale-90 duration-300 transition"
          onClick={() => navigate(`detail/${phim.maPhim}`)}
          hoverable
          cover={
            <img
              className="h-80 w-full object-cover object-center"
              alt="example"
              src={phim.hinhAnh}
            />
          }
        >
          <Meta title={phim.tenPhim} />
        </Card>
      );
    });
  };
  return (
    <div className="container pt-20 mt-14 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
      {renderMovie()}
    </div>
  );
}
