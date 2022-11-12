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
  const { Title } = Typography;
  // const navigatePage = (key) => {
  //   const newKey = parseInt(key);
  //   console.log(newKey);
  //   switch (newKey) {
  //     case 1: {
  //       navigate("/");
  //     }

  //     case 2: {
  //       navigate("/gio-hang");
  //     }

  //     case 3: {
  //       navigate("/tao-san-pham");
  //     }

  //     case 4: {
  //       navigate("/danh-sach-don-hang");
  //     }

  //     default: {
  //       navigate("/");
  //     }
  //   }
  // };

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
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          // items={items}
          // onClick={({ key }) => {
          //   navigatePage(key);
          // }}
        >
          <Menu.Item
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
            margin: "0 16px",
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {children}
          </div>
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
