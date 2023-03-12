import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { AiOutlineHome, AiOutlinePieChart, AiOutlineUser } from "react-icons/ai";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { BsCalendarDate } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { ActionContext, DateContext, ModalContext } from "../context/Context";

const NavigationBar = ({ main }) => {
  const activeStyle = {
    backgroundColor: "#fff",
    borderRadius: "50%",
  };

  const Portal = (props) => {
    return createPortal(props.children, document.getElementById("portal"));
  };

  const { isOpen, setIsOpen } = useContext(ModalContext);
  const { date, setDate } = useContext(DateContext);
  const today = new Date();
  const current = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, 0)}-${String(today.getDate()).padStart(2, 0)}`;
  const { showAction, setShowAction } = useContext(ActionContext);

  const handleAction = () => {
    setShowAction(!showAction);
  };

  return (
    <Button showAction={showAction} isOpen={isOpen}>
      <PlusBtn onClick={handleAction} showAction={showAction} main={main}>
        +
      </PlusBtn>
      <ActionBtn showAction={showAction}>🍼</ActionBtn>
      <ActionBtn showAction={showAction}>💤</ActionBtn>
      <ActionBtn showAction={showAction}>🗓️</ActionBtn>
      <Base showAction={showAction}>
        <Container>
          <NavLink to="/" data-text="HOME" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            <AiOutlineHome />
          </NavLink>
          <NavLink to="/memo" data-text="MEMO" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            <HiOutlineChatBubbleBottomCenterText />
          </NavLink>
          <div></div>
          <NavLink to="/chart" data-text="CHART" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            <BsCalendarDate />
          </NavLink>
          <NavLink to="/user" data-text="USER" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            <AiOutlineUser />
          </NavLink>
        </Container>
        <OverLay showAction={showAction}></OverLay>
      </Base>
    </Button>
  );
};

const Base = styled.div`
  position: fixed;
  background-color: #d8d8d85f;
  max-width: 1200px;
  width: 80vw;
  margin: 0 auto;
  border-radius: 80px;
  transition: all 0.6s;
  transform-origin: 50% 50%;
  left: 50%;
  transform: translateX(-50%);
  padding: 14px;

  @media (max-width: 768px) {
    padding: 9px;
  }

  ${({ showAction }) =>
    showAction
      ? css`
          transform: translateX(-50%) scale(0);
        `
      : css`
          transform: translateX(-50%) scale(1);
        `}
`;

const OverLay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 80px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  ${({ showAction }) =>
    showAction
      ? css`
          opacity: 0.7;
          z-index: 1;
        `
      : css`
          z-index: -1;
          opacity: 0;
        `}
`;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-self: center;
  height: 100%;

  @media (max-width: 768px) {
    bottom: 0;
    > div {
      width: 50px;
    }
  }

  > a {
    font-size: 36px;
    font-weight: bold;
    cursor: pointer;
    color: #898989;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;

    @media (max-width: 768px) {
      padding: 8px;
    }

    /* &:nth-of-type(2) {
      margin-right: 70px;
    } */
    &:nth-of-type(3) {
      > svg {
        width: 80%;
      }
    }

    @media (max-width: 768px) {
      font-size: 24px;
    }
  }
`;

const Button = styled.div`
  display: ${({ isOpen }) => (isOpen ? "none" : "flex")};
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: fixed;
  bottom: 30px;
  z-index: 999;
  left: 50%;
  transform: translateX(-50%);
`;

const PlusBtn = styled.p`
  background-color: #fff;
  box-shadow: 1px 1px 3px gray;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  position: relative;
  z-index: 999;
  border-radius: 50%;

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
  }

  &:after {
    width: 111%;
    height: 111%;
    position: absolute;
    background-color: #c39595;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 0px 5px gray;
    content: "+";
    color: #fff;
    border-radius: 50%;
    transition: all 0.6s;
    ${({ showAction }) =>
      showAction
        ? css`
            transform: rotate(45deg) scale(1);
          `
        : css`
            transform: rotate(0) scale(0);
          `}
  }
`;

const ActionBtn = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  font-size: 40px;
  border-radius: 50%;
  background-color: #ddbdbdb6;
  box-shadow: 1px 1px 3px gray;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ showAction }) => (showAction ? "1" : "0")};
  z-index: ${({ showAction }) => (showAction ? "999" : undefined)};
  pointer-events: ${({ showAction }) => (showAction ? undefined : "none")};
  z-index: 999;
  transition: all 0.3s;

  &:first-of-type {
    ${({ showAction }) =>
      showAction
        ? css`
            transform: translate(-160px, -120px) scale(1);
            transition-delay: 0.1s;
          `
        : css`
            transform: translate(0, 0) scale(0);
            transition-delay: 0.3s;
          `}
  }

  &:nth-of-type(2) {
    ${({ showAction }) =>
      showAction
        ? css`
            transform: translateY(-200px) scale(1);
            transition-delay: 0.2s;
          `
        : css`
            transform: translate(0, 0) scale(0);
            transition-delay: 0.2s;
          `}
  }

  &:nth-of-type(3) {
    font-size: 28px;
    color: #fff;
    ${({ showAction }) =>
      showAction
        ? css`
            transform: translate(160px, -120px) scale(1);
            transition-delay: 0.3s;
          `
        : css`
            transform: translate(0, 0) scale(0);
            transition-delay: 0.1s;
          `}
  }

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    font-size: 24px;
    transition-delay: 0.3ms;
    &:first-of-type {
      ${({ showAction }) =>
        showAction
          ? css`
              transform: translate(-80px, -80px) scale(1);
            `
          : css`
              transform: translate(0, 0) scale(0);
            `}
    }

    &:nth-of-type(2) {
      ${({ showAction }) =>
        showAction
          ? css`
              transform: translateY(-120px) scale(1);
            `
          : css`
              transform: translate(0, 0) scale(0);
            `}
    }

    &:nth-of-type(3) {
      ${({ showAction }) =>
        showAction
          ? css`
              transform: translate(80px, -80px) scale(1);
            `
          : css`
              transform: translate(0, 0) scale(0);
            `}
    }
  }
`;

export default NavigationBar;
