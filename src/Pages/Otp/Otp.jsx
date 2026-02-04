import React from 'react';
import { Link } from 'react-router-dom';

export default function Otp() {
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div className="flex w-full flex-col gap-5 px-5 md:h-1/3 md:w-1/3">
          <Link to={'/login/forgetpassword'} className="font-bold">
            <i className="fa-solid fa-angle-left"></i>Back{' '}
          </Link>

          <div>
            <h2 className="text-5xl font-bold">Enter OTP</h2>
            <p className="font-light">
              We have share a code of your registered email address
              robertallen@example.com
            </p>
          </div>
          <form action="" className="flex flex-wrap gap-5">
            <input
              type="text"
              maxLength="1"
              className="h-10 w-8 rounded-xl border-2 border-blue-500 text-center text-2xl transition-transform duration-300 hover:scale-110 focus:ring-2 focus:ring-blue-500 focus:outline-none md:h-16 md:w-12"
            ></input>

            <input
              type="text"
              maxLength="1"
              className="h-10 w-8 rounded-xl border-2 border-blue-500 text-center text-2xl transition-transform duration-300 hover:scale-110 focus:ring-2 focus:ring-blue-500 focus:outline-none md:h-16 md:w-12"
            ></input>

            <input
              type="text"
              maxLength="1"
              className="h-10 w-8 rounded-xl border-2 border-blue-500 text-center text-2xl transition-transform duration-300 hover:scale-110 focus:ring-2 focus:ring-blue-500 focus:outline-none md:h-16 md:w-12"
            ></input>

            <input
              type="text"
              maxLength="1"
              className="h-10 w-8 rounded-xl border-2 border-blue-500 text-center text-2xl transition-transform duration-300 hover:scale-110 focus:ring-2 focus:ring-blue-500 focus:outline-none md:h-16 md:w-12"
            ></input>

            <input
              type="text"
              maxLength="1"
              className="h-10 w-8 rounded-xl border-2 border-blue-500 text-center text-2xl transition-transform duration-300 hover:scale-110 focus:ring-2 focus:ring-blue-500 focus:outline-none md:h-16 md:w-12"
            ></input>

            <input
              type="text"
              maxLength="1"
              className="h-10 w-8 rounded-xl border-2 border-blue-500 text-center text-2xl transition-transform duration-300 hover:scale-110 focus:ring-2 focus:ring-blue-500 focus:outline-none md:h-16 md:w-12"
            ></input>

            <button className="bg-green mt-10 h-10 w-full text-white">
              <Link to="/login/forgetpassword/otp/resetpassword">Submit</Link>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
