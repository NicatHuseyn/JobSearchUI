
import "./index.scss";
import { useFormik } from "formik";

const FormPage = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <section>
      <div className="container">
        <div className="form-inner">
          
        </div>
      </div>
    </section>
  );
};

export default FormPage;
