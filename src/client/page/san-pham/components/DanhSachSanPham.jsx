import { Divider, Pagination, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SanPham from "./SanPham";
import * as lodash from "lodash";

const DanhSachSanPham = () => {
  const { danhSachSanPham } = useSelector((state) => state.reducerSanPham);
  const { searchResults } = useSelector((state) => state.reducersearchResults);

  //local state
  const [pageTotal, setPageTotal] = useState(danhSachSanPham.length);
  const [filteredDanhSachSanPham, setFilteredDanhSachSanPham] = useState([]);
  const [paginatedList, setPaginatedList] = useState([]);
  const [selectedValue, setSelectedValue] = useState();

  const onSelect = (value) => {
    setSelectedValue(value);
    // let newDanhSachSanPham = [];
    // switch (value) {
    //   case "conHang": {
    //     newDanhSachSanPham = filteredDanhSachSanPham.filter(
    //       (sanPham) => sanPham.soLuongSanPham > 0
    //     );
    //     break;
    //   }
    //   case "hetHang": {
    //     newDanhSachSanPham = filteredDanhSachSanPham.filter(
    //       (sanPham) => sanPham.soLuongSanPham < 1
    //     );
    //     break;
    //   }

    //   default: {
    //     break;
    //   }
    // }
    // const temp = lodash(newDanhSachSanPham).slice(0).take(8).value();
    // setPaginatedList(temp);
    // setFilteredDanhSachSanPham(newDanhSachSanPham);
    // setPageTotal(newDanhSachSanPham.length);
  };

  useEffect(() => {
    const newDanhSachSanPham = danhSachSanPham.filter(
      (sanPham) => sanPham.hienThi
    );
    const temp = lodash(newDanhSachSanPham).slice(0).take(8).value();
    setPaginatedList(temp);
    setFilteredDanhSachSanPham(newDanhSachSanPham);
  }, []);

  useEffect(() => {
    if (selectedValue) {
      let newDanhSachSanPham = [];
      switch (selectedValue) {
        case "conHang": {
          newDanhSachSanPham = searchResults
            ? searchResults
                .filter((sanPham) => sanPham.soLuongSanPham > 0)
                .filter((sanPham) => sanPham.hienThi)
            : danhSachSanPham
                .filter((sanPham) => sanPham.soLuongSanPham > 0)
                .filter((sanPham) => sanPham.hienThi);
          break;
        }
        case "hetHang": {
          newDanhSachSanPham = searchResults
            ? searchResults
                .filter((sanPham) => sanPham.soLuongSanPham === 0)
                .filter((sanPham) => sanPham.hienThi)
            : danhSachSanPham
                .filter((sanPham) => sanPham.soLuongSanPham === 0)
                .filter((sanPham) => sanPham.hienThi);
          break;
        }

        default: {
          break;
        }
      }
      const temp = lodash(newDanhSachSanPham).slice(0).take(8).value();
      setPaginatedList(temp);
      setFilteredDanhSachSanPham(newDanhSachSanPham);
      setPageTotal(newDanhSachSanPham.length);
    }
  }, [selectedValue]);

  useEffect(() => {
    if (searchResults.length > 0) {
      const newDanhSachSanPham = searchResults.filter(
        (sanPham) => sanPham.hienThi
      );
      const temp = lodash(newDanhSachSanPham).slice(0).take(8).value();
      console.log(temp);
      setPaginatedList(temp);
      setFilteredDanhSachSanPham(newDanhSachSanPham);
      setPageTotal(searchResults.length);
    }
  }, [searchResults]);

  const onPageChange = (pageNumber, pageSize) => {
    const startIndex = pageNumber * pageSize - pageSize;
    const temp = lodash(filteredDanhSachSanPham)
      .slice(startIndex)
      .take(pageSize)
      .value();
    setPaginatedList(temp);
  };

  return (
    <React.Fragment>
      <Select
        style={{
          width: 120,
        }}
        placeholder="Trạng thái"
        dropdownMatchSelectWidth={true}
        placement="bottomLeft"
        options={[
          {
            value: "conHang",
            label: "Còn hàng",
          },
          {
            value: "hetHang",
            label: "Hết hàng",
          },
        ]}
        onChange={onSelect}
      />
      <Divider />
      <Space
        direction="horizontal"
        size="large"
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {danhSachSanPham
          ? paginatedList.map((sanPham, index) => (
              <SanPham key={index} sanPham={sanPham} />
            ))
          : null}
      </Space>
      <Divider />
      <Pagination
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        defaultPageSize={8}
        onChange={onPageChange}
        total={pageTotal}
        pageSizeOptions={[4, 8, 12, 16]}
      />
    </React.Fragment>
  );
};

export default DanhSachSanPham;
