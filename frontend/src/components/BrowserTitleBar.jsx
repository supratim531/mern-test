import React from "react";
import { Helmet } from "react-helmet";

function BrowserTitleBar({ title }) {
  return (
    <Helmet>
      <title>MERN Test | {title}</title>
    </Helmet>
  );
}

export default BrowserTitleBar;
