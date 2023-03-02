import React from "react";
import Header from "./Header";
import NavigationBar from "./Navigation";

const Layout = ({ children }) => {
  return (
    <>
      <Header></Header>
      {children}
      <NavigationBar></NavigationBar>
    </>
  );
};

export default Layout;
