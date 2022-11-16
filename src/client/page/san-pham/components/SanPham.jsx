import React from "react";
import { Card, Image, Space } from "antd";
import { numberWithDot } from "../../../../utils/numberWithDot";
import { useNavigate } from "react-router-dom";

const SanPham = ({ sanPham }) => {
  let navigate = useNavigate();
  const handleNavigateDetail = () => {
    navigate(`/client/san-pham/${sanPham.id}`);
  };

  return (
    <Card onClick={handleNavigateDetail} className="item-card" size="small">
      <Space.Compact direction="vertical">
        <Image
          style={{
            // borderTopLeftRadius: "10px",
            // borderTopRightRadius: "10px",
            borderRadius: "10px",
          }}
          width={250}
          height={187.5}
          src={sanPham.linkHinhAnh ? sanPham.linkHinhAnh : "error"}
          fallback="https://apply.sts.net.pk/assets/images/default-upload-image.jpg"
          preview={false}
        />
        <Space
          direction="vertical"
          style={{
            // backgroundColor: "#f5f5f5",
            width: "100%",
            paddingTop: "25px",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
          }}
          size="small"
        >
          <h3>{sanPham.ten}</h3>
          <p>{numberWithDot(sanPham.donGia)} VND</p>
          <p>Số lượng: {sanPham.soLuongSanPham}</p>
        </Space>
      </Space.Compact>
    </Card>
  );
};

export default SanPham;
