import React from "react";
import { createPortal } from "react-dom";

const Portal = ({ children, selector }) => {
  const rootElement = selector && document.querySelector(selector);

  return <>{rootElement ? createPortal(children, rootElement) : children}</>;
};

export default Portal;
