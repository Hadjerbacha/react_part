import React from "react";
import Header from "./header";
import Navbar from './Navbar';
import TablePage from "./TablePage";
import Email from "./Email";

const Page1 = () => {
  return (
    <div>
       <Navbar />
      <TablePage />
      <Email />
    </div>
  );
};

export default Page1;