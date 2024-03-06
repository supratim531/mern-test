import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { unauthorizedAxios } from "../axios/axios";

function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  const [authPayload, setAuthPayload] = useState({
    username: "",
    password: ""
  });

  const login = async payload => {
    try {
      const res = await unauthorizedAxios.post("/auth/login", payload);
      console.log({ res });
      const data = res?.data;
      console.log({ data });
      localStorage.setItem("token", data?.accessToken);
      navigate('/', { state: { message: data?.message } });
    } catch (err) {
      console.log({ err });
      if (err?.response?.data?.message) {
        toast.error(err?.response?.data?.message);
      } else {
        toast.error("Server Error: Server is offline");
      }
    }
  }

  const loginUser = e => {
    e.preventDefault();
    login(authPayload);
  }

  const handleAuthPayloadChange = e => {
    setAuthPayload({ ...authPayload, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const usernameSentFromRegister = location?.state?.username;

    if (token) {
      navigate('/');
    } else {
      if (usernameSentFromRegister) {
        toast.success(location?.state?.message);
        setAuthPayload({ ...authPayload, username: usernameSentFromRegister });
      }
    }
  }, []);

  return (
    <>
      <div className=""><Toaster /></div>

      <section className="space-y-4">
        <h1 className="pb-2 text-4xl bg-yellow-400">Login Page</h1>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form onSubmit={loginUser} className="space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="username" className="block mb-2 font-medium text-gray-900">Username</label>
                  <input
                    type="text"
                    onChange={handleAuthPayloadChange}
                    name="username"
                    value={authPayload?.username}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required={true}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 font-medium text-gray-900">Password</label>
                  <input
                    type="password"
                    onChange={handleAuthPayloadChange}
                    name="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required={true}
                  />
                </div>
                <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2.5 text-center bg-green-400">Login</button>
                <p className="font-light text-gray-500">
                  Dont have an account yet?{" "}
                  <Link to={"/register"} className="font-medium text-primary-600 hover:underline">Register</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
