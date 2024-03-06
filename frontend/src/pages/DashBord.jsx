import React from "react";
import BrowserTitleBar from "../components/BrowserTitleBar";

function Dashbord() {
  return (
    <>
      <BrowserTitleBar title={"DashBord"} />

      <section className="space-y-4">
        <h1 className="pb-2 flex text-4xl bg-yellow-400">DashBord</h1>
        <div className="text-center text-2xl">Welcome To Admin Panel</div>
      </section>
    </>
  );
}

export default Dashbord;
