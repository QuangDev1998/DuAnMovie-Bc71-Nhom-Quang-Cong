import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminService } from "../../../service/adminService";
import { RollbackOutlined, PlusOutlined } from "@ant-design/icons";
import {
  message,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Switch,
  Upload,
} from "antd";
import moment from "moment";
import { useSelector } from "react-redux";

export default function EditMovie() {
  let params = useParams();
  let navigate = useNavigate();
  let loginData = useSelector((state) => state.userSlice.loginData);
  const [form] = Form.useForm();
  const [movieInfo, setMovieInfo] = useState({});

  const onFinish = (values) => {
    // format lai ngayKhoiChieu lay tu form de khop voi format gui api
    values.ngayKhoiChieu = moment(values.ngayKhoiChieu).format("DD/MM/YYYY");
    // lay obj hinhAnh dau tien trong array neu co
    if (values.hinhAnh !== null) {
      values.hinhAnh = values.hinhAnh[0];
    }

    console.log("Success:", values);
    console.log("values.hinhAnh", values.hinhAnh);
    // create formData
    let formData = new FormData();
    for (let key in values) {
      if (key !== "hinhAnh") {
        formData.append(key, values[key]);
      } else {
        // neu co hinhAnh thi gui, ko thi null
        if (values.hinhAnh !== null) {
          // . toi originFileObj do Form Antd tra ve
          formData.append(
            "File",
            values.hinhAnh.originFileObj,
            values.hinhAnh.originFileObj.name
          );
        }
      }
    }
    console.log("dataform:", formData.get("File"));
    // call api update movie
    adminService
      .updateMovieAction(formData, loginData.accessToken)
      .then((result) => {
        message.success("Update movie success");
        // navigate ve trang list movie
        navigate("/admin/list-movie");
      })
      .catch((err) => {
        console.log(err);
        message.error("Update movie fail");
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
  // api lay movie info theo id
  let fetchMovieInfo = () => {
    adminService
      .getMovieInfoAction(params.id)
      .then((result) => {
        setMovieInfo(result.data.content);
        console.log(movieInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // call api get movie info 1st
  useEffect(() => {
    fetchMovieInfo();
    console.log("movieInfo:", movieInfo);
  }, []);
  // form reset khi movieInfo update
  useEffect(() => {
    form.resetFields();
  }, [movieInfo]);

  return (
    <div className="container py-20">
      {/* go back button */}
      <button
        onClick={() => navigate("/admin/list-movie")}
        className="py-1 px-2 bg-white text-blue-500 rounded border-blue-500 border-2"
      >
        <RollbackOutlined />
      </button>
      <h1 className="my-5 font-bold">Edit Movie</h1>
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
        form={form}
        initialValues={{
          maPhim: movieInfo.maPhim,
          tenPhim: movieInfo.tenPhim,
          trailer: movieInfo.trailer,
          moTa: movieInfo.moTa,
          maNhom: movieInfo.maNhom,
          sapChieu: movieInfo.sapChieu,
          dangChieu: movieInfo.dangChieu,
          hot: movieInfo.hot,
          danhGia: movieInfo.danhGia,
          ngayKhoiChieu: moment(movieInfo.ngayKhoiChieu),
          hinhAnh: null,
        }}
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="maPhim" name="maPhim">
          <Input disabled />
        </Form.Item>
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
            <img
              style={{ height: 100, width: 60 }}
              src={movieInfo.hinhAnh}
              alt=""
            />
            <button
              style={{
                border: "solid",
                borderWidth: "1px",
                background: "none",
              }}
              type="button"
            >
              {/* <PlusOutlined /> */}
              Change image
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
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
