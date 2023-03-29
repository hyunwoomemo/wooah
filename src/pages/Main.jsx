import React, { useState } from "react";
import Calendar from "../component/Calendar";
import DayDetail from "../component/Calendar/DayDetail";
import Layout from "../component/Layout";
import RecordCategory from "../component/RecordCategory";

const Main = () => {
  return (
    <Layout main="main">
      <Calendar />
      {/* <RecordCategory /> */}
      <DayDetail />
    </Layout>
  );
};

export default Main;
