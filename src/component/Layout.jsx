import { css } from "@emotion/react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateContext, MilkModalContext } from "../context/Context";
import Header from "./Header";

const Layout = ({ children, main }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [now, setNow] = useState(dayjs(new Date()));
  const dispatch = useDispatch();

  const { openCategory, updateCategory } = useSelector((state) => state.RecordModalSlice);

  const handleScroll = () => {
    console.log("scrolling");
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <MilkModalContext.Provider value={{}}>
      <DateContext.Provider value={{ now, setNow }}>
        <Base open={openCategory || updateCategory}>
          <Header></Header>
          {children}
        </Base>
      </DateContext.Provider>
    </MilkModalContext.Provider>
  );
};

const Base = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  height: 100vh;
  transition: all 0.3s;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch; /* enables “momentum” (smooth) scrolling */

  ${({ open }) =>
    open
      ? css`
          transform: scale(0.95);
          border-radius: 10px;
          background-color: #ecedf2;
          opacity: 0.8;
        `
      : css`
          transform: scale(1);
          border-radius: 0;
        `}

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

export default Layout;
