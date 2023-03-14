import React, { useState } from "react";
import AddModal from "../component/AddModal";
import Calendar from "../component/Calendar";
import Layout from "../component/Layout";

const Main = () => {
  return (
    <Layout main="main">
      <Calendar />
      <AddModal />
    </Layout>
  );
};

export default Main;
