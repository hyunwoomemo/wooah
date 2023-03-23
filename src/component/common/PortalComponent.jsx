import React from "react";
import { createPortal } from "react-dom";

const PortalComponent = ({ children }) => {
  const Portal = (props) => {
    return createPortal(props.children, document.querySelector("#portal"));
  };

  return <Portal>{children}</Portal>;
};

export default PortalComponent;
