import React, { useState } from "react";
import Calendar from "../component/Calendar";
import DayDetail from "../component/Calendar/DayDetail";
import Layout from "../component/Layout";
import styled from "@emotion/styled";
import { SectionsContainer, Section } from "react-fullpage";

const Main = () => {
  return (
    <Base>
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
