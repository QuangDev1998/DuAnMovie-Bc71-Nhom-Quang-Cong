import React, { useEffect, useState } from "react";
import { movieService } from "../../service/userService";
import { Select } from "antd";
import moment from "moment";

export default function SelectMovie() {
  const [movieArr, setMovieArr] = useState([]);
  const [heThongRap, setTheThongRap] = useState([]);
  const [rapChieuArr, setRapChieuArr] = useState([]);
  const [rapChieu, setRapChieu] = useState({});
  const [lichChieu, setLichChieu] = useState([]);
  // state chứa arr option của từng select
  const [select1, setSelect1] = useState([]);
  const [select2, setSelect2] = useState([]);
  const [select3, setSelect3] = useState([]);

  const onChange1 = (value) => {
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
    console.log(`selected ${value}`);
    let selectedRapChieu = rapChieuArr.filter(
      (rapChieu) => rapChieu.maCumRap === value
    );
    console.log("🚀 ~ onChange2 ~ selectedRapChieu:", selectedRapChieu);
    setRapChieu(selectedRapChieu[0]);
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
    console.log("heThongRap", heThongRap);
    heThongRap.map((heThongRap) => {
      return heThongRap.cumRapChieu.map((rapChieu) => {
        rapChieuClone.push(rapChieu);
        cumRapClone.push({
          value: rapChieu.maCumRap,
          label: rapChieu.tenCumRap,
        });
      });
    });
    console.log("cumRapClone", cumRapClone);
    setSelect2(cumRapClone);
    setRapChieuArr(rapChieuClone);
  };
  let renderSelect3 = () => {
    let select3Clone = [];
    if (rapChieu.lichChieuPhim) {
      console.log("rapChieu.lichChieuPhim", rapChieu.lichChieuPhim);
      rapChieu.lichChieuPhim.map((lichChieu) => {
        select3Clone.push({
          label: moment(lichChieu.ngayChieuGioChieu).format("DD/MM/YY ~ HH:MM"),
          value: lichChieu.maLichChieu,
        });
      });
    }

    console.log("select3Clone", select3Clone);
    setSelect3(select3Clone);
  };

  return (
    <div className="flex  items-center bottom-0 left-1/2 absolute -translate-x-1/2 translate-y-1/2 h-20 w-3/4 border border-solid rounded shadow-md bg-white">
      <div className="w-full h-full border-r-2">
        <Select
          size="large"
          style={{
            width: "100%",
            height: "100%",
          }}
          variant="borderless"
          placeholder="Select movie"
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
          placeholder="Select theater"
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
          placeholder="Select date"
          optionFilterProp="label"
          options={select3}
        />
      </div>
      <div className="w-2/6 h-full py-4 px-2">
        <button className="text-white bg-blue-600 hover:bg-blue-900 transition-all duration-300 w-full h-full text-center rounded">
          Purchase
        </button>
      </div>
    </div>
  );
}
