import React from "react";
import { Button, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userService } from "../../../service/userService";
import { setLoginData } from "../../../redux/userSlice";

export default function FormLogin() {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const onFinish = (values) => {
    console.log("🚀 ~ onFinish ~ values:", values);
    userService
      .loginAction(values)
      .then((result) => {
        console.log("resultlogin:", result);
        dispatch(setLoginData(result.data.content));
        let loginJson = JSON.stringify(result.data.content);
        localStorage.setItem("USER_LOGIN", loginJson);
        message.success("Login success");
        if (result.data.content.maLoaiNguoiDung === "QuanTri") {
          navigate("/admin/list-user");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Login fail");
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      layout="vertical"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 24,
      }}
      initialValues={{
        taiKhoan: "admin321",
        matKhau: "1234",
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="taiKhoan"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="matKhau"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
      </Form.Item>

      <Form.Item
      // wrapperCol={{
      //   offset: 11,
      //   span: 24,
      // }}
      >
        <Button block type="primary" htmlType="submit">
          Submit
        </Button>
        or{" "}
        <a onClick={() => navigate("/register")} href="">
          Register now!
        </a>
      </Form.Item>
    </Form>
  );
}
