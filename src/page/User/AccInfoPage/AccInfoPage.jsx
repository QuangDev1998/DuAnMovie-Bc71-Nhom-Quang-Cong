import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { Button, Tabs, Modal, Form, Col, Input, Row, message } from "antd";
import { useNavigate } from "react-router-dom";
import { userService } from "../../../service/userService";

export default function AccInfoPage() {
  let navigate = useNavigate();
  let loginData = useSelector((state) => state.userSlice.loginData);
  console.log("🚀 ~ AccInfoPage ~ loginData:", loginData);
  // console.log("loginData.accessToken:", loginData.accessToken);
  const [accInfo, setAccInfo] = useState({});
  // ham call api get AccInfo
  let fetchAccInfo = () => {
    userService
      .getInfoAccAction(loginData.accessToken)
      .then((result) => {
        setAccInfo(result.data.content);
        console.log("accinfo:", accInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // call api getInfoAcc 1st
  useEffect(() => {
    fetchAccInfo();
  }, []);

  // ham render
  let renderInfo = () => {
    let { email, hoTen, soDT, taiKhoan, matKhau, maLoaiNguoiDung } = accInfo;
    return (
      <div>
        {/* show acc info */}
        <div className="grid grid-cols-2 ">
          <div>
            <p>{`Email: ${email}`}</p>
            <p>{`Name: ${hoTen}`}</p>
            <p>{`Phone: ${soDT}`}</p>
          </div>
          <div>
            <p>{`Username: ${taiKhoan}`}</p>
            <p>{`Password: ${matKhau}`}</p>
            <p>{`Type: ${maLoaiNguoiDung}`}</p>
          </div>
        </div>
        {/* edit button  */}
        <Button
          type="primary"
          onClick={() => setOpen(true)}
          color="default"
          variant="solid"
        >
          Edit
        </Button>
      </div>
    );
  };

  // Tab data
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "Info",
      children: renderInfo(),
    },
    {
      key: "2",
      label: "History",
      children: "[]",
    },
  ];

  // Modal data
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState();
  const [open, setOpen] = useState(false);
  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setFormValues(values);
    userService
      .updateAccInfoAction(values, loginData.accessToken)
      .then((result) => {
        fetchAccInfo();
        message.success("Update success");
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
  };
  return (
    <div className="container py-20">
      <Tabs
        type="card"
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
      {/* modal show */}
      <Modal
        open={open}
        title="Edit info"
        okText="Update"
        cancelText="Cancel"
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
        }}
        onCancel={() => setOpen(false)}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            initialValues={{
              taiKhoan: accInfo.taiKhoan,
              matKhau: accInfo.matKhau,
              hoTen: accInfo.hoTen,
              email: accInfo.email,
              soDT: accInfo.soDT,
              maNhom: accInfo.maNhom,
              maLoaiNguoiDung: accInfo.maLoaiNguoiDung,
            }}
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
