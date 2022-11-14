import { ShoppingCartOutlined } from "@ant-design/icons";
import { Breadcrumb, Col, Layout, Menu, Row, Select } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import SearchBox from "../../../common/Search/components/SearchBox";
import DanhSachSanPham from "../san-pham/components/DanhSachSanPham";
import SanPham from "../san-pham/components/SanPham";
import "./ClientLayout.css";

const ClientLayout = () => {
  const { Header, Content, Footer } = Layout;
  const { danhSachSanPham } = useSelector((state) => state.reducerSanPham);

  return (
    <Layout className="client-layout" style={{ minHeight: "100vh" }}>
      <Header className="client-header" style={{ height: "45px" }}>
        <Row>
          <Col span={24}>
            <Menu
              style={{ height: "45px" }}
              mode="horizontal"
              defaultSelectedKeys={["1"]}
            >
              <Menu.Item>item 1</Menu.Item>
              <Menu.Item>item 2</Menu.Item>
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
          <Col offset={7} span={1}>
            <ShoppingCartOutlined style={{ color: "#fff", fontSize: "30px" }} />
          </Col>
        </Row>
      </Header>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <div className="site-layout-content">
          <DanhSachSanPham />
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
  );
};

export default ClientLayout;
