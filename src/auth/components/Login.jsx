import {
  Button,
  Card,
  Checkbox,
  Divider,
  Form,
  Input,
  Space,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../actionTypesAuth";
import backgroundImg from "../../assets/login/bg.jpg";
import { useNavigate } from "react-router-dom";
import Loading from "../../common/components/Loading";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Title } = Typography;
  const [loading, setLoading] = useState(true);

  const { isAdmin, isUser, isLogin } = useSelector(
    (state) => state.reducerAuth
  );

  const onFinish = (values) => {
    console.log("Success:", values);
    dispatch({
      type: Actions.AUTH_CHECK_LOGIN,
      data: {
        user: values,
      },
      navigate,
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (isLogin) {
      if (isUser) {
        navigate("/client", { replace: true });
      }
      if (isAdmin) {
        navigate("/admin/san-pham", { replace: true });
      }
    }
    setLoading(false);
  }, []);

  if (loading) return <Loading />;
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Card
        title="Đăng nhập"
        style={{ width: "400px", height: "400px", borderRadius: "10px" }}
        headStyle={{
          backgroundColor: "#0d3b66",
          color: "#faf0ca",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        }}
        bodyStyle={{
          paddingTop: "40px",
          // backgroundColor: "#F4D35E"
        }}
      >
        <Form
          layout="vertical"
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              style={{
                backgroundColor: "#0d3b66",
                color: "#faf0ca",
              }}
              size="large"
              shape="round"
              type="primary"
              htmlType="submit"
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default Login;
