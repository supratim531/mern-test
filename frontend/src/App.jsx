import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import RootContext from "./contexts/RootContext";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { authorizedAxios } from "./axios/axios";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const getCurrentUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const res = await authorizedAxios(token).get("/auth/current");
        console.log({ res });
        console.log({ data: res?.data });
        setIsLogin(true);
        setUsername(res?.data?.user?.username);
      }
    } catch (err) {
      console.log({ err });
      setIsLogin(false);
      localStorage.clear();
      navigate("/login");
    }
  }

  const authSetup = () => {
    if (location?.state?.message) {
      console.log(location?.state?.message);
      toast.success(location?.state?.message);
    }

    navigate(location.pathname, { replace: true });
    console.log("App.jsx: authSetup called");
    getCurrentUserDetails();
  }

  useEffect(() => {
    authSetup();
  }, []);

  const contextData = {
    username,
    isLogin, setIsLogin,
    isProcessing, setIsProcessing
  }

  return (
    <>
      <div className=""><Toaster /></div>

      <RootContext.Provider value={contextData}>
        <Navbar />
        <Outlet />
      </RootContext.Provider>
    </>
  );
}

export default App;
