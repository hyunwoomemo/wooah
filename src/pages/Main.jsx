import React, { useState } from "react";
import Calendar from "../component/home/Calendar";
import DayDetail from "../component/Calendar/DayDetail";
import Layout from "../component/common/Layout";
import styled from "@emotion/styled";
import Loading from "../component/common/Loading";

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 1500);
  return (
    <Base>
      {isLoading ? <Loading /> : undefined}
      <Layout main="main">
        <Calendar />
        <DayDetail />
      </Layout>
    </Base>
  );
};

const Base = styled.div`
  scrollbar-width: none;
  -ms-overflow-style: none;
  overscroll-behavior: none;

  &::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
    background: transparent;
    -webkit-appearance: none;
  }
`;

export default Main;
