import React, { useState } from "react";
import AddModal from "../component/AddModal";
import Calender from "../component/Calender";
import Layout from "../component/Layout";

const Main = () => {
  return (
    <Layout main="main">
      <Calender />
      <AddModal />
    </Layout>
  );
};

export default Main;
