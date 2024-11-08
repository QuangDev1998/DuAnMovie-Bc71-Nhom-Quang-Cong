import React from "react";
import { Carousel, Modal } from "antd";
import { useEffect, useState } from "react";
import { movieService } from "../../service/userService";
import { useNavigate } from "react-router-dom";
import SelectMovie from "./SelectMovie";
import CarouselForm from "./CarouselForm";
const contentStyle = {
  // height: "400px",
  // color: "#DC2626",
  // lineHeight: "160px",
  // textAlign: "center",
  backgroundPosition: "center",
  backgroudSize: "cover",
  backgroudRepeat: "no-repeat",
};
const bannerList = [
  {
    maBanner: 1,
    maPhim: 1282,
    hinhAnh: "https://movienew.cybersoft.edu.vn/hinhanh/ban-tay-diet-quy.png",
    trailer: "uqJ9u7GSaYM", // YouTube video ID
  },
  {
    maBanner: 2,
    maPhim: 1283,
    hinhAnh: "https://movienew.cybersoft.edu.vn/hinhanh/lat-mat-48h.png",
    trailer: "kBY2k3G6LsM",
  },
];
export default function CarouselMovie() {
  const [movieArr, setMovieArr] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái hiển thị modal
  const [trailerUrl, setTrailerUrl] = useState(""); // Trailer URL
  const openModal = (trailerId) => {
    setTrailerUrl(trailerId); // Lấy ID trailer của phim khi click
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTrailerUrl("");
  };

  useEffect(() => {
    movieService
      .layDanhSachBanner()
      .then((result) => {
        const updateCarousel = result.data.content.map((item, index) => {
          return {
            ...item,
            trailer: item.trailer || "", // Đảm bảo mỗi phim có trailer (nếu có)
          };
        });
        setMovieArr(updateCarousel);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const renderMovie = () => {
    return movieArr.map((phim) => (
      <div
        key={phim.maBanner}
        className="h-screen"
        onClick={() => openModal(phim.trailer)} // Khi click vào ảnh, mở trailer đúng với phim
      >
        <img
          className="w-full h-full cursor-pointer"
          src={phim.hinhAnh}
          alt={phim.maPhim}
        />
      </div>
    ));
  };

  return (
    <div>
      <CarouselForm movieArr={bannerList} openModal={openModal} />

      <Modal
        title="Trailer"
        visible={isModalOpen}
        footer={null}
        onCancel={closeModal}
        width={800}
      >
        {/* Video trailer */}
        <iframe
          width="100%"
          height="400px"
          src={`https://www.youtube.com/embed/${trailerUrl}`} // Nhúng video trailer vào iframe
          title="Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Modal>
      <SelectMovie />
    </div>
  );
}
