import React, { useState, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Select,
  Typography,
  Input,
  Button,
  InputNumber,
  Divider,
} from "antd";
import Axios from "../../../configs/axios";
import "./RequestPage.css";

const { Title } = Typography;

const layout = {
  labelCol: { xs: 24, sm: 9, md: 8, lg: 9, xl: 8, xxl: 8 },
  wrapperCol: { xs: 24, sm: 15, md: 16, lg: 15, xl: 16, xxl: 16 },
};

export default function RequestPage() {
  const [form] = Form.useForm();
  const [geographiesList, setGeographiesList] = useState([]);
  const [provincesList, setProvincesList] = useState([]);
  const [districtsList, setDistrictsList] = useState([]);
  const [subDistrictsList, setSubDistrictsList] = useState([]);
  const [hospitalsList, setHospitalsList] = useState([]);
  const [departmentsList, setDepartmentsList] = useState([]);
  const [geographyId, setGeographyId] = useState(0);
  const [provinceId, setProvinceId] = useState(0);
  const [districtId, setDistrictId] = useState(0);
  const [subDistrictId, setSubDistrictId] = useState(0);
  const [hospitalId, setHospitalId] = useState(0);
  const [departmentId, setDepartmentId] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get(`/departments`);
      setDepartmentsList(result.data);
    };

    form.setFieldsValue({
      Departments: "โปรดเลือกแผนก",
    });

    fetchData();
  }, [hospitalId]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get(
        `/hospital/?provinces=${provinceId}&districts=${districtId}&subdistricts=${subDistrictId}`
      );
      setDepartmentsList([]);
      setHospitalsList(result.data);
    };

    form.setFieldsValue({
      Hospitals: "โปรดเลือกโรงพยาบาล",
      Departments: "",
    });

    fetchData();
  }, [subDistrictId]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get(
        `/sub-districts/?provinces=${provinceId}&districts=${districtId}`
      );
      setDepartmentsList([]);
      setHospitalsList([]);
      setSubDistrictsList(result.data);
    };

    form.setFieldsValue({
      SubDistricts: "โปรดเลือกอำเภอ/แขวง",
      Hospitals: "",
      Departments: "",
    });

    fetchData();
  }, [districtId]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get(`/districts/?provinces=${provinceId}`);
      setDepartmentsList([]);
      setHospitalsList([]);
      setSubDistrictsList([]);
      setDistrictsList(result.data);
    };

    form.setFieldsValue({
      Districts: "โปรดเลือกตำบล/เขต",
      SubDistricts: "",
      Hospitals: "",
      Departments: "",
    });

    fetchData();
  }, [provinceId]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get(`/provinces/?geographies=${geographyId}`);
      setDepartmentsList([]);
      setHospitalsList([]);
      setSubDistrictsList([]);
      setDistrictsList([]);
      setProvincesList(result.data);
    };

    form.setFieldsValue({
      Provinces: "โปรดเลือกจังหวัด",
      Districts: "",
      SubDistricts: "",
      Hospitals: "",
      Departments: "",
    });

    fetchData();
  }, [geographyId]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get("/geographies");
      setGeographiesList(result.data);
    };
    form.setFieldsValue({
      Geographies: "โปรดเลือกภาค",
      Provinces: "",
      Districts: "",
      SubDistricts: "",
      Hospitals: "",
      Departments: "",
    });

    fetchData();
  }, []);

  function onChangeId(value, labelNameEN) {
    console.log(labelNameEN);
    switch (labelNameEN) {
      case "Geographies":
        setGeographyId(value);
        break;
      case "Provinces":
        setProvinceId(value);
        break;
      case "Districts":
        setDistrictId(value);
        break;
      case "SubDistricts":
        setSubDistrictId(value);
        break;
      case "Hospitals":
        setHospitalId(value);
        break;
      case "Departments":
        setDepartmentId(value);
        break;
      default:
      // Do nothing
    }
  }

  function renderList(
    labelNameTH,
    labelNameEN,
    renderList,
    fieldValue = "name"
  ) {
    let englishLabel = labelNameEN;
    if (labelNameEN === "Sub-districts") labelNameEN = "SubDistricts";
    console.log(renderList);
    return (
      <Form.Item
        label={`${labelNameTH} (${englishLabel})`}
        name={labelNameEN}
        defaultValue={renderList[0] && renderList[0].id}
        rules={[{ required: true, message: `โปรดกรอก${labelNameTH}` }]}
      >
        <Select onChange={(value) => onChangeId(value, labelNameEN)}>
          {renderList.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item[fieldValue]}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    );
  }

  function onFinish(values) {
    console.log(values);
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row justify="center" style={{ padding: "auto" }}>
      <Col xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}>
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
              ฟอร์มสำหรับขอ Face - Shield
            </Title>
          </Row>
          <Divider
            style={{ marginTop: "10px", backgroundColor: "#D0D0D0" }}
          ></Divider>
          <Row justify="center">
            <Col span={20}>
              <Form
                {...layout}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{ width: "100%" }}
                form={form}
                defaultValue={{
                  Geographies: "โปรดเลือกภาค",
                  Provinces: "",
                  Districts: "",
                  SubDistricts: "",
                  Hospitals: "",
                  Departments: "",
                }}
              >
                {renderList("ภูมิภาค", "Geographies", geographiesList)}
                {renderList("จังหวัด", "Provinces", provincesList, "name_th")}
                {renderList("อำเภอ/เขต", "Districts", districtsList, "name_th")}
                {renderList(
                  "ตำบล/แขวง",
                  "Sub-districts",
                  subDistrictsList,
                  "name_th"
                )}
                {renderList("โรงพยาบาล", "Hospitals", hospitalsList)}
                {renderList("แผนก", "Departments", departmentsList)}
                <Form.Item
                  label="ชื่อผู้ขอ"
                  name="name"
                  rules={[{ required: true, message: "โปรดกรอกชื่อ" }]}
                >
                  <Input style={{ borderRadius: "5px" }} />
                </Form.Item>
                <Form.Item
                  name="lineId"
                  label="Line ID"
                  rules={[{ required: true, message: "โปรดกรอกชื่อ Line ID" }]}
                >
                  <Input style={{ borderRadius: "5px" }} />
                </Form.Item>
                <Form.Item
                  name="amount"
                  label="จำนวนที่ขอ (ไม่เกิน 100)"
                  rules={[
                    { required: true, message: "โปรดกรอกจำนวนที่ขอ" },
                    {
                      type: "number",
                      min: 1,
                      max: 100,
                      message: "โปรดกรอกจำนวนระหว่าง 1 ถึง 100",
                    },
                  ]}
                >
                  <InputNumber
                    className="input-request"
                    style={{ width: "100%", borderRadius: "5px" }}
                  />
                </Form.Item>
                <br />
                <Button
                  style={{
                    fontSize: "20px",
                    width: "100%",
                    height: "auto",
                    marginBottom: "20px",
                  }}
                  htmlType="submit"
                  type="primary"
                >
                  ส่งขอ Face Shield
                </Button>
              </Form>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
}
