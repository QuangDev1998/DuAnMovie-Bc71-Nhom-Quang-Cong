import React, { useEffect, useState } from "react";
import { Button, Table, Form, Input, Space, message } from "antd";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminService } from "../../../service/adminService";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";

export default function ListMovie() {
  let navigate = useNavigate();
  const [movieArr, setMovieArr] = useState([]);
  let loginData = useSelector((state) => state.userSlice.loginData);

  // ham call api get list movie
  let fetchListMovie = () => {
    adminService
      .movieListAction()
      .then((result) => {
        console.log(result);
        setMovieArr(result.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // call api get listMovie 1st
  useEffect(() => {
    fetchListMovie();
  }, []);
  // Form data
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
    fetchListMovie();
  };
  const onFinish = (values) => {
    console.log("Success:", values);
    if (values.tuKhoa === "") {
      fetchListMovie();
    } else {
      adminService
        .searchMovieAction(values.tuKhoa)
        .then((result) => {
          console.log(result);
          setMovieArr(result.data.content);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // Table data
  const columns = [
    {
      title: "Id",
      dataIndex: "maPhim",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "hinhAnh",
      key: "account",
      render: (_, movie) => {
        return (
          <img style={{ height: 100, width: 60 }} src={movie.hinhAnh} alt="" />
        );
      },
    },
    {
      title: "Name ",
      dataIndex: "tenPhim",
      key: "name",
    },
    {
      title: "Thao tac",

      key: "action",
      render: (_, dataObject) => {
        return (
          <div>
            <Button
              onClick={() => handleDeleteMovie(dataObject.maPhim)}
              color="danger"
              variant="solid"
              className="mr-2"
            >
              <DeleteOutlined />
            </Button>
            <Button
              onClick={() => navigate(`/admin/edit-movie/${dataObject.maPhim}`)}
              color="default"
              variant="solid"
            >
              <EditOutlined />
            </Button>
          </div>
        );
      },
    },
  ];
  //method
  let renderListMovie = () => {
    return movieArr.map((movie) => {
      return {
        key: movie.maPhim,
        maPhim: movie.maPhim,
        hinhAnh: movie.hinhAnh,
        tenPhim: movie.tenPhim,
      };
    });
  };
  let handleDeleteMovie = (maPhim) => {
    console.log("bearerToken:", loginData.accessToken);
    console.log("delteMaPhim:", maPhim);
    adminService
      .deleteMovieAction(maPhim, loginData.accessToken)
      .then((result) => {
        fetchListMovie();
        message.success("Delete success");
      })
      .catch((err) => {
        message.error("Delete fail");
      });
  };
  return (
    <div className="container py-10">
      {/* Add movie button */}
      <Button
        onClick={() => navigate("/admin/add-movie")}
        className="mb-5"
        type="primary"
      >
        + Add movie
      </Button>
      {/* Search bar */}
      <Form
        name="basic"
        form={form}
        initialValues={{}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          label=""
          name="tuKhoa"
        >
          <Space.Compact style={{ width: "100%" }}>
            <Input placeholder="Find movie name" />
            <Button type="primary" htmlType="submit">
              <SearchOutlined />
            </Button>
            <Button htmlType="button" onClick={onReset}>
              <ReloadOutlined />
            </Button>
          </Space.Compact>
        </Form.Item>
      </Form>
      {/* Table list user */}
      <Table dataSource={renderListMovie()} columns={columns} />
    </div>
  );
}
