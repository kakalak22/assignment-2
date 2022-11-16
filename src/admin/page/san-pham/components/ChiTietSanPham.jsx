import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as lodash from "lodash";
import {
  Col,
  Image,
  Row,
  Descriptions,
  Typography,
  Button,
  Divider,
} from "antd";

const ChiTietSanPham = () => {
  const location = useLocation();
  const id = useParams();
  const { Title } = Typography;
  const { danhSachSanPham } = useSelector((state) => state.reducerSanPham);
  const sanPham = lodash.find(danhSachSanPham, id);
  const navigate = useNavigate();
  const {
    id: idSanPham,
    ten,
    donGia,
    soLuongSanPham,
    hienThi,
    linkHinhAnh,
    moTa,
  } = sanPham;

  const handleEdit = () => {
    navigate(`/admin/san-pham/chinh-sua-san-pham/${idSanPham}`);
  };

  return (
    <div style={{ width: "100%" }}>
      <Row>
        <Col style={{ textAlign: "center" }} span={24}>
          <Title level={3}>{ten}</Title>
        </Col>
        <Divider />
        <Row
          style={{ marginBottom: "2rem", width: "100%" }}
          justify="center"
          align="middle"
        >
          <Col span={6}>
            <Image
              src={linkHinhAnh ? linkHinhAnh : "error"}
              fallback="https://apply.sts.net.pk/assets/images/default-upload-image.jpg"
              width={300}
              height={300}
            />
          </Col>
          <Col offset={2} span={14}>
            <Descriptions
              title="Chi tiết sản phẩm"
              bordered
              layout="horizontal"
              column={{
                xxl: 4,
                xl: 3,
                lg: 3,
                md: 3,
                sm: 2,
                xs: 1,
              }}
            >
              <Descriptions.Item label="Tên" span={3}>
                {ten}
              </Descriptions.Item>
              <Descriptions.Item label="Đơn giá">{donGia}</Descriptions.Item>
              <Descriptions.Item label="Số lượng sản phẩm">
                {soLuongSanPham}
              </Descriptions.Item>
              <Descriptions.Item label="Hiển thị">
                {hienThi ? "Có" : "Không"}
              </Descriptions.Item>
              <Descriptions.Item span={3} label="Mô tả">
                {moTa}
              </Descriptions.Item>
            </Descriptions>
            <Button onClick={handleEdit} type="primary">
              Chỉnh sửa sản phẩm
            </Button>
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default ChiTietSanPham;
