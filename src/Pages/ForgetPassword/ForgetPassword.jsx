import { useFormik } from 'formik';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
export default function ForgetPassword() {
  const navigate = useNavigate();
  let validation = Yup.object().shape({
    Email: Yup.string()
      .required('Email is Required')
      .matches(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, 'Invalid Email'),
  });
  let formik = useFormik({
    initialValues: {
      Email: '',
    },
    onSubmit: (e) => (
      console.log('email sent successfully'),
      console.log(e),
      navigate('/login/forgetpassword/otp')
    ),
    validationSchema: validation,
  });
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div className="flex md:h-1/3 md:w-1/3 w-full  flex-col gap-5 px-5">
          <Link to={'/login'} className="font-bold">
            <i className="fa-solid fa-angle-left"></i>Back{' '}
          </Link>

          <div>
            <h2 className="text-xl font-bold">Forget Password</h2>
            <p className="font-light">
              Enter your registered email address. we’ll send you a code to
              reset your password.
            </p>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            action=""
            className="flex flex-col gap-10"
          >
            <div className="relative h-5 w-full">
              <input
                name="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Email}
                type="text"
                id="email"
                className="border-green w-full rounded-lg ps-3 pt-5 outline-none"
              />
              <label
                htmlFor="email"
                className="text-green absolute top-0 left-0 ps-2"
              >
                {' '}
                Email{' '}
              </label>
              {formik.errors.Email && formik.touched.Email && (
                <p className="text-red-500">{formik.errors.Email}</p>
              )}
            </div>
            <button
              type="submit"
              className="bg-green mt-5 h-10 w-full text-white"
            >
              Send OTP{' '}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
