import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { loginRequest } from '../../Services/auth';
import logo from '../../assets/logo.png';
import { useAuth } from '../../context/ThemeContext/AuthContext';

export default function Login() {
  const theme=localStorage.getItem('theme');
  const {login} = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const loginScema = z.object({
    email: z.string().nonempty('Email is required'),
    password: z.string().nonempty('Password is required'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginScema),
    mode: 'onTouched',
  });
  const submit = async (data) => {
    setServerError('');
    try {
      const user = await loginRequest(data.email, data.password);
      login(user);


      navigate('/admin');
    } catch (err) {
      setServerError(err.message);
      
      
      theme==='dark'?toast.error(err.message,
  {
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  }
):toast.error(err.message);
    }
  };

  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div className="flex md:h-1/3 md:w-1/3 w-full flex-col gap-1 md:gap-5 px-5">
          <div className="w-32">
            <img src={logo} alt="" />
          </div>

          <div>
            <h2 className="text-xl font-bold">Welcome 👋🏻</h2>
            <p className="font-light">Please Login Here</p>
          </div>
          <form
            onSubmit={handleSubmit(submit)}
            action=""
            className="flex flex-col gap-10"
          >
            <div className="relative my-5 h-5 w-full">
              <input
                {...register('email')}
                type="text"
                id="email"
                className="border-green w-full rounded-lg ps-3 pt-5 outline-none"
              />
              <p className="text-red-500">
                {touchedFields.email && errors.email && errors.email.message}
              </p>
              <label
                htmlFor="email"
                className="text-green absolute top-0 left-0 ps-2"
              >
                {' '}
                Email{' '}
              </label>
            </div>
            <div className="relative my-5 h-5">
              <input
                {...register('password')}
                type="password"
                id="password"
                className="border-green w-full rounded-lg ps-3 pt-5 outline-none"
              />
              <p className="text-red-500">
                {touchedFields.password &&
                  errors.password &&
                  errors.password.message}
              </p>
              <label
                htmlFor="password"
                className="text-green absolute top-0 left-0 ps-2"
              >
                {' '}
                Password{' '}
              </label>
            </div>
            <div className="flex justify-between">
              <Link to={'/login/forgetpassword'} className="text-green">
                forget Password
              </Link>
            </div>
            <button
              type="submit"
              className="bg-green rounded-md  p-2  text-lg text-white"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
