import React from "react";
import { Card, Image } from "antd";

const SanPham = ({ sanPham }) => {
  return (
    <Card className="item-card" size="small">
      <Image width={250} height={187.5} src={sanPham.linkHinhAnh} />
      <h3>{sanPham.ten}</h3>
      <p>${sanPham.donGia}</p>
      <p>{sanPham.soLuongSanPham}</p>
    </Card>
  );
};

export default SanPham;
