import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { movieService } from "../../service/userService";
import { useSelector } from "react-redux";
import { message } from "antd";

export default function TicketRoom() {
  let params = useParams();
  let { accessToken } = useSelector((state) => state.userSlice.loginData);
  const [phongVe, setPhongVe] = useState({});
  const [thongTinPhim, setThongTinPhim] = useState({});
  const [danhSachGhe, setDanhSachGhe] = useState([]);
  const [gheDuocChon, setGheDuocChon] = useState([]);
  // call api lay thong tin phong ve
  let fetchDanhSachPhongVe = () => {
    movieService
      .layDanhSachPhongVe(params.id)
      .then((result) => {
        console.log(result);
        setPhongVe(result.data.content);
        setThongTinPhim(result.data.content.thongTinPhim);
        setDanhSachGhe(result.data.content.danhSachGhe);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchDanhSachPhongVe();
  }, []);
  let handleGheDuocChon = (ghe) => {
    console.log(ghe);
    let cloneGheDuocChon = [...gheDuocChon];
    // kiem tra ghe da duoc chon chua
    let index = gheDuocChon.findIndex((item) => item.maGhe === ghe.maGhe);
    console.log("indexGhe:", index);
    // neu ghe da duoc chon => xoa
    if (index !== -1) {
      cloneGheDuocChon.splice(index, 1);
    } else {
      // chua co => them
      cloneGheDuocChon.push(ghe);
    }
    setGheDuocChon(cloneGheDuocChon);
    console.log(gheDuocChon);
  };
  let renderThongTinPhim = (phim) => {
    // dung Object.entries de map object
    console.log(Object.entries(phim));
    return Object.entries(phim).map(([key, value]) => {
      // ko render cac key sau
      if (key === "maLichChieu" || key === "hinhAnh") {
        return "";
      } else {
        return (
          <div className="px-3 py-5 flex justify-between  ">
            <h3 className="">{key}:</h3>
            <h3 className="text-green-400">{value}</h3>
          </div>
        );
      }
    });
  };
  let renderDanhSachGhe = (dsGhe) => {
    return dsGhe.map((ghe) => {
      let classGheDD = "";
      let indexGheDD = gheDuocChon.findIndex(
        (item) => item.maGhe === ghe.maGhe
      );
      // neu ghe duoc chon => highlight
      if (indexGheDD !== -1) {
        classGheDD = "border-green-600";
      }
      if (ghe.daDat == true) {
        return (
          <button
            key={ghe.maGhe}
            onClick={() => handleGheDuocChon(ghe)}
            className="w-10 h-10 bg-gray-500 flex items-center justify-center rounded hover:scale-105  border-solid border-4"
          >
            X
          </button>
        );
      }
      if (ghe.loaiGhe === "Vip") {
        return (
          <button
            key={ghe.maGhe}
            onClick={() => handleGheDuocChon(ghe)}
            className={`w-10 h-10 bg-yellow-600 flex items-center justify-center rounded hover:scale-105 ${classGheDD} border-solid border-4`}
          >
            {ghe.tenGhe}
          </button>
        );
      } else {
        return (
          <button
            key={ghe.maGhe}
            onClick={() => handleGheDuocChon(ghe)}
            className={`w-10 h-10 bg-gray-200 flex items-center justify-center rounded hover:scale-105 ${classGheDD} border-solid border-2`}
          >
            {ghe.tenGhe}
          </button>
        );
      }
    });
  };
  let handleDatVe = (maLichChieu, dsGheDuocChon, bearerToken) => {
    movieService
      .datVe(maLichChieu, dsGheDuocChon, bearerToken)
      .then((result) => {
        console.log(result);
        setGheDuocChon([]);
        message.success("Purchase success");
        fetchDanhSachPhongVe();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container">
      TicketRoom {params.id}
      <div className="flex space-x-5">
        {/* Seat room */}
        <div className="basis-2/3 ">
          <div className="grid grid-cols-12 gap-3">
            {renderDanhSachGhe(danhSachGhe)}
          </div>
          {/* chu thich ghe */}
          <div className="my-10 flex justify-center space-x-5">
            <div className="flex flex-col items-center justify-center">
              <div className="w-10 h-10 bg-gray-500 flex items-center justify-center rounded">
                X
              </div>
              <p>Đã đặt</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded"></div>
              <p>Thường</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="w-10 h-10 bg-yellow-600 flex items-center justify-center rounded"></div>
              <p>Vip</p>
            </div>
          </div>
        </div>
        {/* Movie info */}
        <div className="basis-1/3 shadow divide-y-2">
          <div className="px-3 py-5 flex justify-center">
            {/* tong tien */}
            <h1 className=" text-red-600 font-bold py-2 px-4 rounded">
              {gheDuocChon
                .reduce((tongTien, ghe, index) => {
                  return (tongTien += ghe.giaVe);
                }, 0)
                .toLocaleString()}{" "}
              VND
            </h1>
          </div>
          {renderThongTinPhim(thongTinPhim)}
          <div className="px-3 py-5 flex justify-between  ">
            <h3 className="">Chọn:</h3>
            {/* ghe da chon */}
            <h3 className="text-green-400">
              {gheDuocChon.map((ghe) => {
                return <span>{ghe.tenGhe} </span>;
              })}
            </h3>
          </div>
          <div className="px-3 py-5 flex justify-center ">
            <button
              onClick={() => handleDatVe(params.id, gheDuocChon, accessToken)}
              className="bg-blue-500 hover:bg-blue-700 text-white w-full font-bold py-2 px-4 rounded"
            >
              Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
