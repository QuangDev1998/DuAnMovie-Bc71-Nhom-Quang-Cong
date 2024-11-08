// CarouselForm.js
import React from "react";
import { Carousel } from "antd";

const CarouselForm = ({ movieArr, openModal }) => {
  return (
    <Carousel arrows autoplay draggable>
      {movieArr.map((phim, index) => (
        <div
          key={phim.maBanner}
          className="h-screen"
          onClick={() => openModal(phim.trailer)} // Khi click vào ảnh, gọi hàm openModal
        >
          <img
            className="w-full h-full cursor-pointer"
            src={phim.hinhAnh}
            alt={`Phim ${phim.maPhim}`}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselForm;
