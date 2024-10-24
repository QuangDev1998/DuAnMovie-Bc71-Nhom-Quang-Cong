import { http } from "./config";

export let adminService = {
  // user action
  userListAction: () =>
    http.get("/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01"),
  // add user
  addUserAction: (user, bearerToken) =>
    http.post("/api/QuanLyNguoiDung/ThemNguoiDung", user, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    }),
  getListUserType: () =>
    http.get("/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung"),
  // delete user
  userDeleteAction: (taiKhoan, bearerToken) =>
    http.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    }),
  // search user
  searchUserAction: (tuKhoa) =>
    http.get(
      `/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${tuKhoa}`
    ),
  // get info user
  getInfoUserAction: (taiKhoan, bearerToken) =>
    http.post(
      `/api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`,
      "",
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    ),
  // use for edit list users
  updateUserInfoAction: (payload, bearerToken) =>
    http.post("/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung", payload, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    }),
  // movie action
  // get movie list
  movieListAction: () =>
    http.get("/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01"),
  // delete movie
  deleteMovieAction: (maPhim, bearerToken) =>
    http.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    }),
  // search movie
  searchMovieAction: (tenPhim) =>
    http.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01&tenPhim=${tenPhim}`),
  // add movie
  addMovieAction: (formData) =>
    http.post("/api/QuanLyPhim/ThemPhimUploadHinh", formData),
  // get movie info
  getMovieInfoAction: (maPhim) =>
    http.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`),
  // update movie
  updateMovieAction: (formData, bearerToken) =>
    http.post("/api/QuanLyPhim/CapNhatPhimUpload", formData, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    }),
};
