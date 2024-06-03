import "./index.scss";
import { useFormik } from "formik";
import { Input } from "antd";
import { Button } from "antd";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import { useEffect, useState } from "react";

// industry table
import { Table } from "antd";
// industry table

// modal for update page
import { Modal } from "antd";
import {
  createData,
  getAllData,
  updateData,
} from "../../Services/htttpClientServer";
import {
  deleteDataById,
  endpoint,
} from "../../Services/industryService";
// modal for update page






const Category = () => {
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

  //!   CRUD Mehtods Delete Update  \\\\\
  function handleDelete(id) {
    // eslint-disable-next-line no-unused-vars
    deleteDataById(endpoint.categories, id).then((res) => {
      renderTable();
    });
    toast.success("Industry deleted successfully");
  }
  //!   CRUD Mehtods Delete Update  \\\\\

  // toast
  const notify = () => toast.success("Success fully added industry");
  // toast

  ////////////////// validation schema with formik and yup /////////////
  const validationSchema = Yup.object().shape({
    categoryName: Yup.string().required("category name is empty"),
    Icon: Yup.string().required("category icon is empty"),
  });

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      categoryName: "",
      icon: "",
    },

    validationSchema: validationSchema,

    onSubmit: (values, { resetForm }) => {
      createData(endpoint.categories, values).then((res) => {
        renderTable();
      });

      notify();
      resetForm();
    },
  });

  ////////////////// validation schema with formik and yup /////////////

  //? Table Configuration //

  const apiData = data.map((item, index) => ({
    key: index,
    id: item.id,
    categoryName: item.categoryName,
    categoryIcon: item.icon,
    createData: item.createData,
    updatedDate: item.updateDate,
  }));

  const columns = [
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Category Icon",
      dataIndex: "categoryIcon",
      key: "categoryIcon",
      render: (text) => (
        <img src={text} alt="icon" style={{ width: "40px", height: "40px" }} />
      ),
    },
    {
      title: "Create Date",
      dataIndex: "createData",
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
    getAllData(endpoint.categories)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Error fetching industry data");
      });
  }

  //? Table Configuration End



  //? Code for antd modal page //
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [categoryNameData, setCategoryNameData] = useState(null);
  const [categoryIconData, setCategoryIconData] = useState(null);
  const [id, setId] = useState(null);

  function getCategoryObject(idParam) {
    const findCategory = data.find((d) => d.id === idParam);
    const { categoryName } = findCategory;
    const { icon } = findCategory;
    const { id } = findCategory;

    setCategoryNameData(categoryName);
    setCategoryIconData(icon);
    setId(id);
  }

  const newCategory = {
    id: id,
    categoryName: categoryNameData,
    icon: categoryIconData,
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    updateData(endpoint.categories, newCategory).then((res) => {
      renderTable();
    });
    toast.success("Update Category Successfully");
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
          <h1>Category Page</h1>

          <div className="form-page">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="categoryName">Category Name</label>
                <Input
                  id="categoryName"
                  name="categoryName"
                  type="text"
                  onChange={handleChange}
                  value={values.categoryName}
                  placeholder="Enter category Name..."
                />
                {errors.categoryName && touched.categoryName && (
                  <div className="error">{errors.categoryName}</div>
                )}
              </div>

              <div>
                <label htmlFor="Icon">Catagory Icon</label>
                <Input
                  id="Icon"
                  name="Icon"
                  type="text"
                  onChange={handleChange}
                  value={values.Icon}
                  placeholder="Enter category Icon..."
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
              dataSource={apiData}
              rowKey={"id"}
            />
          </div>

          {/* code for modal */}
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
                  placeholder="Update category name"
                  value={categoryNameData}
                  onChange={(e) => {
                    setCategoryNameData(e.target.value);
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
                  value={categoryIconData}
                  onChange={(e) => {
                    setCategoryIconData(e.target.value);
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

export default Category;
