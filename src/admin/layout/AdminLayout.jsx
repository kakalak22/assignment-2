import {
  CarryOutFilled,
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  PlusOutlined,
  PlusSquareFilled,
  ProfileFilled,
  ShoppingCartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Button, Layout, Menu, Typography } from "antd";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const { Header, Content, Footer, Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

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
        <div className="logo"></div>
        <Menu defaultSelectedKeys={["danh-sach-san-pham"]} mode="inline">
          <Menu.Item
            className="menu-item"
            icon={<CarryOutFilled />}
            key="danh-sach-san-pham"
            onClick={() => navigate("/admin/san-pham/danh-sach-san-pham")}
          >
            Danh sách sản phẩm
          </Menu.Item>
          <Menu.Item
            icon={<CarryOutFilled />}
            key="tao-san-pham"
            onClick={() => navigate("/admin/san-pham/tao-san-pham")}
          >
            Tạo sản phẩm
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content
          style={{
            margin: "40px 40px",
          }}
        >
          <div className="site-layout-background">{children}</div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
      <Outlet />
    </Layout>
  );
};

export default AdminLayout;
