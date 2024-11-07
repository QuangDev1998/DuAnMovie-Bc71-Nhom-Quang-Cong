import React, { useEffect, useState } from "react";
import { movieService } from "../../service/userService";
import { Select, Modal } from "antd"; // Import Modal từ antd
import moment from "moment";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function SelectMovie() {
  const [movieArr, setMovieArr] = useState([]);
  const [heThongRap, setTheThongRap] = useState([]);
  const [rapChieuArr, setRapChieuArr] = useState([]);
  const [rapChieu, setRapChieu] = useState({});
  const [select1, setSelect1] = useState([]); // Phim
  const [select2, setSelect2] = useState([]); // Rạp
  const [select3, setSelect3] = useState([]); // Ngày giờ chiếu

  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái của modal
  const [modalContent, setModalContent] = useState(""); // Nội dung của modal

  const [selectedMovie, setSelectedMovie] = useState(null); // Lưu phim đã chọn
  const [selectedCinema, setSelectedCinema] = useState(null); // Lưu rạp đã chọn
  const [selectedShowtime, setSelectedShowtime] = useState(null); // Lưu lịch chiếu đã chọn

  const navigate = useNavigate(); // Khởi tạo navigate

  const onChange1 = (value) => {
    setSelectedMovie(value); // Lưu phim đã chọn
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
    setSelectedCinema(value); // Lưu rạp đã chọn
    let selectedRapChieu = rapChieuArr.filter(
      (rapChieu) => rapChieu.maCumRap === value
    );
    setRapChieu(selectedRapChieu[0]);
  };

  const onChange3 = (value) => {
    setSelectedShowtime(value); // Lưu lịch chiếu đã chọn
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

  // Hàm kiểm tra điều kiện và chuyển hướng
  const handleNavigate = () => {
    // Kiểm tra xem người dùng đã chọn phim chưa
    if (!selectedMovie) {
      setModalContent("Chưa chọn phim, vui lòng chọn phim !");
      setIsModalVisible(true); // Hiển thị modal khi chưa chọn phim
      return;
    }

    // Kiểm tra xem người dùng đã chọn rạp chưa
    if (!selectedCinema) {
      setModalContent("Chưa chọn rạp, vui lòng chọn rạp !");
      setIsModalVisible(true); // Hiển thị modal khi chưa chọn rạp
      return;
    }

    // Kiểm tra xem người dùng đã chọn ngày giờ chiếu chưa
    if (!selectedShowtime) {
      setModalContent(
        "Chưa chọn ngày giờ chiếu, vui lòng chọn ngày giờ chiếu !"
      );
      setIsModalVisible(true); // Hiển thị modal khi chưa chọn ngày giờ chiếu
      return;
    }

    // Nếu đã chọn đủ thông tin, chuyển hướng đến trang ticket room
    navigate(`/ticket-room/${selectedShowtime}`); // Chuyển hướng đến trang /ticket-room/:id
  };

  // Hàm đóng modal
  const handleOk = () => {
    setIsModalVisible(false); // Đóng modal
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
          onClick={handleNavigate} // Gọi hàm chuyển hướng khi nhấn nút
        >
          MUA VÉ NGAY
        </button>
      </div>

      {/* Modal thông báo */}
      <Modal
        title={
          <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
            {modalContent}
          </h2>
        } // Tiêu đề căn giữa và in đậm
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
