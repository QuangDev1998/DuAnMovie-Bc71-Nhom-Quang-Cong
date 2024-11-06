import React, { useEffect, useState } from "react";
import { http } from "../../service/config";
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
          onClick={() => navigate(`detail/${phim.maPhim}`)}
          hoverable
          cover={<img className="h-80" alt="example" src={phim.hinhAnh} />}
        >
          <Meta title={phim.tenPhim} />
        </Card>
      );
    });
  };
  return <div className="mt-14 grid grid-cols-6 gap-5">{renderMovie()}</div>;
}
