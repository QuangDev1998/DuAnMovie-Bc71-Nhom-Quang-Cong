import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { movieService } from "../../service/userService";
import moment from "moment";

export default function TabMovie() {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "Tab 1",
      children: "Content of Tab Pane 1",
    },
    {
      key: "2",
      label: "Tab 2",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Tab 3",
      children: "Content of Tab Pane 3",
    },
  ];
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
            style={{ height: 400 }}
            tabPosition="left"
            defaultActiveKey="1"
            items={renderCumRap(heThongRap.lstCumRap)}
            onChange={onChange}
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
            <p className="truncate">{chiNhanh.diaChi}</p>
          </div>
        ),
        children: renderDanhSachPhim(chiNhanh.danhSachPhim),
      };
    });
  };
  let renderDanhSachPhim = (dsPhim) => {
    return (
      <div style={{ height: 400 }} className="overflow-y-scroll">
        {dsPhim.map((phim) => {
          return (
            <div className="flex space-x-5 ">
              <img className=" h-40" src={phim.hinhAnh} alt="" />
              <div>
                <h1>{phim.tenPhim}</h1>
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
              className="border-2 text-center py-2 px-2 "
            >
              {moment(lich.ngayChieuGioChieu).format("ddd-YYYY/MM/DD-hh:mm")}
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div className="container py-20">
      <Tabs
        style={{ height: 400 }}
        tabPosition="left"
        defaultActiveKey="1"
        items={renderHeThongRap()}
        onChange={onChange}
      />
    </div>
  );
}
