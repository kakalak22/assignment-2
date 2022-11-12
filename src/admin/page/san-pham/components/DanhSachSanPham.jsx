import { Button, Space } from "antd";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../actionsTypeSanpham";
import TableSanPham from "./TableSanPham";

const DanhSachSanPham = () => {
  const dispatch = useDispatch();
  const { danhSachSanPham } = useSelector((state) => state.reducerSanPham);
  useEffect(() => {
    if (danhSachSanPham.length < 1)
      dispatch({
        type: Actions.CALL_API,
      });
  }, []);
  return (
    <Space>
      <TableSanPham danhSachSanPham={danhSachSanPham} />
    </Space>
  );
};

export default DanhSachSanPham;
