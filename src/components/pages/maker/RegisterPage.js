import React from "react";
import {
  Form,
  notification,
  Input,
  Button,
  Row,
  Col,
  Typography,
  Divider,
} from "antd";
import axios from "axios";

const { Title } = Typography;

const layout = {
  labelCol: { xs: 24, sm: 8, md: 6, lg: 6, xl: 7, xxl: 6 },
  wrapperCol: { xs: 24, sm: 16, md: 18, lg: 18, xl: 17, xxl: 18 },
};

const openNotification = (type, placement = "topRight") => {
  if (type === "success") {
    notification.success({
      message: `การลงทะเบียนสำเร็จ`,
      placement,
    });
  } else {
    notification.error({
      message: `การลงทะเบียนล้มเหลว`,
      placement,
    });
  }
};

function RegisterPage(props) {
  const onFinish = async (values) => {
    props.history.push("/login");
  };

  return (
    <Row justify="center">
      <Col xs={23} sm={18} md={18} lg={14} xl={10} xxl={8}>
        <div
          style={{
            borderRadius: "5px",
            boxShadow: "5px 10px 20px rgba(0, 0, 0, 0.5)",
            backgroundColor: "#F8F8F8",
            marginTop: "20px",
          }}
        >
          <Row justify="center">
            <Title level={2} style={{ marginTop: "25px" }}>
              Register as makers
            </Title>
          </Row>
          <Divider
            style={{ marginTop: "10px", backgroundColor: "#D0D0D0" }}
          ></Divider>
          <Row justify="center">
            <Col span={22}>
              <Form
                style={{ width: "100%" }}
                className="App"
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
                  ]}
                >
                  <Input style={{ borderRadius: "5px" }} />
                </Form.Item>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input style={{ borderRadius: "5px" }} />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password style={{ borderRadius: "5px" }} />
                </Form.Item>
                <Form.Item
                  name="confirm"
                  label="Confirm Password"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          "The two passwords that you entered do not match!"
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item style={{ width: "100%", justifyContent: "center" }}>
                  <Row justify="center">
                    <Button
                      style={{
                        fontSize: "20px",
                        width: "100%",
                        height: "auto",
                        marginBottom: "5px",
                      }}
                      type="primary"
                      htmlType="submit"
                    >
                      Register
                    </Button>
                  </Row>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
}

export default RegisterPage;
