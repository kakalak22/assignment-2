import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as lodash from "lodash";
import {
  Col,
  Image,
  Row,
  Typography,
  Form,
  InputNumber,
  Space,
  Button,
  Divider,
} from "antd";
import { numberWithDot } from "../../../../utils/numberWithDot";
import {
  MinusOutlined,
  PlusCircleFilled,
  PlusOutlined,
} from "@ant-design/icons";
import * as Actions from "../../../../common/actionTypesSearch";

const ChiTietSanPhamClient = () => {
  const id = useParams();
  const dispatch = useDispatch();
  const { danhSachSanPham } = useSelector((state) => state.reducerSanPham);

  const sanPham = lodash.find(danhSachSanPham, id);
  const { Title, Paragraph } = Typography;
  const [form] = Form.useForm();
  const [quantity, setQuantity] = useState(1);
  const { ten, donGia, soLuongSanPham, linkHinhAnh, moTa } = sanPham;

  const onIncrease = () => {
    const newQuantity = form.getFieldValue("soLuong");
    form.setFieldValue("soLuong", newQuantity + 1);
  };
  const onDecrease = () => {
    const newQuantity = form.getFieldValue("soLuong");
    if (newQuantity > 0) form.setFieldValue("soLuong", newQuantity - 1);
  };

  const onFinish = (values) => {
    dispatch({
      type: Actions.ADD_TO_CART,
      data: {
        sanPham: { ...sanPham },
      },
    });
  };

  const onFinishFailed = (error) => {
    console.log(error);
  };

  return (
    <React.Fragment>
      <Title level={1}>Chi Tiết Sản Phẩm</Title>
      <Divider />
      <div className="product-detail-container">
        <div className="product-detail-wrapper">
          <Row align="middle" justify="center">
            <Col className="product-detail-image" span={6}>
              <Image
                width={400}
                height={400}
                src={linkHinhAnh ? linkHinhAnh : "error"}
                fallback="https://apply.sts.net.pk/assets/images/default-upload-image.jpg"
              />
            </Col>
            <Col offset={3} span={15}>
              <Title level={2}>{ten}</Title>
              <Title level={3}>{numberWithDot(donGia)} VND</Title>
              <Paragraph>
                Tồn kho: <span>{soLuongSanPham}</span>
              </Paragraph>
              <Paragraph>{moTa}</Paragraph>
              <Form
                form={form}
                name="myCart"
                layout="horizontal"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Space>
                  <Form.Item
                    className="quantity-input"
                    initialValue={1}
                    name="soLuong"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số lượng!",
                      },
                    ]}
                  >
                    <InputNumber
                      style={{
                        width: "160px",
                        height: "41px",
                        textAlign: "center",
                        cursor: "pointer  ",
                      }}
                      size="large"
                      min={0}
                      controls={false}
                      addonBefore={
                        <Button
                          onClick={onDecrease}
                          style={{
                            backgroundColor: "#fb5321",
                            border: "unset",
                            color: "#ffffff",
                          }}
                        >
                          <MinusOutlined />
                        </Button>
                      }
                      addonAfter={
                        <Button
                          onClick={onIncrease}
                          style={{
                            backgroundColor: "#fb5321",
                            border: "unset",
                            color: "#ffffff",
                          }}
                        >
                          <PlusOutlined />
                        </Button>
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    wrapperCol={{
                      span: 25,
                    }}
                  >
                    <Button
                      shape="round"
                      style={{
                        height: "41px",
                        backgroundColor: "#fb5231",
                        color: "#ffffff",
                      }}
                      htmlType="submit"
                    >
                      Thêm vào giỏ hàng
                    </Button>
                  </Form.Item>
                </Space>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChiTietSanPhamClient;
