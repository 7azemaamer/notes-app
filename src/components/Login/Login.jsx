import style from "./Login.module.css";
import LoginImage from "../../assets/images/login.webp";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from 'yup';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import Swal from 'sweetalert2';

export default function Login() {
  const {sendDataToLogin , setToken , token} = useContext(UserContext);
  const [isLoading , setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async(values) =>{
    setIsLoading(true)
    let response = await sendDataToLogin(values);
    console.log(response);
    if(response?.data?.msg === "done"){
      localStorage.setItem('Token', `3b8ny__${response?.data?.token}`);
      setToken(response?.data?.token);
      setIsLoading(false);
      navigate('/');
    }
    if (response?.response?.data?.msg ) {
      console.log(response?.response?.data?.msg);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: (response?.response?.data?.msg.charAt(0).toUpperCase() + response?.response?.data?.msg.slice(1) + '!') || 'An error occurred',
      })
    }
   }
   

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .matches(/^(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter and one number")
      .required("Password is required"),
  }
)
  const formik = useFormik({
    initialValues:{
      "email":"",
      "password":"",
    },
    validationSchema,
    onSubmit
  });

  useEffect(()=>{
    if(token) navigate('/');
  } , [token])
  return (
    <section className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className={`${style.container} row`}>
        <figure className="col-md-8 m-0 p-md-0">
          <div className="image-container">
            <img src={LoginImage} className="w-100" alt="Regsiter Image" />
          </div>
        </figure>
        <form onSubmit={formik.handleSubmit} className="col-md-4 d-flex flex-column justify-content-center px-5">
          <h2 className="m-0 fw-bold font-Montserrat">
            Welcome Back <i className="fa-solid fa-heart ms-0 text-main"></i>
          </h2>
          <p className="mb-3">
            Thanks for returning! Please sign in to access your account.
          </p>
          <div className="form-group d-flex flex-column gap-2 justify-content-center">
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


            <button type="submit" className="btn btn-main">
              {isLoading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Login"
              )}
            </button>
            <p>
              You don't have account yet ?
              <Link to="/signup" className="text-decoration-underline ms-1">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
