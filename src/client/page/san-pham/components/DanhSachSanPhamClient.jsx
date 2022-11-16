import {
  Button,
  Divider,
  Form,
  InputNumber,
  notification,
  Pagination,
  Select,
  Space,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SanPham from "./SanPham";
import * as lodash from "lodash";
import * as Actions from "../../../../admin/page/san-pham/actionsTypeSanpham";
import Loading from "../../../../common/components/Loading";

const DanhSachSanPhamClient = () => {
  const { danhSachSanPham } = useSelector((state) => state.reducerSanPham);
  const { searchResults } = useSelector((state) => state.reducerSearchResults);
  const dispatch = useDispatch();

  //local state
  const [loading, setLoading] = useState(false);
  const [pageTotal, setPageTotal] = useState(danhSachSanPham.length);
  const [filteredDanhSachSanPham, setFilteredDanhSachSanPham] = useState([]);
  const [paginatedList, setPaginatedList] = useState([]);
  const [selectedValue, setSelectedValue] = useState();

  const onFinish = (values) => {
    const { from, to } = values;
    if (from > to) {
      notification.error({
        message: "Lỗi",
        description: "Giá từ không được lớn hơn giá đến",
        placement: "bottomRight",
      });
      return;
    }
    if (from <= to) {
      let newDanhSachSanPham = [];
      if (searchResults?.length > 0) {
        newDanhSachSanPham = searchResults
          .filter((sanPham) => sanPham.donGia >= from && sanPham.donGia <= to)
          .filter((sanPham) => sanPham.hienThi);
      } else {
        newDanhSachSanPham = danhSachSanPham
          .filter((sanPham) => sanPham.donGia >= from && sanPham.donGia <= to)
          .filter((sanPham) => sanPham.hienThi);
      }
      const temp = lodash(newDanhSachSanPham).slice(0).take(8).value();
      setPaginatedList(temp);
      setFilteredDanhSachSanPham(newDanhSachSanPham);
      setPageTotal(newDanhSachSanPham.length);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onSelect = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    if (danhSachSanPham.length < 1) {
      dispatch({
        type: Actions.CALL_API,
      });
    }
    if (danhSachSanPham.length > 0) {
      const newDanhSachSanPham = danhSachSanPham.filter(
        (sanPham) => sanPham.hienThi
      );
      const temp = lodash(newDanhSachSanPham).slice(0).take(8).value();
      setPaginatedList(temp);
      setFilteredDanhSachSanPham(newDanhSachSanPham);
    }
    setLoading(false);
  }, [danhSachSanPham]);

  useEffect(() => {
    if (selectedValue) {
      let newDanhSachSanPham = [];
      switch (selectedValue) {
        case "conHang": {
          newDanhSachSanPham =
            searchResults?.length > 0
              ? searchResults
                  .filter((sanPham) => sanPham.soLuongSanPham > 0)
                  .filter((sanPham) => sanPham.hienThi)
              : danhSachSanPham
                  .filter((sanPham) => sanPham.soLuongSanPham > 0)
                  .filter((sanPham) => sanPham.hienThi);
          break;
        }
        case "hetHang": {
          newDanhSachSanPham =
            searchResults?.length > 0
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
    if (searchResults?.length > 0) {
      const newDanhSachSanPham = searchResults.filter(
        (sanPham) => sanPham.hienThi
      );
      const temp = lodash(newDanhSachSanPham).slice(0).take(8).value();
      console.log(temp);
      setPaginatedList(temp);
      setFilteredDanhSachSanPham(newDanhSachSanPham);
      setPageTotal(searchResults?.length);
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

  if (loading) return <Loading />;

  return (
    <React.Fragment>
      <Space.Compact>
        <Select
          showArrow={false}
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
        <Form
          name="myCart"
          layout="horizontal"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 25,
          }}
          initialValues={{
            remember: true,
            soLuong: 1,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Space.Compact>
            <Form.Item
              name="from"
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                offset: 0,
                span: 25,
              }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập đơn giá!",
                },
              ]}
            >
              <InputNumber placeholder="Giá từ" />
            </Form.Item>
            <Form.Item
              name="to"
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                offset: 0,
                span: 25,
              }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập đơn giá!",
                },
              ]}
            >
              <InputNumber placeholder="Giá đến" />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                span: 25,
              }}
            >
              <Button type="primary" htmlType="submit">
                Lọc theo giá
              </Button>
            </Form.Item>
          </Space.Compact>
        </Form>
      </Space.Compact>
      <Divider />
      <Space
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

export default DanhSachSanPhamClient;
