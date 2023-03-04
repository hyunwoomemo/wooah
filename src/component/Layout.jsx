import styled from "@emotion/styled";
import React from "react";
import Header from "./Header";
import NavigationBar from "./Navigation";

const Layout = ({ children }) => {
  return (
    <Base>
      <Header></Header>
      {children}
      <NavigationBar></NavigationBar>
    </Base>
  );
};

const Base = styled.div`
  position: relative;
`;

export default Layout;
