// imports
import "./index.scss";
import { Button, Input, Form } from "antd";
import { createData, endpoint } from "../../Services/htttpClientServer";
import toast, { Toaster } from "react-hot-toast";
const LoginPage = () => {


  const onFinish = (values) => {
    console.log("Success:", values);
    createData(`${endpoint.users}/login`, values).then((res) => {
      console.log(res);
      // if (res.data.success) {
      //   toast.success(res.data.message);
      // } else {
      //   toast.error(res.data.message);
      // }
    });
    
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  //   !  Code For Create User

  return (
    <section className="login">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="container">
        <div className="login-box">
          <div className="form">
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="userNameOrEmail"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input placeholder="Enter your username or email"  />
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
                <Input.Password placeholder="Enter your password" />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Log In
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
