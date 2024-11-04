import { http } from "./config";

export let userService = {
  // login
  loginAction: (user) => http.post("/api/QuanLyNguoiDung/DangNhap", user),
  // register
  registerAction: (regData) =>
    http.post("/api/QuanLyNguoiDung/DangKy", regData),
  // get info acc
  getInfoAccAction: (bearer) =>
    http.post("/api/QuanLyNguoiDung/ThongTinTaiKhoan", "", {
      headers: {
        Authorization: `Bearer ${bearer}`,
      },
    }),
  // use for edit account
  updateAccInfoAction: (payload, bearerToken) =>
    http.put("/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung", payload, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    }),
};

export let movieService = {
  layDanhSachBanner: () => http.get("/api/QuanLyPhim/LayDanhSachBanner"),
  layDanhSachPhim: () => http.get("/api/QuanLyPhim/LayDanhSachPhim"),
  layThongTinPhim: (idPhim) =>
    http.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${idPhim}`),
  layHeThongRap: () =>
    http.get("/api/QuanLyRap/LayThongTinLichChieuHeThongRap"),
  layThongTinLichChieu: (maPhim) =>
    http.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`),
  layDanhSachPhongVe: (maLichChieu) =>
    http.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`),
  datVe: (maLichChieu, dsGheDuocChon, bearerToken) =>
    http.post(
      `/api/QuanLyDatVe/DatVe`,
      // payload
      {
        maLichChieu: maLichChieu,
        danhSachVe: dsGheDuocChon.map((ghe) => {
          return {
            maGhe: ghe.maGhe,
            giaVe: ghe.giaVe,
          };
        }),
      },
      // token
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    ),
};
