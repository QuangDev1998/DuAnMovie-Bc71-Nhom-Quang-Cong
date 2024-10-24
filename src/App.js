import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./template/Layout";
import HomePage from "./page/HomePage/HomePage";
import LoginPage from "./page/User/LoginPage/LoginPage";
import DetaiPage from "./page/DetailPage/DetaiPage";
import ListUser from "./page/Admin/ListUser/ListUser";
import RegisterPage from "./page/User/RegisterPage/RegisterPage";
import AccInfoPage from "./page/User/AccInfoPage/AccInfoPage";
import AddUserPage from "./page/Admin/ListUser/AddUserPage";
import AdminLayout from "./template/AdminLayout";
import ListMovie from "./page/Admin/ListMovie/ListMovie";
import AddMovie from "./page/Admin/ListMovie/AddMovie";
import EditMovie from "./page/Admin/ListMovie/EditMovie";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* user route */}
        <Route path="/" element={<Layout content={<HomePage />} />} />
        <Route path="/login" element={<Layout content={<LoginPage />} />} />
        <Route
          path="/acc-info"
          element={<Layout content={<AccInfoPage />} />}
        />
        <Route
          path="/register"
          element={<Layout content={<RegisterPage />} />}
        />
        <Route
          path="/detail/:id"
          element={<Layout content={<DetaiPage />} />}
        />
        {/* admin route */}
        {/* admin/list-user route */}
        <Route path="/list-user" element={<Layout content={<ListUser />} />} />

        <Route
          path="/admin/acc-info"
          element={<AdminLayout content={<AccInfoPage />} />}
        />
        <Route
          path="/admin/list-user"
          element={<AdminLayout content={<ListUser />} />}
        />
        <Route
          path="/admin/add-user"
          element={<AdminLayout content={<AddUserPage />} />}
        />
        {/* admin/list-movie route */}
        <Route
          path="/admin/list-movie"
          element={<AdminLayout content={<ListMovie />} />}
        />
        <Route
          path="/admin/add-movie"
          element={<AdminLayout content={<AddMovie />} />}
        />
        <Route
          path="/admin/edit-movie/:id"
          element={<AdminLayout content={<EditMovie />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
