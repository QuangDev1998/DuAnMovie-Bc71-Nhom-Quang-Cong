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
  layDanhSachPhim: () => http.get("/api/QuanLyPhim/LayDanhSachPhim"),
  layThongTinPhim: (idPhim) =>
    http.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${idPhim}`),
  layHeThongRap: () =>
    http.get("/api/QuanLyRap/LayThongTinLichChieuHeThongRap"),
};
