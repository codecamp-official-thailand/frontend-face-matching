import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tag, Table, Row, Col } from "antd";

const columns = [
  {
    title: "ชื่อโรงพยาบาล",
    dataIndex: "hospital_name",
    key: "name",
    // render: (text) => <a>{text}</a>,
  },
  {
    title: "จำนวนที่ขอ",
    dataIndex: "total_request",
    key: "total_request",
  },
  {
    title: "จำนวนที่มีคนจอง",
    dataIndex: "total",
    key: "total",
  },
  {
    title: "จำนวนที่ส่งไปแล้ว",
    dataIndex: "total_send",
    key: "total_send",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "แผนก",
    dataIndex: "department",
    key: "department",
  },
  //   {
  //     title: "Tags",
  //     key: "tags",
  //     dataIndex: "tags",
  //     render: (tags) => (
  //       <span>
  //         {tags.map((tag) => {
  //           let color = tag.length > 5 ? "geekblue" : "green";
  //           if (tag === "loser") {
  //             color = "volcano";
  //           }
  //           return (
  //             <Tag color={color} key={tag}>
  //               {tag.toUpperCase()}
  //             </Tag>
  //           );
  //         })}
  //       </span>
  //     ),
  //   },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <span>
        <a>Reserve</a>
      </span>
    ),
  },
];

function AllRequestPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `/requests/list/?numPerPage=10&page=${pageNumber}`
      );

      setRequestList(result.data.results);
      setTotalItems(result.data.pagination.totalItem);
    };

    fetchData();
  }, [pageNumber]);

  function onChange(pageNumber) {
    console.log("Page: ", pageNumber);
    setPageNumber(pageNumber.current);
  }

  return (
    <Row justify="center">
      <Col span={23}>
        <div
          style={{
            borderRadius: "5px",
            boxShadow: "5px 10px 20px rgba(0, 0, 0, 0.5)",
            backgroundColor: "#F8F8F8",
            marginTop: "20px",
            padding: "0 5px 0 0",
          }}
        >
          <Table
            style={{ borderRadius: "5px" }}
            columns={columns}
            dataSource={requestList}
            pagination={{
              defaultCurrent: pageNumber,
              total: totalItems,
            }}
            onChange={onChange}
          />
        </div>
      </Col>
    </Row>
  );
}

export default AllRequestPage;
