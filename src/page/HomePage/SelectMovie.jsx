import React, { useEffect, useState } from "react";
import { movieService } from "../../service/userService";
import { Select, Modal } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function SelectMovie() {
  const [movieArr, setMovieArr] = useState([]);
  const [heThongRap, setTheThongRap] = useState([]);
  const [rapChieuArr, setRapChieuArr] = useState([]);
  const [rapChieu, setRapChieu] = useState({});
  const [select1, setSelect1] = useState([]);
  const [select2, setSelect2] = useState([]);
  const [select3, setSelect3] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);

  const navigate = useNavigate();

  const onChange1 = (value) => {
    setSelectedMovie(value);
    movieService
      .layThongTinLichChieu(value)
      .then((result) => {
        setTheThongRap(result.data.content.heThongRapChieu);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChange2 = (value) => {
    setSelectedCinema(value);
    let selectedRapChieu = rapChieuArr.filter(
      (rapChieu) => rapChieu.maCumRap === value
    );
    setRapChieu(selectedRapChieu[0]);
  };

  const onChange3 = (value) => {
    setSelectedShowtime(value);
  };

  useEffect(() => {
    movieService
      .layDanhSachPhim()
      .then((result) => {
        setMovieArr(result.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    renderSelect1();
  }, [movieArr]);

  useEffect(() => {
    renderSelect2();
  }, [heThongRap]);

  useEffect(() => {
    renderSelect3();
  }, [rapChieu]);

  let renderSelect1 = () => {
    let select1Arr = [];
    movieArr.map((phim) => {
      select1Arr.push({
        value: phim.maPhim,
        label: phim.tenPhim,
      });
    });
    setSelect1(select1Arr);
  };

  let renderSelect2 = () => {
    let cumRapClone = [];
    let rapChieuClone = [];
    heThongRap.map((heThongRap) => {
      return heThongRap.cumRapChieu.map((rapChieu) => {
        rapChieuClone.push(rapChieu);
        cumRapClone.push({
          value: rapChieu.maCumRap,
          label: rapChieu.tenCumRap,
        });
      });
    });
    setSelect2(cumRapClone);
    setRapChieuArr(rapChieuClone);
  };

  let renderSelect3 = () => {
    let select3Clone = [];
    if (rapChieu.lichChieuPhim) {
      rapChieu.lichChieuPhim.map((lichChieu) => {
        select3Clone.push({
          label: moment(lichChieu.ngayChieuGioChieu).format("DD/MM/YY ~ HH:MM"),
          value: lichChieu.maLichChieu,
        });
      });
    }
    setSelect3(select3Clone);
  };

  const handleNavigate = () => {
    if (!selectedMovie) {
      setModalContent("Chưa chọn phim, vui lòng chọn phim !");
      setIsModalVisible(true);
      return;
    }

    if (!selectedCinema) {
      setModalContent("Chưa chọn rạp, vui lòng chọn rạp !");
      setIsModalVisible(true);
      return;
    }

    if (!selectedShowtime) {
      setModalContent(
        "Chưa chọn ngày giờ chiếu, vui lòng chọn ngày giờ chiếu !"
      );
      setIsModalVisible(true);
      return;
    }

    navigate(`/ticket-room/${selectedShowtime}`);
  };

  // Hàm đóng modal
  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flex items-center bottom-0 left-1/2 absolute -translate-x-1/2 translate-y-1/2 h-20 w-3/4 border border-solid rounded shadow-md bg-white text-black font-bold">
      <div className="w-full h-full border-r-2">
        <Select
          size="large"
          style={{
            width: "100%",
            height: "100%",
          }}
          variant="borderless"
          placeholder="Phim"
          optionFilterProp="label"
          onChange={onChange1}
          options={select1}
        />
      </div>
      <div className="w-full h-full border-r-2">
        <Select
          size="large"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
          }}
          variant="borderless"
          placeholder="Rạp"
          optionFilterProp="label"
          onChange={onChange2}
          options={select2}
        />
      </div>
      <div className="w-full h-full border-r-2">
        <Select
          size="large"
          style={{
            width: "100%",
            height: "100%",
          }}
          variant="borderless"
          className="w-full"
          placeholder="Ngày giờ chiếu"
          optionFilterProp="label"
          onChange={onChange3}
          options={select3}
        />
      </div>
      <div className="w-2/6 h-full py-4 px-2">
        <button
          className="text-white bg-red-600 hover:bg-red-900 transition-all duration-300 w-full h-full rounded"
          onClick={handleNavigate}
        >
          MUA VÉ NGAY
        </button>
      </div>

      <Modal
        title={
          <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
            {modalContent}
          </h2>
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleOk}
        footer={[
          <div className=" flex justify-center">
            <button
              key="submit"
              className="ant-btn ant-btn-primary bg-red-600 text-white  hover:bg-red-900 transition-all duration-300  py-2 px-4 rounded "
              onClick={handleOk}
            >
              Đã hiểu
            </button>
          </div>,
        ]}
      ></Modal>
    </div>
  );
}
