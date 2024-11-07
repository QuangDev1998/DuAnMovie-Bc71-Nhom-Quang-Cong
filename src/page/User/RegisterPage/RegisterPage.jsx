import React, { useState } from "react";
import { Button, Checkbox, Col, Form, Input, Modal, Row, Select } from "antd";
import { userService } from "../../../service/userService";
import { useNavigate } from "react-router-dom";
import bgImg from "../../../asset/movie-poster-bg.jpg";
import verifiedIcon from "../../../asset/verified-icon.gif";
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
const RegisterPage = () => {
  let navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    userService
      .registerAction(values)
      .then((result) => {
        console.log("Reg res:", result);
        setModalOpen(true);
        // navigate("/login");
      })
      .catch((err) => {
        console.log(err);
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

  return (
    <div className="">
      {/* background image */}
      <div
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          filter: "blur(1px) brightness(30%)",
        }}
        className="h-screen w-screen z-0 fixed top-0 left-0"
      ></div>
      <div className="z-10 fixed top-0 left-0 h-screen w-screen flex justify-center items-center ">
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          className="bg-white p-5 border-solid rounded"
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
            </Col>
          </Row>
          {/* agree checkbox */}
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
            {...tailFormItemLayout}
            wrapperCol={{ offset: 9, span: 24 }}
            className="mb-0"
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item>
          {/* register button */}
          <Form.Item
            {...tailFormItemLayout}
            wrapperCol={{ offset: 11, span: 24 }}
            className="my-2"
          >
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
          <Form.Item className="mb-0" wrapperCol={{ offset: 10, span: 24 }}>
            <a clasnm onClick={() => navigate("/login")} href="">
              Already have account ?
            </a>
          </Form.Item>
        </Form>
        {/* modal */}
        <Modal
          centered
          open={modalOpen}
          onOk={() => setModalOpen(false)}
          onCancel={() => setModalOpen(false)}
          footer={null}
        >
          <img
            className=" mx-auto"
            style={{ height: "80px" }}
            src={verifiedIcon}
            alt=""
          />
          <p className="text-2xl text-center my-5">Register success!</p>

          <Button
            className="w-full "
            type="primary"
            onClick={() => navigate("/login")}
          >
            Back to login
          </Button>
        </Modal>
      </div>
    </div>
  );
};
// modal data
export default RegisterPage;
