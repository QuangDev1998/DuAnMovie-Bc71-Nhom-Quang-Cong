import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { movieService } from "../../service/userService";
import { Progress } from "antd";
import moment from "moment";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Tabs } from "antd";

export default function DetailPage() {
  const [movieInfo, setMovieInfo] = useState({});
  const [heThongRap, setHeThongRap] = useState([]);

  let params = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);

    movieService
      .layThongTinPhim(params.id)
      .then((result) => {
        setMovieInfo(result.data.content);
      })
      .catch((err) => {});

    movieService
      .layHeThongRap()
      .then((result) => {
        setHeThongRap(result.data.content);
      })
      .catch((err) => {});
  }, [params.id]);
  const handleMuaVeClick = () => {
    const tabsSection = document.getElementById("tabs-section");
    if (tabsSection) {
      tabsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating / 2);
    const halfStar = rating % 2 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-500" />);
    }
    if (halfStar) {
      stars.push(<FaStar key="half" className="text-yellow-500" />);
    }
    for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) {
      stars.push(<FaRegStar key={i} className="text-yellow-500" />);
    }
    return stars;
  };

  const getMovieShowtimes = () => {
    const filteredHeThongRap = heThongRap
      .map((heThongRap) => {
        // Lọc các cụm rạp có phim này
        const filteredCumRap = heThongRap.lstCumRap.filter((cumRap) =>
          cumRap.danhSachPhim.some((phim) => phim.maPhim === movieInfo.maPhim)
        );
        // Nếu có ít nhất một cụm rạp có xuất chiếu
        if (filteredCumRap.length > 0) {
          return {
            key: heThongRap.maHeThongRap,
            label: <img className="w-20" src={heThongRap.logo} alt="" />,
            children: (
              <div className="flex flex-col space-y-4">
                {renderCumRap(filteredCumRap)}
              </div>
            ),
          };
        }
        return null;
      })
      .filter((item) => item !== null); // Loại bỏ các hệ thống rạp không có xuất chiếu

    return filteredHeThongRap.slice(0, 6);
  };
  const renderCumRap = (cumRap) => {
    return cumRap.slice(0, 6).map((chiNhanh) => {
      return (
        <div key={chiNhanh.maCumRap} className="flex space-x-5 py-2">
          <div className="text-left w-80">
            <h1 className="truncate text-green-500">{chiNhanh.tenCumRap}</h1>{" "}
            <p className="truncate text-gray-500">{chiNhanh.diaChi}</p>
          </div>

          <div className="border-l-2 border-gray-300 h-full mx-4"></div>

          <div className="flex flex-col space-y-2">
            {renderDanhSachPhim(chiNhanh.danhSachPhim)}
          </div>
        </div>
      );
    });
  };

  const renderDanhSachPhim = (dsPhim) => {
    return dsPhim
      .filter((phim) => phim.maPhim === movieInfo.maPhim)
      .map((phim) => {
        return (
          <div key={phim.maPhim} className="py-4">
            <h1 className="font-bold text-red-500">{phim.tenPhim}</h1>
            {renderLichChieu(phim.lstLichChieuTheoPhim)}
          </div>
        );
      });
  };

  const renderLichChieu = (lichChieu) => {
    return (
      <div className="grid grid-cols-3 gap-2">
        {lichChieu.slice(0, 6).map((lich) => {
          return (
            <div
              onClick={() => handleLichChieuClick(lich.maLichChieu)}
              key={lich.maLichChieu}
              className="bg-white px-2 py-2 rounded border border-gray-200 text-center hover:bg-slate-200 transition cursor-pointer"
            >
              {moment(lich.ngayChieuGioChieu).format("DD/MM/YYYY ~ hh:mm")}
            </div>
          );
        })}
      </div>
    );
  };

  const handleLichChieuClick = (id) => {
    navigate(`/ticket-room/${id}`);
  };

  const renderThongTinPhim = () => {
    return (
      <div className="bg-black text-white min-h-screen">
        <div className="container flex items-center justify-between h-full mx-auto py-32">
          <div className="flex items-center space-x-10">
            <img
              className="h-80 rounded"
              src={movieInfo.hinhAnh}
              alt="Movie Poster"
            />

            <div className="flex flex-col space-y-10">
              <h2 className="text-2xl font-semibold break-words max-w-xs">
                {movieInfo.tenPhim}
              </h2>
              <button
                onClick={handleMuaVeClick}
                className="text-white bg-red-600 hover:bg-red-900 transition-all duration-300 py-2 px-4 rounded w-24"
              >
                Mua Vé
              </button>
            </div>
          </div>

          <div className="ml-auto">
            <Progress
              strokeWidth={10}
              type="circle"
              percent={movieInfo.danhGia * 10}
              size={120}
              format={() => (
                <span className="text-5xl text-white font-semibold">
                  {movieInfo.danhGia}
                </span>
              )}
            />
            <div className="flex justify-center space-x-1 mt-4">
              {renderStars(movieInfo.danhGia)}
            </div>
          </div>
        </div>

        <div
          id="tabs-section"
          className="container py-20 flex flex-col flex-grow"
        >
          <Tabs
            tabPosition="left"
            defaultActiveKey="1"
            items={getMovieShowtimes()}
            className="w-full border rounded-lg shadow-lg p-4 flex-grow"
          />
        </div>
      </div>
    );
  };

  return renderThongTinPhim();
}
