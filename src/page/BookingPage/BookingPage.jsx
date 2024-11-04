import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { movieService } from "../../service/userService";
import { Tabs } from "antd";
import moment from "moment";

export default function BookingPage() {
  const [thongTinLichChieu, setThongTinLichChieu] = useState();

  let params = useParams();
  let navigate = useNavigate();
  // call api lay thongTinLichChieu
  useEffect(() => {
    movieService
      .layThongTinLichChieu(params.id)
      .then((result) => {
        console.log(result);
        setThongTinLichChieu(result.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // tabs data
  const onChange = (key) => {
    console.log(key);
  };

  let renderTabItem = () => {
    console.log(thongTinLichChieu?.heThongRapChieu);
    return thongTinLichChieu?.heThongRapChieu.map((heThongRap, index) => {
      return {
        key: index,
        label: <img className="w-20" src={heThongRap.logo} alt="" />,
        children: renderCumRapChieu(heThongRap),
      };
    });
  };
  let renderCumRapChieu = (heThongRap) => {
    return heThongRap.cumRapChieu.map((rap) => {
      return (
        <div>
          <h1 className="text-lg text-green-400">{rap.tenCumRap}</h1>
          <div className="grid grid-cols-4 gap-2">
            {/* lay 8 lich chieu dau tien */}
            {rap.lichChieuPhim.slice(0, 8).map((lichChieu) => {
              return (
                <button
                  key={lichChieu.maLichChieu}
                  onClick={() =>
                    navigate(`/ticket-room/${lichChieu.maLichChieu}`)
                  }
                  className="py-1 px-2 text-green-600 bg-gray-200 border-solid border-2 border-gray-300 text-center hover:scale-105"
                >
                  {moment(lichChieu.ngayChieuGioChieu).format(
                    "DD/MM/YYYY ~ hh:mm"
                  )}
                </button>
              );
            })}
          </div>
        </div>
      );
    });
  };
  console.log("ttlc:", thongTinLichChieu);

  return (
    <div>
      <h1>BookingPage</h1>
      <Tabs
        tabPosition="left"
        defaultActiveKey="1"
        items={renderTabItem()}
        onChange={onChange}
      />
    </div>
  );
}
