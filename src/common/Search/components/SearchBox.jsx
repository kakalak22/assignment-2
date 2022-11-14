import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import React, { useEffect, useState } from "react";
import { Radio, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../actionTypesSearch";
const { Search } = Input;

const SearchBox = ({ size, isSeclect, searchField }) => {
  const dispatch = useDispatch();
  const [searchVal, setSearchVal] = useState("");
  const [selectedValue, setSelectedValue] = useState("ten");

  const onSelect = (value) => {
    setSelectedValue(value);
  };

  const { danhSachSanPham } = useSelector((state) => state.reducerSanPham);
  const { searchResults } = useSelector((state) => state.reducersearchResults);

  // useEffect(() => {
  //   if (searchResults.length > 0) {
  //     dispatch({
  //       type: Actions.SEARCH_PROCESS,
  //       data: {
  //         searchValue: searchVal,
  //         ttype: selectedValue,
  //         searchField: searchField,
  //       },
  //     });
  //   }
  // }, [danhSachSanPham]);

  const onSearch = (value) => {
    setSearchVal(value);
    dispatch({
      type: Actions.SEARCH_PROCESS,
      data: {
        searchValue: value,
        ttype: selectedValue,
        searchField: searchField,
      },
    });
  };

  return (
    <Space.Compact size={size} direction="horizontal">
      {isSeclect ? (
        <Select
          defaultValue="ten"
          style={{
            width: 120,
          }}
          dropdownMatchSelectWidth={true}
          placement="bottomLeft"
          options={[
            {
              value: "soLuongLonHon",
              label: "Số lượng lớn hơn hoặc bằng",
            },
            {
              value: "soLuongNhoHon",
              label: "Số lượng nhỏ hơn hoặc bằng",
            },
            {
              value: "ten",
              label: "Tên",
            },
          ]}
          onChange={onSelect}
        />
      ) : null}
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="middle"
        onSearch={onSearch}
      />
    </Space.Compact>
  );
};
export default SearchBox;
