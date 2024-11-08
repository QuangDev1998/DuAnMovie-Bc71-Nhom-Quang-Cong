import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { movieService } from "../../service/userService";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const TabMovie = () => {
  const navigate = useNavigate();
  const [heThongRap, setHeThongRap] = useState([]);

  useEffect(() => {
    movieService
      .layHeThongRap()
      .then((result) => {
        setHeThongRap(result.data.content);
      })
      .catch((err) => {});
  }, []);

  const handleLichChieuClick = (id) => {
    navigate(`/ticket-room/${id}`);
  };

  const onChange = (key) => {
    console.log(key);
  };

  const renderHeThongRap = () => {
    return heThongRap.map((heThongRap) => {
      return {
        key: heThongRap.maHeThongRap,
        label: (
          <img className="w-20 sm:w-24 md:w-28" src={heThongRap.logo} alt="" />
        ),
        children: (
          <Tabs
            tabPosition="left"
            defaultActiveKey="1"
            items={renderCumRap(heThongRap.lstCumRap)}
            onChange={onChange}
            className="h-full"
          />
        ),
      };
    });
  };

  const renderCumRap = (cumRap) => {
    return cumRap.map((chiNhanh, index) => {
      return {
        key: index,
        label: (
          <div className="text-left w-80 sm:w-96">
            <h1 className="truncate">{chiNhanh.tenCumRap}</h1>
            <p className="truncate text-gray-500">{chiNhanh.diaChi}</p>
          </div>
        ),
        children: renderDanhSachPhim(chiNhanh.danhSachPhim),
      };
    });
  };

  const renderDanhSachPhim = (dsPhim) => {
    return (
      <div className="flex flex-col overflow-y-auto h-full sm:h-[calc(100vh-200px)]">
        {/* Giới hạn chiều cao và có thanh cuộn */}
        {dsPhim.map((phim) => {
          return (
            <div
              className="flex items-center space-x-5 py-4 sm:flex-row sm:space-x-4"
              key={phim.maPhim}
            >
              {/* Ảnh phim */}
              <img
                className="w-24 sm:w-32 object-cover"
                src={phim.hinhAnh}
                alt={phim.tenPhim}
              />
              {/* Tên phim và lịch chiếu */}
              <div className="flex-grow">
                <h1 className="font-bold text-red-500">{phim.tenPhim}</h1>
                <div className="grid grid-cols-3 gap-2 mt-2 sm:flex sm:space-x-3 sm:flex-wrap">
                  {/* Lịch chiếu */}
                  {renderLichChieu(phim.lstLichChieuTheoPhim)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderLichChieu = (lichChieu) => {
    return (
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-2 md:grid-cols-3">
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

  return (
    <div
      className="container py-20 flex flex-col items-center px-4 md:px-8"
      id="cumRapSection"
    >
      <div className="text-white border bg-red-600 px-4 py-2 text-lg font-semibold rounded">
        Danh Sách Các Rạp Và Suất Chiếu
      </div>
      <div className="border rounded-lg shadow-lg p-4 flex-grow flex mt-6 w-full">
        <Tabs
          tabPosition="left"
          defaultActiveKey="1"
          items={renderHeThongRap()}
          onChange={onChange}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default TabMovie;
