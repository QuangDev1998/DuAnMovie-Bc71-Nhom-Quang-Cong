import { useState, useEffect } from "react";
import { Button, Form, Input, Modal, Radio, Col, Row } from "antd";
import { useSelector } from "react-redux";
import { userService } from "../../../service/userService";

export default function FormInModal() {
  let loginData = useSelector((state) => state.userSlice.loginData);
  const [accInfo, setAccInfo] = useState({});
  // call api getInfoAcc
  useEffect(() => {
    userService
      .getInfoAccAction(loginData.accessToken)
      .then((result) => {
        setAccInfo(result.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState();
  const [open, setOpen] = useState(false);
  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setFormValues(values);
    setOpen(false);
  };
  return (
    <div>
      <Button type="primary" onClick={() => setOpen(true)}>
        New Collection
      </Button>
      <pre>{JSON.stringify(formValues, null, 2)}</pre>
      <Modal
        open={open}
        title="Create a new collection"
        okText="Create"
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
              <Input disabled />
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
              ]}
              hasFeedback
            >
              <Input
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Modal>
    </div>
  );
}
