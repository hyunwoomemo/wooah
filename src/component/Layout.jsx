import styled from "@emotion/styled";
import React, { useState } from "react";
import { ActionContext, DateContext, LatestWorkContext, ModalContext } from "../context/Context";
import Header from "./Header";
import NavigationBar from "./Navigation";

const Layout = ({ children, main }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showAction, setShowAction] = useState(false);
  return (
    <DateContext.Provider value={{ date, setDate }}>
      <ModalContext.Provider value={{ isOpen, setIsOpen }}>
        <ActionContext.Provider value={{ showAction, setShowAction }}>
          <Base showAction={showAction}>
            <Header></Header>
            {children}
          </Base>
          <NavigationBar main={main}></NavigationBar>
        </ActionContext.Provider>
      </ModalContext.Provider>
    </DateContext.Provider>
  );
};

const Base = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;

  opacity: ${({ showAction }) => (showAction ? "0.4" : "1")};
  pointer-events: ${({ showAction }) => (showAction ? "none" : undefined)};
`;

export default Layout;
