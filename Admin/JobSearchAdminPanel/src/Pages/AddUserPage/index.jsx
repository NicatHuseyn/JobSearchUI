// imports
import "./index.scss";
import { useFormik } from "formik";
import { Button, Input } from "antd";
import { createData, endpoint } from "../../Services/htttpClientServer";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";

const AddUser = () => {
  // Code For YUP
  const CreateUserSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required Fullname"),
    userName: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required Username"),
    email: Yup.string().email("Invalid email").required("Required Email"),
    password: Yup.string()
      .min(5, "Too Short!")
      .max(50, "Too Long!")
      .required("Required Password"),
    passwordConfirm: Yup.string()
      .min(5, "Too Short!")
      .max(50, "Too Long!")
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Required Confirm Password"),
  });
  // Code For YUP

  // ? Code For Formik
  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: {
      fullName: "",
      userName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },

    validationSchema: CreateUserSchema,

    onSubmit: (values, { resetForm }) => {
      createData(endpoint.users, values).then((res) => {
        if (res.data.success) {
          toast.success("User added successfully");
        } else {
          toast.error(res.data.message);
        }
      });
      resetForm();
    },
  });

  // ? Code For Formik

  //   !  Code For Create User

  return (
    <section>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="container">
        <div className="inner">
          <h1>Add User</h1>
          <div className="form-page">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="fullName">Fullname *</label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  onChange={handleChange}
                  value={values.fullName}
                  placeholder="Enter your fullname"
                />
                {errors.fullName && touched.fullName && (
                  <div className="error">{errors.fullName}</div>
                )}
              </div>

              <div>
                <label htmlFor="userName">Username *</label>
                <Input
                  id="userName"
                  name="userName"
                  type="text"
                  onChange={handleChange}
                  value={values.userName}
                  placeholder="Enter your username"
                />
                {errors.userName && touched.userName && (
                  <div className="error">{errors.userName}</div>
                )}
              </div>

              <div>
                <label htmlFor="email">Email Address *</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  value={values.email}
                  placeholder="Enter your email"
                />
                {errors.email && touched.email && (
                  <div className="error">{errors.email}</div>
                )}
              </div>

              <div>
                <label htmlFor="password">Password *</label>
                <Input.Password
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  value={values.password}
                  placeholder="Enter your password"
                />
                {errors.password && touched.password && (
                  <div className="error">{errors.password}</div>
                )}
              </div>

              <div>
                <label htmlFor="passwordConfirm">Confirm Password *</label>
                <Input.Password
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="passwordConfirm"
                  onChange={handleChange}
                  value={values.passwordConfirm}
                  placeholder="Confirm password"
                />
                {errors.passwordConfirm && touched.passwordConfirm && (
                  <div className="error">{errors.passwordConfirm}</div>
                )}
              </div>

              <div>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddUser;
