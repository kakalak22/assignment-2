import { Button, Space, Typography } from "antd";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "../../../../common/components/SearchBox";
import * as Actions from "../actionsTypeSanpham";
import TableSanPham from "./TableSanPham";

const DanhSachSanPham = () => {
  const dispatch = useDispatch();
  const { danhSachSanPham } = useSelector((state) => state.reducerSanPham);
  const { searchResults } = useSelector((state) => state.reducerSearchResults);
  useEffect(() => {
    if (danhSachSanPham.length < 1)
      dispatch({
        type: Actions.CALL_API,
      });
  }, []);
  const { Title } = Typography;
  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Title level={3}>Danh Sách Sản Phẩm</Title>
        <SearchBox
          searchField={danhSachSanPham}
          size={"middle"}
          isSeclect={true}
        />
      </div>
      <TableSanPham
        danhSachSanPham={
          searchResults?.length > 0 ? searchResults : danhSachSanPham
        }
      />
    </div>
  );
};

export default DanhSachSanPham;
