import React, { useState } from "react";
import {
  Typography,
  Table,
  Image,
  Switch,
  Button,
  Space,
  Popover,
  Tooltip,
  Modal,
  Checkbox,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  DeleteOutlined,
  DeleteRowOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import * as Actions from "../actionsTypeSanpham";

const TableSanPham = ({ danhSachSanPham }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [sanPhamToDelete, setSanPhamToDelete] = useState([]);
  const hasSelected = selectedRowKeys.length > 0;

  const onSelectChange = (newSelectedRowKeys, newRecord) => {
    setSanPhamToDelete(newRecord);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const deleteMultiSanPham = () => {
    Modal.confirm({
      title: "Xác nhận xóa sản phẩm",
      onOk: () => {
        dispatch({
          type: Actions.SAN_PHAM_MULTI_DELETE,
          data: {
            sanPhamToDelete: sanPhamToDelete,
          },
        });
        Modal.destroyAll();
      },
    });
  };

  const deleteSanPham = (record) => {
    Modal.confirm({
      title: "Xác nhận xóa sản phẩm",
      onOk: () => {
        dispatch({
          type: Actions.SAN_PHAM_DELETE,
          data: {
            idSanPham: record.id,
          },
        });
        Modal.destroyAll();
      },
    });
  };

  const onSwitchChange = (record) => {
    console.log(record);
    dispatch({
      type: Actions.SAN_PHAM_CHANGE_STATUS,
      data: {
        idSanPham: record.id,
        hienThi: record.hienThi,
      },
    });
  };

  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "linkHinhAnh",
      key: "linkHinhAnh",
      render: (linkHinhAnh) => (
        <Image
          src={linkHinhAnh ? linkHinhAnh : "error"}
          fallback="https://apply.sts.net.pk/assets/images/default-upload-image.jpg"
          width={100}
          height={100}
        />
      ),
    },
    {
      title: "Tên sản phẩm",
      key: "ten",
      render: (record) => (
        <Link
          to={{
            pathname: `/admin/san-pham/chi-tiet-san-pham/${record.id}`,
          }}
          state={{ sanPham: record }}
          component={Typography.Link}
        >
          {record.ten}
        </Link>
      ),
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
      key: "hienThi",
      render: (record) => (
        <Switch
          onChange={() => onSwitchChange(record)}
          checked={record.hienThi}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space.Compact>
          <Tooltip placement="top" title="Chỉnh sửa sản phẩm">
            <Button
              shape="round"
              onClick={() => {
                navigate(`/admin/san-pham/chinh-sua-san-pham/${record.id}`);
              }}
            >
              <EditOutlined />
            </Button>
          </Tooltip>
          <Tooltip placement="top" title="Xóa sản phẩm">
            <Button shape="round" danger onClick={() => deleteSanPham(record)}>
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </Space.Compact>
      ),
    },
  ];
  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          marginTop: 8,
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "25px",
          width: "100%",
        }}
      >
        {hasSelected ? (
          <React.Fragment>
            <span
              style={{
                marginLeft: 8,
              }}
            >
              {`Selected ${selectedRowKeys.length} items`}
            </span>
            <Button onClick={deleteMultiSanPham} danger>
              Xóa sản phẩm đã chọn
            </Button>
          </React.Fragment>
        ) : null}
      </div>

      <Table
        style={{ width: "100%", textAlign: "center" }}
        columns={columns}
        dataSource={danhSachSanPham}
        rowKey={(record) => record.id}
        pagination={{ pageSizeOptions: [5, 10, 15], defaultPageSize: 5 }}
        rowSelection={rowSelection}
        size="middle"
      />
    </div>
  );
};

export default TableSanPham;
