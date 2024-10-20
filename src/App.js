import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./template/Layout";
import HomePage from "./page/HomePage/HomePage";
import LoginPage from "./page/User/LoginPage/LoginPage";
import DetaiPage from "./page/DetailPage/DetaiPage";
import ListUser from "./page/Admin/ListUser/ListUser";
import RegisterPage from "./page/User/RegisterPage/RegisterPage";
import AccInfoPage from "./page/User/AccInfoPage/AccInfoPage";
import FormInModal from "./page/User/AccInfoPage/FormInModal";
import AddUserPage from "./page/Admin/ListUser/AddUserPage";
import AdminLayout from "./template/AdminLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* user route */}
        <Route path="/" element={<Layout content={<HomePage />} />} />
        <Route path="/login" element={<Layout content={<LoginPage />} />} />
        <Route
          path="/register"
          element={<Layout content={<RegisterPage />} />}
        />
        <Route
          path="/detail/:id"
          element={<Layout content={<DetaiPage />} />}
        />
        {/* admin route */}
        <Route path="/list-user" element={<Layout content={<ListUser />} />} />
        <Route
          path="/acc-info"
          element={<Layout content={<AccInfoPage />} />}
        />
        <Route
          path="/form-modal"
          element={<Layout content={<FormInModal />} />}
        />
        <Route
          path="/add-user"
          element={<Layout content={<AddUserPage />} />}
        />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
