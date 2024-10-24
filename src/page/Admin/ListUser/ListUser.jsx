import {
  Button,
  Table,
  Tag,
  Form,
  Input,
  Space,
  Modal,
  message,
  Col,
  Row,
} from "antd";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminService } from "../../../service/adminService";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";

export default function ListUser() {
  let navigate = useNavigate();
  const [listUser, setlistUser] = useState([]);
  let loginData = useSelector((state) => state.userSlice.loginData);

  const [accInfo, setAccInfo] = useState({});
  console.log("🚀 ~ ListUser ~ accInfo:", accInfo);
  // ham call api get infoUser
  let fetchUserInfo = (taiKhoan, bearerToken) => {
    adminService
      .getInfoUserAction(taiKhoan, bearerToken)
      .then((result) => {
        setAccInfo(result.data.content);
        console.log("accInfo:", accInfo);
        setOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let renderInitialValue = () => {
    return {
      taiKhoan: accInfo.taiKhoan,
      matKhau: accInfo.matKhau,
      hoTen: accInfo.hoTen,
      email: accInfo.email,
      soDT: accInfo.soDT,
      maNhom: accInfo.maNhom,
      maLoaiNguoiDung: accInfo.maLoaiNguoiDung,
    };
  };
  //  call api get listUser
  let fetchListUser = () => {
    adminService
      .userListAction()
      .then((result) => {
        setlistUser(result.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // call api get listUser 1st
  useEffect(() => {
    fetchListUser();
  }, []);
  // Form data
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
    fetchListUser();
  };
  const onFinish = (values) => {
    console.log("Success:", values.tuKhoa);

    if (values.tuKhoa === "") {
      fetchListUser();
    } else {
      adminService
        .searchUserAction(values.tuKhoa)
        .then((result) => {
          console.log(result);
          setlistUser(result.data.content);
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
      title: "Ten user",
      dataIndex: "hoTen",
      key: "name",
    },
    {
      title: "Tai khoan user",
      dataIndex: "taiKhoan",
      key: "account",
    },
    {
      title: "Loai ",
      dataIndex: "maLoaiNguoiDung",
      key: "age",
      render: (_, user) => {
        if (_ === "QuanTri") {
          return <Tag color="red">QuanTri</Tag>;
        } else {
          return <Tag color="blue">KhachHang</Tag>;
        }
      },
    },
    {
      title: "Thao tac",

      key: "action",
      render: (_, dataObject) => {
        return (
          <div>
            <Button
              onClick={() => handleDeleteUser(dataObject.taiKhoan)}
              color="danger"
              variant="solid"
              className="mr-2"
            >
              <DeleteOutlined />
            </Button>
            <Button
              onClick={() => {
                fetchUserInfo(dataObject.taiKhoan, loginData.accessToken);
                // setOpen(true);
              }}
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
  // Modal data

  const [formValues, setFormValues] = useState();
  const [open, setOpen] = useState(false);
  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setFormValues(values);
    adminService
      .updateUserInfoAction(values, loginData.accessToken)
      .then((result) => {
        message.success("Update success");
        fetchListUser();
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
    // setOpen(false);
  };
  //method
  let renderListUser = () => {
    return listUser.map((user, index) => {
      return {
        key: index,
        hoTen: user.hoTen,
        maLoaiNguoiDung: user.maLoaiNguoiDung,
        taiKhoan: user.taiKhoan,
      };
    });
  };
  let handleDeleteUser = (taiKhoan) => {
    adminService
      .userDeleteAction(taiKhoan, loginData.accessToken)
      .then((result) => {
        fetchListUser();
        message.success("Delete success");
      })
      .catch((err) => {
        console.log("delete-err:", err);
        message.err("Delete fail");
      });
  };
  return (
    <div className="container py-10">
      {/* Add user button */}
      <Button
        onClick={() => navigate("/admin/add-user")}
        className="mb-5"
        type="primary"
      >
        Add user
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
            <Input placeholder="Find username" />
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
      <Table dataSource={renderListUser()} columns={columns} />
      {/* Modal */}
      <Modal
        open={open}
        title="Edit info"
        okText="Update"
        cancelText="Cancel"
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
        }}
        onCancel={() => {
          setOpen(false);
        }}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            initialValues={renderInitialValue()}
            clearOnDestroy
            onFinish={(values) => onCreate(values)}
          >
            {dom}
          </Form>
        )}
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
              <Input disabled />
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
              <Input />
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
            {/* soDT */}
            <Form.Item
              name="soDT"
              label="Phone"
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
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
            {/* maLoaiNguoiDung */}
            <Form.Item name="maLoaiNguoiDung" label="Type">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
      </Modal>
    </div>
  );
}
