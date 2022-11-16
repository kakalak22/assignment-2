import React from "react";

const FormSanPham = () => {
  return (
    <Form
      form={form}
      style={{
        width: "80%",
      }}
      // layout="vertical"
      colon={true}
      labelAlign="left"
      name="basic"
      labelCol={{
        span: 5,
      }}
      wrapperCol={{
        span: 19,
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
        <Checkbox></Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 10,
          span: 14,
        }}
      >
        <Button size="large" shape="round" type="primary" htmlType="submit">
          Tạo sản phẩm
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormSanPham;
