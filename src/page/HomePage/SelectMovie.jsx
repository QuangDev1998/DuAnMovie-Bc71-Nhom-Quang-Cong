import React, { useEffect, useState } from "react";
import { movieService } from "../../service/userService";
import { Select, Modal } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function SelectMovieCopy() {
  const [movieArr, setMovieArr] = useState([]);
  const [heThongRap, setTheThongRap] = useState([]);
  const [rapChieuArr, setRapChieuArr] = useState([]);
  const [rapChieu, setRapChieu] = useState({});
  const [select1, setSelect1] = useState([]);
  const [select2, setSelect2] = useState(null);
  const [select3, setSelect3] = useState([]);

  const [selected2, setSelected2] = useState(null);
  const [selected3, setSelected3] = useState(null);

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
        console.log(heThongRap);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChange2 = (value) => {
    setSelectedCinema(value);
    // Vì set value của compo theo state nên cần pải update state theo value onchange
    let index = select2.findIndex((rapChieu) => rapChieu.value === value);
    if (index !== -1) {
      setSelected2(select2[index].value);
    }
    let selectedRapChieu = rapChieuArr.filter(
      (rapChieu) => rapChieu.maCumRap === value
    );
    setRapChieu(selectedRapChieu[0]);
  };

  const onChange3 = (value) => {
    setSelectedShowtime(value);
    // Vì set value của compo theo state nên cần pải update state theo value onchange
    let index = select3.findIndex((rapChieu) => rapChieu.value === value);
    if (index !== -1) {
      setSelected3(select3[index].value);
    }
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
  // Khi data select2 thay đổi setSelected2 = select2[0].value để value của compo Select2 tự update theo
  useEffect(() => {
    if (select2) {
      if (select2.length > 0) {
        setSelected2(select2[0].value);
      }
    }
  }, [select2]);
  // Sau khi value compo Select2 update sẽ tự động chạy hàm onChange2 nhằm tạo data cho compo Select3
  useEffect(() => {
    if (selected2) {
      onChange2(selected2);
    }
  }, [selected2]);

  // Khi đã có data cho compo Select3 sẽ tự update value cho compo này = select3[0].value
  useEffect(() => {
    if (select3) {
      if (select3.length > 0) {
        setSelected3(select3[0].value);
      }
    }
  }, [select3]);
  // Sau khi value compo Select3 update sẽ tự động chạy hàm onChange3
  useEffect(() => {
    if (selected3) {
      onChange3(selected3);
    }
  }, [selected3]);

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
    let heThongRapArr = heThongRap.map((heThongRap) => {
      return heThongRap.cumRapChieu;
    });
    let rapChieuArr = heThongRapArr.flat();

    rapChieuArr.map((rapChieu) => {
      rapChieuClone.push(rapChieu);
      cumRapClone.push({
        value: rapChieu.maCumRap,
        label: rapChieu.tenCumRap,
      });
    });
    setSelect2(cumRapClone);
    setRapChieuArr(rapChieuClone);
  };

  let renderSelect3 = () => {
    let select3Clone = [];
    if (rapChieu) {
      if (rapChieu.lichChieuPhim) {
        rapChieu.lichChieuPhim.map((lichChieu) => {
          select3Clone.push({
            label: moment(lichChieu.ngayChieuGioChieu).format(
              "DD/MM/YY ~ HH:MM"
            ),
            value: lichChieu.maLichChieu,
          });
        });
      }
      setSelect3(select3Clone);
    }
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
          value={selected2}
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
          value={selected3}
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
