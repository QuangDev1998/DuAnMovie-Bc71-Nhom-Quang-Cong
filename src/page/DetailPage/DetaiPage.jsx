import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { movieService } from "../../service/userService";
import { Progress } from "antd";
import BookingPage from "../BookingPage/BookingPage";
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
        <div className="flex items-center space-x-5 mb-5 h-screen">
          <img className="h-80" src={movieInfo.hinhAnh} alt="" />
          <Progress
            type="circle"
            percent={movieInfo.danhGia * 10}
            format={() => `${movieInfo.danhGia} / 10d`}
          />
          {/* onClick={() => navigate(`/booking/${params.id}`)} */}
          <button>
            <a href="#bk1">Booking</a>
          </button>
        </div>
        <p>{movieInfo.moTa}</p>
        <div className="h-screen" id="bk1">
          <BookingPage />
        </div>
      </div>
    );
  };
  return renderThongTinPhim();
}
