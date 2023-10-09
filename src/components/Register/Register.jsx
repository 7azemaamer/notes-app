import style from "./Register.module.css";
import regsiterImage from "../../assets/images/register.jpg";
import {Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import Swal from 'sweetalert2';

export default function Register() {
  const navigate = useNavigate();
  const {sendData} = useContext(UserContext);

  const onSubmit = async (values) => {

    const data = await sendData(values);;
    if (data?.data?.msg === "done") {
      navigate("/login");
    }

    if (data?.response?.data?.msg === "email is already exist") {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: (data?.response?.data?.msg.charAt(0).toUpperCase() + data?.response?.data?.msg.slice(1) + '!') || 'An error occurred',
        footer: 'Try to login.',
      })
    }

  };
  

  const validationSchema = yup.object().shape({
      name: yup.string().min(3, "Name Must be More than 2 Letters").required("Name is required"),
      email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
      password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .matches(/^(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter and one number")
        .required("Password is required"),
      age: yup
        .number()
        .min(16, "You must be at least 16 years old")
        .required("Age is required"),
        phone: yup
        .string()
        .matches(
          /^(?:\+2|002)?01[0-2]\d{8}$/,
          "Egyptian phone number must start with 010, 011, or 012 and be 11 digits long"
        )
        .required("Phone number is required"),
      
    }
  )
  const formik = useFormik({
    initialValues:{
      "name":"",
      "email":"",
      "password":"",
      "age":'',
      "phone":""
    },
    validationSchema,
    onSubmit
  });
  return (
    <section className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className={`${style.container} row`}>
        <figure className="col-md-8 m-0 p-md-0">
          <div className="image-container">
            <img src={regsiterImage} className="w-100" alt="Regsiter Image" />
          </div>
        </figure>
        
        <form onSubmit={formik.handleSubmit} className="col-md-4 d-flex flex-column justify-content-center px-5">
          <h2 className="m-0 fw-bold font-Montserrat">Create an account</h2>
          <p className="mb-3">Let's get started for free</p>
          <div className="form-group d-flex flex-column gap-2 justify-content-center">
            <input 
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              className="form-control"
              placeholder="Username"
              name="name"
              id="name"
            />
            {formik.errors.name && formik.touched.name?<div className="bg-main-light text-main font-sm p-2 rounded-1">
              {formik.errors.name}
            </div> : ''}


            <input
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              id="email"
            />
            {formik.errors.email && formik.touched.email?<div className="bg-main-light text-main font-sm p-2 rounded-1">
              {formik.errors.email}
            </div> : ''}

            <input
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              id="password"
            />
            {formik.errors.password && formik.touched.password?<div className="bg-main-light text-main font-sm p-2 rounded-1">
              {formik.errors.password}
            </div> : ''}


            <input
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              inputMode="numeric"
              className="form-control"
              placeholder="Age"
              name="age"
              id="age"
            />
            {formik.errors.age && formik.touched.age?<div className="bg-main-light text-main font-sm p-2 rounded-1">
              {formik.errors.age}
            </div> : ''}


            <input
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="tel"
              inputMode="numeric"
              className="form-control"
              placeholder="Phone"
              name="phone"
              id="phone"
            />
            {formik.errors.phone && formik.touched.phone ?<div className="bg-main-light text-main font-sm p-2 rounded-1">
              {formik.errors.phone}
            </div> : ''}


            <button type="submit" className="btn btn-main">
              Create account
            </button>
            <p>
              Already have account ?{" "}
              <Link to="/login" className="text-decoration-underline">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
