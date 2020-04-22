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
import { withRouter } from "react-router-dom";

const { Title } = Typography;

const layout = {
  labelCol: { xs: 24, sm: 24, md: 10, lg: 10, xl: 10, xxl: 9 },
  wrapperCol: { xs: 24, sm: 24, md: 14, lg: 14, xl: 14, xxl: 15 },
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
    console.log(values);
    const body = {
      email: values.email,
      first_name: values.first_name,
      last_name: values.last_name,
      line_id: values.line_id,
      nick_name: values.nick_name,
      password: values.password,
      phone_no: values.phone_no,
    };

    try {
      await axios.post("/makers/register", body);
      openNotification("success");
      props.history.push("/login");
    } catch (ex) {
      console.log(ex);
      openNotification("error");
    }
  };

  return (
    <Row justify="center">
      <Col xs={23} sm={18} md={18} lg={14} xl={12} xxl={10}>
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
                  label="อีเมล์ (Username)"
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
                  label="ชื่อจริง (First name)"
                  name="first_name"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input style={{ borderRadius: "5px" }} />
                </Form.Item>
                <Form.Item
                  label="นามสกุล (Last name)"
                  name="last_name"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input style={{ borderRadius: "5px" }} />
                </Form.Item>
                <Form.Item
                  label="ชื่อเล่น (Nick Name)"
                  name="nick_name"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input style={{ borderRadius: "5px" }} />
                </Form.Item>
                <Form.Item
                  label="ไลน์ไอดี (Line ID)"
                  name="line_id"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input style={{ borderRadius: "5px" }} />
                </Form.Item>
                <Form.Item
                  label="เบอร์โทรศัพท์ (Phone Number)"
                  name="phone_no"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input style={{ borderRadius: "5px" }} />
                </Form.Item>
                <Form.Item
                  label="รหัสผ่าน (Password)"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password style={{ borderRadius: "5px" }} />
                </Form.Item>
                <Form.Item
                  name="confirm"
                  label="ยืนยันรหัสผ่าน (Confirm Password)"
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

export default withRouter(RegisterPage);
