import FormPage from "../../Layouts/Form";
import "./index.scss";
import { useFormik } from "formik";
import { Input } from "antd";
import { Button } from "antd";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import {
  createIndustry,
  deleteDataById,
  endpoint,
  getAllData,
  updateDataById,
} from "../../Services/industryService";

// industry table
import { Table } from "antd";
// industry table

// modal for update page
import { Modal } from "antd";
// modal for update page

const Industry = () => {
  // industry datasa
  const [industry, setIndustry] = useState([]);

  useEffect(() => {
    getAllData(endpoint.industries)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setIndustry(res.data);
        } else {
          setIndustry([]);
          toast.error("No company data found");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Error fetching company data");
      });
  }, []);

  // toast
  const notify = () => toast.success("Success fully added industry");
  // toast

  ////////////////// validation schema with formik and yup /////////////
  const validationSchema = Yup.object().shape({
    IndustryName: Yup.string().required("Industry name is empty"),
    Icon: Yup.string().required("Industry icon is empty"),
  });

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      IndustryName: "",
      Icon: "",
    },

    validationSchema: validationSchema,

    onSubmit: (values, { resetForm }) => {
      createIndustry("Industries", values).then((res) => {
        renderTable();
      });

      notify();
      resetForm();
    },
  });

  ////////////////// validation schema with formik and yup /////////////

  ////////////////////////  Table configuration /////////////////////////////

  const data = industry.map((item, index) => ({
    key: index,
    id: item.id,
    industryName: item.industryName,
    industryIcon: item.icon,
    createDate: item.createData,
    updatedDate: item.updateDate,
  }));

  ///////////////////// CRUD functions (Delete,Update) ///////////////////////////

  function handleDelete(id) {
    deleteDataById(endpoint.industries, id).then((res) => {
      const filteredData = industry.filter((d) => d.id !== id);
      setIndustry(filteredData);
    });
    toast.success("Industry deleted successfully");
  }

  ///////////////////// CRUD functions (Delete,Update) ///////////////////////////

  const columns = [
    {
      title: "Industry Name",
      dataIndex: "industryName",
      key: "industryName",
    },
    {
      title: "Industry Icon",
      dataIndex: "industryIcon",
      key: "industryIcon",
      render: (text) => (
        <img src={text} alt="icon" style={{ width: "40px", height: "40px" }} />
      ),
    },
    {
      title: "Create Date",
      dataIndex: "createDate",
      key: "createDate",
    },
    {
      title: "Update Date",
      dataIndex: "updatedDate",
      key: "updatedDate",
    },
    {
      title: "Delete",
      key: "delete",
      render: (text, record) => (
        <Button type="primary" danger onClick={() => handleDelete(record.id)}>
          Delete
        </Button>
      ),
    },
    {
      title: "Update",
      key: "update",
      render: (text, record) => (
        <Button
          style={{ backgroundColor: "green" }}
          type="primary"
          onClick={() => {
            showModal();
            getIndustryObject(record.id);
          }}
        >
          Update
        </Button>
      ),
    },
  ];

  ////////////////////////  Table configuration /////////////////////////////
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  ////////////////////////  Table configuration /////////////////////////////

  function renderTable() {
    getAllData(endpoint.industries)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setIndustry(res.data);
        } else {
          setIndustry([]);
          toast.error("No company data found");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Error fetching company data");
      });
  }

  //? Code for antd modal page //
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [industryNameData, setIndustryNameData] = useState(null);
  const [industryIconData, setIndustryIconData] = useState(null);
  const [id, setId] = useState(null);

  function getIndustryObject(idParam) {
    const findIndustry = industry.find((d) => d.id === idParam);
    const { industryName } = findIndustry;
    const { icon } = findIndustry;
    const { id } = findIndustry;

    setIndustryNameData(industryName);
    setIndustryIconData(icon);
    setId(id);
  }

  const newIndustry = {
    id: id,
    industryName: industryNameData,
    icon: industryIconData,
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    updateDataById(endpoint.industries, newIndustry).then((res) => {
      renderTable();
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //? Code for antd modal page //

  return (
    <section>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="container">
        <div className="industry-inner">
          <h1>Industry Page</h1>

          <div className="form-page">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="IndustryName">Industry Name</label>
                <Input
                  id="IndustryName"
                  name="IndustryName"
                  type="text"
                  onChange={handleChange}
                  value={values.IndustryName}
                  placeholder="Enter Industry Name..."
                />
                {errors.IndustryName && touched.IndustryName && (
                  <div className="error">{errors.IndustryName}</div>
                )}
              </div>

              <div>
                <label htmlFor="Icon">Indusrty Icon</label>
                <Input
                  id="Icon"
                  name="Icon"
                  type="text"
                  onChange={handleChange}
                  value={values.Icon}
                  placeholder="Enter Industry Icon..."
                />
                {errors.Icon && touched.Icon && (
                  <div className="error">{errors.Icon}</div>
                )}
              </div>

              <span>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </span>
            </form>
          </div>

          <div className="industry-table">
            <Table
              pagination={{ pageSize: 5 }}
              rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
              rowKey={"id"}
            />
          </div>

          <div className="modal">
            <Modal
              title="Update Industry Data"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <form>
                <input
                  style={{
                    display: "block",
                    width: "300px",
                    padding: "10px 5px",
                    margin: "10px 0",
                    outline: "none",
                    borderRadius: "5px",
                    border: "1px solid teal",
                  }}
                  type="text"
                  placeholder="Update industry name"
                  value={industryNameData}
                  onChange={(e) => {
                    setIndustryNameData(e.target.value);
                  }}
                />
                <input
                  style={{
                    display: "block",
                    width: "300px",
                    padding: "10px 5px",
                    margin: "10px 0",
                    outline: "none",
                    borderRadius: "5px",
                    border: "1px solid teal",
                  }}
                  type="text"
                  placeholder="Update industry name"
                  value={industryIconData}
                  onChange={(e) => {
                    setIndustryIconData(e.target.value);
                  }}
                />
              </form>
            </Modal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Industry;
