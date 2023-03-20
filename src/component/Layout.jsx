import { css } from "@emotion/react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionContext, DateContext, LatestWorkContext, MilkModalContext, ModalContext } from "../context/Context";
import { toggleAction } from "../slices/ActionModalSlice";
import { open } from "../slices/RecordModalSlice";
import Header from "./Header";
import NavigationBar from "./Navigation";

const Layout = ({ children, main }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [now, setNow] = useState(dayjs(new Date()));
  const dispatch = useDispatch();

  const { openCategory } = useSelector((state) => state.RecordModalSlice);

  return (
    <MilkModalContext.Provider value={{}}>
      <DateContext.Provider value={{ now, setNow }}>
        <ModalContext.Provider value={{ isOpen, setIsOpen }}>
          <Base openCategory={openCategory}>
            <OverLay openCategory={openCategory} onClick={() => dispatch(open(""))}></OverLay>
            <Header></Header>
            {children}
          </Base>
          <NavigationBar main={main}></NavigationBar>
        </ModalContext.Provider>
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

  ${({ openCategory }) =>
    openCategory
      ? css`
          overflow: hidden;
        `
      : css``}
`;

const OverLay = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #d7d7d7;
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.3s;
  ${({ openCategory }) =>
    openCategory
      ? css`
          z-index: 999;
          opacity: 0.8;
        `
      : css`
          opacity: 0;
          pointer-events: none;
        `}
`;

export default Layout;
