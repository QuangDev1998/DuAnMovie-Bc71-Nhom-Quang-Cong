import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Form, Select, Button, Col, Input, Row, message } from "antd";

import { useNavigate } from "react-router-dom";
import { adminService } from "../../../service/adminService";

export default function AddUserPage() {
  let loginData = useSelector((state) => state.userSlice.loginData);
  const [loaiNguoiDung, setLoaiNguoiDung] = useState([]);
  let navigate = useNavigate();
  // call api get loaiNguoiDung
  useEffect(() => {
    adminService
      .getListUserType()
      .then((result) => {
        console.log("usertype:", result.data.content);
        setLoaiNguoiDung(result.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const { Option } = Select;
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 11,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    adminService
      .addUserAction(values, loginData.accessToken)
      .then((result) => {
        console.log("Reg res:", result);
        message.success("Add success");
      })
      .catch((err) => {
        console.log(err);
        message.success("Add success");
      });
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  // render dsLoaiNguoiDung
  let renderDanhSachLoaiNguoiDung = () => {
    return loaiNguoiDung.map((loai, index) => {
      return <Option value={loai.maLoaiNguoiDung}>{loai.tenLoai}</Option>;
    });
  };
  renderDanhSachLoaiNguoiDung();
  return (
    <div className="container py-20">
      <h1 className="mb-5">Add user</h1>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          prefix: "86",
        }}
        // style={{
        //   maxWidth: 600,
        // }}
        scrollToFirstError
      >
        <Row gutter={24}>
          {/* Col left */}
          <Col className="gutter-row" span={12}>
            {/* username */}
            <Form.Item
              name="taiKhoan"
              label="Username"
              tooltip="What do you want others to call you?"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                  whitespace: true,
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            {/* matKhau */}
            <Form.Item
              name="matKhau"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            {/* hoTen */}
            <Form.Item
              name="hoTen"
              label="Name"
              tooltip="What do you want others to call you?"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            {/* maNhom */}
            <Form.Item
              name="maNhom"
              label="Group"
              rules={[
                {
                  required: true,
                  message: "Please select group!",
                },
              ]}
              hasFeedback
            >
              <Select placeholder="select your group">
                <Option value="GP01">GP01</Option>
                <Option value="GP02">GP02</Option>
                <Option value="GP03">GP03</Option>
              </Select>
            </Form.Item>
          </Col>
          {/* Col right */}
          <Col className="gutter-row" span={12}>
            {/* email */}
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            {/* matKhau confirm */}
            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["matKhau"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("matKhau") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            {/* soDT */}
            <Form.Item
              name="soDT"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
                {
                  required: true,
                  message: "Must be number",
                  pattern: new RegExp(/^[0-9]+$/),
                },
                {
                  required: true,
                  message: "Must have 10 digits",
                  pattern: new RegExp(/^\d{10}$/),
                },
              ]}
              hasFeedback
            >
              <Input
                addonBefore={prefixSelector}
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
            {/* maLoaiNguoiDung */}
            <Form.Item
              name="maLoaiNguoiDung"
              label="Type"
              rules={[
                {
                  required: true,
                  message: "Please select type!",
                },
              ]}
              hasFeedback
            >
              <Select placeholder="select your group">
                {renderDanhSachLoaiNguoiDung()}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* add button */}
        <Form.Item
          {...tailFormItemLayout}
          wrapperCol={{ offset: 11, span: 24 }}
        >
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
