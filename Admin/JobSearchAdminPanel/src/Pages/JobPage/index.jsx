import "./index.scss";
import { useFormik } from "formik";
import { Button, Input, Modal, Select, Table } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { endpoint, getAllData } from "../../Services/htttpClientServer";

const JobPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllData(endpoint.companies).then((res) => {
      setData(res.data);
    });
  }, []);

  // ! Code For Formik and YUP
  const formik = useFormik({
    initialValues: {
      jobName: "",
      jobDescription: "",
      JobRequierment: "",
      company: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  // ! Code For Formik and YUP

  // ? code for select

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  // const onSearch = (value) => {
  //   console.log("search:", value);
  // };

  // // Filter `option.label` match the user type `input`
  // const filterOption = (input, option) =>
  //   (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  // ? code for select

  console.log();

  return (
    <section className="home">
      <div className="container">
        <div className="inner">
          <div className="form">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="jobName">Job Name</label>
                <Input
                  id="jobName"
                  name="jobName"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.jobName}
                  placeholder="Enter job name"
                />
              </div>
              <div>
                <label htmlFor="jobDescription">Job Description</label>
                <TextArea
                  id="jobDescription"
                  name="jobDescription"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.jobDescription}
                />
              </div>

              <div>
                <label htmlFor="JobRequierment">Job Requierement</label>
                <Input
                  id="JobRequierment"
                  name="JobRequierment"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.JobRequierment}
                />
              </div>

              <div>
                <Select
                  value={formik.values.company}
                  className="select"
                  showSearch
                  placeholder="Select company"
                  optionFilterProp="company"
                  onChange={onChange}
                >
                  <Select.Option></Select.Option>
                  {data.map((company) => (
                    <Select.Option key={company.id} value={company.id}>
                      {company.companyName}
                    </Select.Option>
                  ))}
                </Select>
              </div>

              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobPage;
