import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Space,
  Typography,
  Upload,
  Checkbox,
  Switch,
} from "antd";

import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../actionsTypeSanpham";
import { storage } from "../../../../firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";

const FormChinhSuaSanPham = () => {
  const { id } = useParams();
  const danhSachSanPham = useSelector(
    (state) => state.reducerSanPham.danhSachSanPham
  );
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState();
  const [form] = Form.useForm();

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  useEffect(() => {
    const [sanPham] = danhSachSanPham.filter((sanPham) => sanPham.id === id);
    form.setFieldsValue(sanPham);
  }, [id]);

  const uploadImage = ({ onError, onSuccess, file }) => {
    if (file == null) return;
    const imageRef = ref(storage, `images/${file.name + uuidv4()}`);
    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((url) => {
          onSuccess(url);
          setImageUrl(url);
        })
        .catch((error) => onError(error));
    });
  };

  const onFieldsChange = (values, array) => {
    console.log(array);
  };

  const onFinish = (values) => {
    console.log(values);
    dispatch({
      type: Actions.SAN_PHAM_UPDATE,
      data: {
        sanPham: { id: id, linkHinhAnh: imageUrl, ...values },
      },
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const { Title } = Typography;

  const validateTen = (ten) => {
    const tenLength = ten?.trim().length;
    if (tenLength > 0 && tenLength >= 6) return Promise.resolve();
    return Promise.reject();
  };

  const validateNumber = (value) => {
    if (value >= 0) return Promise.resolve();
    return Promise.reject();
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Title> Chỉnh sửa sản phẩm </Title>
      <Divider />
      <Form
        form={form}
        style={{
          width: "60%",
        }}
        // layout="vertical"
        colon={true}
        labelAlign="left"
        name="updateForm"
        labelCol={{
          offset: 4,
          span: 6,
        }}
        wrapperCol={{
          offset: 1,
          span: 13,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onFieldsChange={onFieldsChange}
        autoComplete="off"
      >
        <Form.Item
          name="upload"
          label="Hình ảnh"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload customRequest={uploadImage} name="logo" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          label="Tên Sản Phẩm"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên!",
            },
            {
              message: "Tên phải có từ 0-6 ký tự",
              validator: (_, value) => validateTen(value),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Đơn giá"
          name="donGia"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập đơn giá!",
            },
            {
              message: "Đơn giá phải lớn hơn 0",
              validator: (_, value) => validateNumber(value),
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Số lượng sản phẩm"
          name="soLuongSanPham"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tiền số lượng",
            },
            {
              message: "Số lượng phải lớn hơn bằng 0",
              validator: (_, value) => validateNumber(value),
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item name="moTa" label="Mô tả sản phẩm" initialValue={""}>
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Hiển thị"
          name="hienThi"
          initialValue={false}
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 9,
            span: 15,
          }}
        >
          <Button size="large" shape="round" type="primary" htmlType="submit">
            Chỉnh sửa sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormChinhSuaSanPham;
