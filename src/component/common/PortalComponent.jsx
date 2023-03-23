import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";

const PortalComponent = ({ children }) => {
  const Portal = (props) => {
    return createPortal(props.children, document.querySelector("#portal"));
  };

  const { openCategory, updateCategory } = useSelector((state) => state.RecordModalSlice);

  return (
    <CSSTransition in={openCategory || updateCategory} timeout={300} classNames="modal" unmountOnExit>
      <Portal>{children}</Portal>
    </CSSTransition>
  );
};

export default PortalComponent;
