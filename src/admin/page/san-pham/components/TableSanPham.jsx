import React from "react";
import { Typography, Table, Image, Switch, Button } from "antd";
import { useNavigate } from "react-router-dom";

const TableSanPham = ({ danhSachSanPham }) => {
  let navigate = useNavigate();
  const { Title, Text } = Typography;
  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "linkHinhAnh",
      key: "linkHinhAnh",
      render: (linkHinhAnh) => (
        <Image src={linkHinhAnh} width={150} height={150} />
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: "Đơn giá",
      dataIndex: "donGia",
      key: "donGia",
    },
    {
      title: "Số lượng sản phẩm",
      dataIndex: "soLuongSanPham",
      key: "soLuongSanPham",
    },
    {
      title: "Hiển thị",
      dataIndex: "hienThi",
      key: "hienThi",
      render: (hienThi) => <Switch checked={hienThi} />,
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Button
          onClick={() => {
            navigate(`/admin/san-pham/chinh-sua-san-pham/${record.id}`);
          }}
        >
          Chỉnh sửa
        </Button>
      ),
    },
  ];
  return (
    <Table
      style={{ width: "100%" }}
      columns={columns}
      dataSource={danhSachSanPham}
      rowKey={(record) => record.id}
      pagination="bottomRight"
    />
  );
};

export default TableSanPham;
