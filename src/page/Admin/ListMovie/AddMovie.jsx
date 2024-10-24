import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Switch,
  Upload,
} from "antd";
import { PlusOutlined, RollbackOutlined } from "@ant-design/icons";
import moment from "moment";
import { adminService } from "../../../service/adminService";
import { useNavigate } from "react-router-dom";
const AddMovie = () => {
  let navigate = useNavigate();

  const onFinish = (values) => {
    // format lai ngayKhoiChieu lay tu form de khop voi format gui api
    values.ngayKhoiChieu = moment(values.ngayKhoiChieu).format("DD/MM/YYYY");
    // lay obj hinhAnh dau tien trong array
    values.hinhAnh = values.hinhAnh[0];
    console.log("Success:", values);
    console.log("values.hinhAnh", values.hinhAnh);
    // tao formData
    let formData = new FormData();
    for (let key in values) {
      if (key !== "hinhAnh") {
        formData.append(key, values[key]);
      } else {
        // . toi originFileObj do Form Antd tra ve
        formData.append(
          "File",
          values.hinhAnh.originFileObj,
          values.hinhAnh.originFileObj.name
        );
      }
    }
    console.log("dataform:", formData.get("File"));
    // call api add movie
    adminService
      .addMovieAction(formData)
      .then((result) => {
        message.success("Add movie success");
        // navigate ve trang list movie
        navigate("/admin/list-movie");
      })
      .catch((err) => {
        console.log(err);
        message.error("Add movie fail");
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <div className="container py-10">
      {/* go back button */}
      <button
        onClick={() => navigate("/admin/list-movie")}
        className="py-1 px-2 bg-white text-blue-500 rounded border-blue-500 border-2"
      >
        <RollbackOutlined />
      </button>
      <h1 className="my-5 font-bold">Add Movie</h1>
      {/* FORM */}
      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          tenPhim: "",
          trailer: "",
          moTa: "",
          maNhom: "",
          sapChieu: false,
          dangChieu: false,
          hot: false,
        }}
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="tenPhim"
          name="tenPhim"
          rules={[
            {
              required: true,
              message: "Please input your tenPhim!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="trailer"
          name="trailer"
          rules={[
            {
              required: true,
              message: "Please input your trailer!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="moTa"
          name="moTa"
          rules={[
            {
              required: true,
              message: "Please input your moTa!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="maNhom"
          name="maNhom"
          rules={[
            {
              required: true,
              message: "Please input your maNhom!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="ngayKhoiChieu" name="ngayKhoiChieu">
          <DatePicker format={"DD/MM/YY"} />
        </Form.Item>
        <Form.Item label="sapChieu" valuePropName="checked" name="sapChieu">
          <Switch />
        </Form.Item>
        <Form.Item label="dangChieu" valuePropName="checked" name="dangChieu">
          <Switch />
        </Form.Item>
        <Form.Item label="hot" valuePropName="checked" name="hot">
          <Switch />
        </Form.Item>
        <Form.Item label="danhGia" name="danhGia">
          <InputNumber min={1} max={10} />
        </Form.Item>
        {/* <Form.Item label="hinhAnh" name="hinhAnh">
          <input type="file" />
        </Form.Item> */}
        <Form.Item
          label="Upload"
          name="hinhAnh"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            listType="picture"
            maxCount={1}
            accept="image/png, image/jpeg"
          >
            <button
              style={{
                border: "solid",
                borderWidth: "1px",
                background: "none",
              }}
              type="button"
            >
              <PlusOutlined />
            </button>
          </Upload>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default AddMovie;
