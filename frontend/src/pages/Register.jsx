import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { unauthorizedAxios } from "../axios/axios";
import BrowserTitleBar from "../components/BrowserTitleBar";

function Register() {
  const navigate = useNavigate();

  const [authPayload, setAuthPayload] = useState({
    username: "",
    password: ""
  });

  const register = async payload => {
    try {
      const res = await unauthorizedAxios.post("/auth/register", payload);
      console.log({ res });
      const data = res?.data;
      console.log({ data });

      navigate("/login", {
        state: {
          message: data?.message,
          username: authPayload?.username
        }
      });
    } catch (err) {
      console.log({ err });
      toast.error(err?.response?.data?.message);
    }
  }

  const registerUser = e => {
    e.preventDefault();
    register(authPayload);
  }

  const handleAuthPayloadChange = e => {
    setAuthPayload({ ...authPayload, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    const username = localStorage.getItem("username");

    if (username) {
      navigate('/');
    }
  }, []);

  return (
    <>
      <div className=""><Toaster /></div>

      <BrowserTitleBar title={"Register"} />

      <section className="space-y-4">
        <h1 className="pb-2 text-4xl bg-yellow-400">Signup Page</h1>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form onSubmit={registerUser} className="space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="username" className="block mb-2 font-medium text-gray-900">Username</label>
                  <input
                    type="text"
                    onChange={handleAuthPayloadChange}
                    name="username"
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
                <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2.5 text-center bg-green-400">Signup</button>
                <p className="font-light text-gray-500">
                  Already registered?{" "}
                  <Link to={"/login"} className="font-medium text-primary-600 hover:underline">Login</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
