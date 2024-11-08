import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { movieService } from "../../service/userService";
import { useSelector } from "react-redux";
import { Button, Modal } from "antd";
import verifiedIcon from "../../asset/verified-icon.gif";
import crossIcon from "../../asset/cross.png";
export default function TicketRoom() {
  let params = useParams();
  let navigate = useNavigate();
  let loginData = useSelector((state) => state.userSlice.loginData);

  let accessToken = useSelector(
    (state) => state.userSlice.loginData?.accessToken
  );
  const [phongVe, setPhongVe] = useState({});
  const [thongTinPhim, setThongTinPhim] = useState({});
  const [danhSachGhe, setDanhSachGhe] = useState([]);
  const [gheDuocChon, setGheDuocChon] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);

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
    if (loginData) {
      movieService
        .datVe(maLichChieu, dsGheDuocChon, bearerToken)
        .then((result) => {
          console.log(result);
          setModalOpen(true);
          setGheDuocChon([]);

          fetchDanhSachPhongVe();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setModal2Open(true);
    }
  };
  return (
    <div className="container pt-16">
      <div className="flex space-x-5">
        {/* Seat room */}
        <div className="basis-2/3 ">
          <div className="grid lg:grid-cols-12 md:grid-cols-6 sm:grid-cols-3 md:gap-3 sm:gap-1">
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
          <div className="px-3 py-5 flex justify-between  ">
            <h3 className="">Cụm rạp:</h3>
            <h3 className="text-green-400">{thongTinPhim.tenCumRap}</h3>
          </div>
          <div className="px-3 py-5 flex justify-between  ">
            <h3 className="">Rạp:</h3>
            <h3 className="text-green-400">{thongTinPhim.tenRap}</h3>
          </div>
          <div className="px-3 py-5 flex justify-between  ">
            <h3 className="">Địa chỉ:</h3>
            <h3 className="text-green-400">{thongTinPhim.diaChi}</h3>
          </div>
          <div className="px-3 py-5 flex justify-between  ">
            <h3 className="">Tên phim:</h3>
            <h3 className="text-green-400">{thongTinPhim.tenPhim}</h3>
          </div>
          <div className="px-3 py-5 flex justify-between  ">
            <h3 className="">Ngày chiếu:</h3>
            <h3 className="text-green-400">{thongTinPhim.ngayChieu}</h3>
          </div>
          <div className="px-3 py-5 flex justify-between  ">
            <h3 className="">Giờ chiếu:</h3>
            <h3 className="text-green-400">{thongTinPhim.gioChieu}</h3>
          </div>
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
              className="bg-red-600 hover:bg-red-700 text-white w-full font-bold py-2 px-4 rounded"
            >
              Đặt vé
            </button>
          </div>
        </div>
      </div>
      {/* modal thong bao*/}
      <Modal
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        <img
          className=" mx-auto"
          style={{ height: "80px" }}
          src={verifiedIcon}
          alt=""
        />
        <p className="text-2xl text-center my-5">Đặt vé thành công!</p>
        <Button
          className="w-full bg-red-600"
          type="primary"
          onClick={() => navigate("/")}
        >
          Trở về trang chủ
        </Button>
      </Modal>
      {/* modal yeu cau */}
      <Modal
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
        footer={null}
      >
        <img className="h-10 mx-auto " src={crossIcon} alt="" />
        <p className="text-2xl text-center my-5">
          Vui lòng đăng nhập để đặt vé
        </p>
        <div className="flex space-x-2  justify-center">
          <button
            onClick={() => {
              window.location.href = "/login";
            }}
            type="button"
            className=" py-1 px-3 bg-blue-600 rounded text-white"
          >
            {" "}
            Đăng nhập
          </button>
          <button
            onClick={() => navigate("/register")}
            type="button"
            className=" py-1 px-3 bg-green-600 rounded text-white"
          >
            {" "}
            Đăng ký
          </button>
        </div>
      </Modal>
    </div>
  );
}
