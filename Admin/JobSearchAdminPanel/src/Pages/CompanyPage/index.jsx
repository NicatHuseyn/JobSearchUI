import { Button, Input, Modal, Table } from "antd";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

import * as Yup from "yup";
import {
  createData,
  deleteDataById,
  endpoint,
  getAllData,
  updateData,
} from "../../Services/htttpClientServer";
import toast, { Toaster } from "react-hot-toast";
import TextArea from "antd/es/input/TextArea";

const Company = () => {
  // Code For Using Data
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllData(endpoint.companies)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setData(res.data);
        } else {
          setData([]);
          toast.error("No company data found");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Error fetching company data");
      });
  }, []);
  // Code For Using Data

  //!   CRUD Mehtods Delete Update  \\\\\
  function handleDelete(id) {
    // eslint-disable-next-line no-unused-vars
    deleteDataById(endpoint.companies, id).then((res) => {
      renderTable();
    });
    toast.success("Industry deleted successfully");
  }
  //!   CRUD Mehtods Delete Update  \\\\\

  // toast for message
  const notify = () => toast.success("Success fully added industry");
  // toast for messsage

  //? Code for formik and YUP
  ////////////////// validation schema with formik and yup /////////////
  const validationSchema = Yup.object().shape({
    companyName: Yup.string().required("company name is empty"),
    icon: Yup.string().required("company icon is empty"),
    description: Yup.string().required("company description is empty"),
    phoneNumber: Yup.string().required("company phone number is empty"),
    webSiteUrl: Yup.string().required("company web site url is empty"),
    address: Yup.string().required("company address is empty"),
  });

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      companyName: "",
      description: "",
      phoneNumber: "",
      webSiteUrl: "",
      address: "",
      icon: "",
    },

    validationSchema: validationSchema,

    onSubmit: (values, { resetForm }) => {
      console.log(values);
      createData(endpoint.companies, values).then((res) => {
        renderTable();
      });

      notify();
      resetForm();
    },
  });

  ////////////////// validation schema with formik and yup /////////////
  //? Code for formik and YUP

  //? Table Configuration //

  const apiData = data.map((item, index) => ({
    key: index,
    id: item.id,
    companyName: item.companyName,
    description: item.description,
    phoneNumber: item.phoneNumber,
    webSiteUrl: item.webSiteUrl,
    address: item.address,
    icon: item.icon,
    createData: item.createData,
    updateDate: item.updateDate,
  }));

  const columns = [
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Company Description",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <p>{`${text.length > 0 ? text.slice(0, 25) : text}...`}</p>
      ),
    },
    {
      title: "Company Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Company Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Company Web Site URL",
      dataIndex: "webSiteUrl",
      key: "webSiteUrl",
      render: (text) => {
        return <a href={text}>{text}</a>; // sorusacam
      },
    },
    {
      title: "Company Icon",
      dataIndex: "icon",
      key: "icon",
      render: (text) => (
        <img src={text} alt="icon" style={{ width: "40px", height: "40px" }} />
      ),
    },
    {
      title: "Create Date",
      dataIndex: "createData",
      key: "createData",
    },
    {
      title: "Update Date",
      dataIndex: "updateDate",
      key: "updateDate",
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
            getCategoryObject(record.id);
          }}
        >
          Update
        </Button>
      ),
    },
  ];

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

  function renderTable() {
    getAllData(endpoint.companies)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setData(res.data);
        } else {
          setData([]);
          toast.error("No company data found");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Error fetching company data");
      });
  }

  //? Table Configuration End

  //? Code for antd modal page //
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [companyNameData, setCompanyNameData] = useState(null);
  const [companyDescriptionData, setCompanyDescription] = useState(null);
  const [companyPhoneNumberData, setCompanyPhoneNumber] = useState(null);
  const [companyWebSiteUrlData, setCompanyWebSiteUrl] = useState(null);
  const [compnayAddressData, setCompanyAddress] = useState(null);
  const [companyIconData, setCompanyIconData] = useState(null);
  const [id, setId] = useState(null);

  function getCategoryObject(idParam) {
    const findData = data.find((d) => d.id === idParam);
    const { companyName } = findData;
    const { description } = findData;
    const { phoneNumber } = findData;
    const { webSiteUrl } = findData;
    const { address } = findData;
    const { icon } = findData;
    const { id } = findData;

    setCompanyNameData(companyName);
    setCompanyDescription(description);
    setCompanyPhoneNumber(phoneNumber);
    setCompanyWebSiteUrl(webSiteUrl);
    setCompanyAddress(address);
    setCompanyIconData(icon);
    setId(id);
  }

  const newObject = {
    id: id,
    companyName: companyNameData,
    description: companyDescriptionData,
    phoneNumber: companyPhoneNumberData,
    webSiteUrl: companyWebSiteUrlData,
    address: compnayAddressData,
    icon: companyIconData,
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    updateData(endpoint.companies, newObject).then((res) => {
      renderTable();
    });
    toast.success("Update Company Successfully");
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //? Code for antd modal page //

  return (
    <section>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="container">
        <div className="inner">
          <div className="form-page">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="companyName">Company Name</label>
                <Input
                  id="companyName"
                  name="companyName"
                  type="text"
                  onChange={handleChange}
                  value={values.companyName}
                  placeholder="Enter company name..."
                />
                {errors.companyName && touched.companyName && (
                  <div className="error">{errors.companyName}</div>
                )}
              </div>

              <div>
                <label htmlFor="description">Company Description</label>
                <TextArea
                  style={{ width: "500px", resize: "none" }}
                  id="description"
                  name="description"
                  type="text"
                  onChange={handleChange}
                  value={values.description}
                  placeholder="Enter company description..."
                />
                {errors.description && touched.description && (
                  <div className="error">{errors.description}</div>
                )}
              </div>

              <div>
                <label htmlFor="phoneNumber">Company phone number</label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  onChange={handleChange}
                  value={values.phoneNumber}
                  placeholder="Enter company phone number..."
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <div className="error">{errors.phoneNumber}</div>
                )}
              </div>

              <div>
                <label htmlFor="webSiteUrl">Company web site url</label>
                <Input
                  id="webSiteUrl"
                  name="webSiteUrl"
                  type="text"
                  onChange={handleChange}
                  value={values.webSiteUrl}
                  placeholder="Enter company web site url..."
                />
                {errors.webSiteUrl && touched.webSiteUrl && (
                  <div className="error">{errors.webSiteUrl}</div>
                )}
              </div>

              <div>
                <label htmlFor="phoneNumber">Company address</label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  onChange={handleChange}
                  value={values.address}
                  placeholder="Enter company address..."
                />
                {errors.address && touched.address && (
                  <div className="error">{errors.address}</div>
                )}
              </div>

              <div>
                <label htmlFor="Icon">Company Icon</label>
                <Input
                  id="icon"
                  name="icon"
                  type="text"
                  onChange={handleChange}
                  value={values.icon}
                  placeholder="Enter company Icon..."
                />
                {errors.icon && touched.icon && (
                  <div className="error">{errors.icon}</div>
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
              dataSource={apiData}
              rowKey={"id"}
            />
          </div>

     

          {/* code for modal */}
          <div className="modal">
            <Modal
              title="Update Company Data"
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
                  placeholder="Update category name"
                  value={companyNameData}
                  onChange={(e) => {
                    setCompanyNameData(e.target.value);
                  }}
                />

                <TextArea
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
                  placeholder="Update category name"
                  value={companyDescriptionData}
                  onChange={(e) => {
                    setCompanyDescription(e.target.value);
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
                  placeholder="Update category name"
                  value={companyPhoneNumberData}
                  onChange={(e) => {
                    setCompanyPhoneNumber(e.target.value);
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
                  placeholder="Update category name"
                  value={companyWebSiteUrlData}
                  onChange={(e) => {
                    setCompanyWebSiteUrl(e.target.value);
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
                  value={compnayAddressData}
                  onChange={(e) => {
                    setCompanyAddress(e.target.value);
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
                  value={companyIconData}
                  onChange={(e) => {
                    setCompanyIconData(e.target.value);
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

export default Company;
