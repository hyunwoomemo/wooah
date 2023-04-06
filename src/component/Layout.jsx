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

  return (
    <MilkModalContext.Provider value={{}}>
      <DateContext.Provider value={{ now, setNow }}>
        <Base open={openCategory} update={updateCategory === "milk" || updateCategory === "sleep"}>
          {children}
        </Base>
      </DateContext.Provider>
    </MilkModalContext.Provider>
  );
};

const Base = styled.div`
  position: relative;
  max-width: 1200px;
  overflow-x: hidden;
  height: 100vh;
  transition: all 0.3s;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch; /* enables “momentum” (smooth) scrolling */

  ${({ open, update }) =>
    open || update
      ? css`
          transform: scale(0.95);
          position: fixed;
          overflow: hidden;
          width: 100%;
        `
      : css`
          transform: scale(1);
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
