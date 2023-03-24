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
  const { selectData } = useSelector((state) => state.RecordSlice);

  const [scrollY, setScrollY] = useState(0);

  /* useEffect(() => {
    if (openCategory || updateCategory) {
      document.querySelector("body").style.cssText = `
        background-color: #131313;
      `;
    }

    return () => {
      document.querySelector("body").style.cssText = ``;
    };
  }); */

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

  ${({ open }) =>
    open
      ? css`
          transform: scaleY(0.95) scaleX(0.93);
          border-radius: 10px;
        `
      : css`
          transform: scaleY(1) scaleX(1);
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

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ebebeb43;
  position: fixed;
  top: 0;
  left: 0;
  border-radius: 10px;
  transition: all 0.3s;

  ${({ open }) =>
    open
      ? css`
          opacity: 1;
        `
      : css`
          opacity: 0;
          pointer-events: none;
        `}
`;

export default Layout;
