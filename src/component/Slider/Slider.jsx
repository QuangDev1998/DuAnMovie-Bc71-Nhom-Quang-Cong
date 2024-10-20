import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { NavLink } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Admin", "sub1", <UserOutlined />, [
    getItem(<NavLink to={"/admin/list-user"}>List User</NavLink>, "3"),
    getItem(<NavLink to={"/admin/add-user"}>Add User</NavLink>, "4"),
    getItem("List Film", "5"),
    getItem("Add Film", "6"),
  ]),
];
const Slider = ({ content }) => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Content className="bg-white">
          <div>{content}</div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Slider;
