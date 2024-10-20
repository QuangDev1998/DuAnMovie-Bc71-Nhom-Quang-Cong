import { http } from "./config";

export let adminService = {
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
};
