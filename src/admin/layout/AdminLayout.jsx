import { CarryOutFilled, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Layout,
  Menu,
  Popover,
  Row,
  Space,
  Typography,
} from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import * as Actions from "../../auth/actionTypesAuth";
import "./AdminLayout.css";

const AdminLayout = ({ children }) => {
  const { Header, Content, Footer, Sider } = Layout;
  const { Title } = Typography;

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch({
      type: Actions.AUTH_LOGOUT,
      navigate: navigate,
    });
  };

  const content = (
    <Space direction="vertical">
      <Title level={5}>Admin</Title>
      <Button onClick={handleLogOut}>Đăng xuất</Button>
    </Space>
  );

  return (
    <Layout
      className="admin-layout"
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
          <Menu.Item
            icon={<CarryOutFilled />}
            key="preview"
            onClick={() => navigate("/admin/san-pham/preview")}
          >
            Xem trước trang người dùng
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-header-layout-background"
          style={{
            padding: 0,
            backgroundColor: "#ffffff",
          }}
        >
          <Row style={{ width: "100%" }}>
            <Col offset={22} span={2}>
              <Popover content={content}>
                <UserOutlined
                  style={{
                    cursor: "pointer",
                    color: "#1890ff",
                    fontSize: "25px",
                  }}
                />
              </Popover>
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            margin: "0px 40px",
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
