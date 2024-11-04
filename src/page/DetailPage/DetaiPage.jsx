import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { movieService } from "../../service/userService";
import { Progress } from "antd";
export default function DetaiPage() {
  const [movieInfo, setMovieInfo] = useState({});
  let params = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    movieService
      .layThongTinPhim(params.id)
      .then((result) => {
        console.log(result);
        setMovieInfo(result.data.content);
        console.log(movieInfo);
      })
      .catch((err) => {});
  }, []);
  let renderThongTinPhim = () => {
    return (
      <div>
        <div className="flex items-center space-x-5 mb-5">
          <img className="h-80" src={movieInfo.hinhAnh} alt="" />
          <Progress
            type="circle"
            percent={movieInfo.danhGia * 10}
            format={() => `${movieInfo.danhGia} / 10d`}
          />
          <button onClick={() => navigate(`/booking/${params.id}`)}>
            Booking
          </button>
        </div>
        <p>{movieInfo.moTa}</p>
      </div>
    );
  };
  return renderThongTinPhim();
}
