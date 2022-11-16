import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import {
  Badge,
  Breadcrumb,
  Button,
  Col,
  Divider,
  Layout,
  Menu,
  Popover,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import SearchBox from "../../../common/components/SearchBox";
import "./ClientLayout.css";
import * as Actions from "../../../auth/actionTypesAuth";

const ClientLayout = ({ children }) => {
  const [count, setCount] = useState(0);
  const { Header, Content, Footer } = Layout;
  const { danhSachSanPham } = useSelector((state) => state.reducerSanPham);
  const { Title } = Typography;
  const { danhSachSanPham: danhSachMycart } = useSelector(
    (state) => state.reducerMyCart.myCart
  );
  console.log(danhSachMycart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch({
      type: Actions.AUTH_LOGOUT,
      navigate: navigate,
    });
  };

  const content = (
    <Space direction="vertical">
      <Title level={5}>Client</Title>
      <Button onClick={handleLogOut}>Đăng xuất</Button>
    </Space>
  );

  useEffect(() => {
    if (danhSachMycart) setCount(danhSachMycart.length);
  }, [danhSachMycart]);

  return (
    <Layout className="client-layout" style={{ minHeight: "100vh" }}>
      <Header className="client-header" style={{ height: "45px" }}>
        <Row>
          <Col span={24}>
            <Menu
              style={{ height: "45px" }}
              mode="horizontal"
              defaultSelectedKeys={["home"]}
              className="client-menu"
            >
              <Menu.Item onClick={() => navigate("/client")} key={"home"}>
                Home
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </Header>
      <Header style={{ height: "75px" }}>
        <Row style={{ height: "75px" }} justify="center" align="middle">
          <Col span={8}>
            <div className="logo"></div>
          </Col>
          <Col span={8}>
            <SearchBox searchField={danhSachSanPham} size="large" />
          </Col>
          <Col offset={6} span={1}>
            <Popover content={content}>
              <UserOutlined
                style={{ cursor: "pointer", color: "#fff", fontSize: "30px" }}
              />
            </Popover>
          </Col>
          <Col span={1}>
            <Badge
              style={{ color: "#000000", fontWeight: 600 }}
              count={count}
              color="#ffffff"
            >
              <ShoppingCartOutlined
                style={{ color: "#fff", fontSize: "30px" }}
              />
            </Badge>
          </Col>
        </Row>
      </Header>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©2018 Created by Ant UED
      </Footer>
      <Outlet />
    </Layout>
  );
};

export default ClientLayout;
