import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { movieService } from "../../service/userService";
import moment from "moment";

export default function TabMovie() {
  const onChange = (key) => {
    console.log(key);
  };

  const [heThongRap, setHeThongRap] = useState([]);
  useEffect(() => {
    movieService
      .layHeThongRap()
      .then((result) => {
        console.log(result);
        setHeThongRap(result.data.content);
      })
      .catch((err) => {});
  }, []);

  let renderHeThongRap = () => {
    return heThongRap.map((heThongRap) => {
      return {
        key: heThongRap.maHeThongRap,
        label: <img className="w-20" src={heThongRap.logo} alt="" />,
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

  let renderCumRap = (cumRap) => {
    return cumRap.map((chiNhanh) => {
      return {
        key: chiNhanh.maCumRap,
        label: (
          <div className="text-left w-80">
            <h1 className="truncate">{chiNhanh.tenCumRap}</h1>
            <p className="truncate text-gray-500">{chiNhanh.diaChi}</p>
          </div>
        ),
        children: renderDanhSachPhim(chiNhanh.danhSachPhim),
      };
    });
  };

  let renderDanhSachPhim = (dsPhim) => {
    return (
      <div className="flex flex-col overflow-y-auto h-screen">
        {" "}
        {/* Giới hạn chiều cao */}
        {dsPhim.map((phim) => {
          return (
            <div className="flex space-x-5 py-4" key={phim.maPhim}>
              <img className="w-24 object-cover" src={phim.hinhAnh} alt="" />
              <div className="flex-grow">
                <h1 className="font-bold text-red-500">{phim.tenPhim}</h1>
                {renderLichChieu(phim.lstLichChieuTheoPhim)}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  let renderLichChieu = (lichChieu) => {
    return (
      <div className="grid grid-cols-3 gap-2">
        {lichChieu.slice(0, 6).map((lich) => {
          return (
            <div
              key={lich.maLichChieu}
              className="bg-white px-5 py-2 rounded border border-gray-200 text-center hover:bg-slate-200 transition"
            >
              {moment(lich.ngayChieuGioChieu).format("DD/MM/YYYY ~ hh:mm")}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="container py-20 flex flex-col">
      <div className="border rounded-lg shadow-lg p-4 flex-grow flex">
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
}
