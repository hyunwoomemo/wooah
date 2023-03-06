import styled from "@emotion/styled";
import React, { useState } from "react";
import { LatestWorkContext, ModalContext } from "../context/Context";
import Header from "./Header";
import NavigationBar from "./Navigation";

const Layout = ({ children, main }) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);
  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      <Base>
        <Header></Header>
        {children}
        <NavigationBar main={main}></NavigationBar>
      </Base>
    </ModalContext.Provider>
  );
};

const Base = styled.div`
  position: relative;
`;

export default Layout;
