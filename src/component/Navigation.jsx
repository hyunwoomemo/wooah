import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { AiOutlineHome, AiOutlinePieChart, AiOutlineUser, AiOutlinePlusCircle } from "react-icons/ai";
import { CiMemoPad } from "react-icons/ci";
import { Link, NavLink } from "react-router-dom";
import { ActionContext, DateContext, ModalContext } from "../context/Context";

const NavigationBar = ({ main }) => {
  const activeStyle = {
    color: "#fff",
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
    <Base showAction={showAction}>
      <Container>
        <NavLink to="/" data-text="HOME" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
          <AiOutlineHome />
        </NavLink>
        <NavLink to="/memo" data-text="MEMO" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
          <CiMemoPad />
        </NavLink>
        <Button main={main} showAction={showAction}>
          <AiOutlinePlusCircle onClick={handleAction} />
          <ActionBtn showAction={showAction}>🍼</ActionBtn>
          <ActionBtn showAction={showAction}>💤</ActionBtn>
          <ActionBtn showAction={showAction}></ActionBtn>
        </Button>
        <NavLink to="/chart" data-text="CHART" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
          <AiOutlinePieChart />
        </NavLink>
        <NavLink to="/user" data-text="USER" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
          <AiOutlineUser />
        </NavLink>
      </Container>
      <OverLay showAction={showAction}></OverLay>
    </Base>
  );
};

const Base = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: #000000;
  ${({ showAction }) =>
    showAction
      ? css`
          /* opacity: 0.7; */
        `
      : css``}
`;

const OverLay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  background-color: #000;
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
  padding: 2rem 0 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-evenly;
  align-self: center;

  @media (max-width: 768px) {
    bottom: 0;
    padding: 1rem 0 3rem;
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
    &:after {
      content: attr(data-text);
      position: absolute;
      left: 50%;
      top: 100%;
      transform: translateX(-50%);
      font-size: 16px;
      font-weight: lighter;

      @media (max-width: 768px) {
        font-size: 12px;
      }
    }
    @media (max-width: 768px) {
      font-size: 24px;
    }
  }
`;

const Button = styled.div`
  color: #66b355;
  font-size: 36px;
  display: flex;
  opacity: ${({ main }) => (main ? "1" : "0")};
  pointer-events: ${({ main }) => (main ? "auto" : "none")};
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 999;
`;

const ActionBtn = styled.div`
  position: absolute;
  width: 70px;
  height: 70px;
  font-size: 32px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 1px solid #00000032;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ showAction }) => (showAction ? "1" : "0")};
  z-index: ${({ showAction }) => (showAction ? "999" : undefined)};
  pointer-events: ${({ showAction }) => (showAction ? undefined : "none")};
  z-index: 999;

  &:first-of-type {
    ${({ showAction }) =>
      showAction
        ? css`
            transform: translate(-80px, -60px);
            transition: all 0.2s;
          `
        : css`
            transform: translate(0, 0);
            transition: all 0.2s;
          `}
  }

  &:nth-of-type(2) {
    ${({ showAction }) =>
      showAction
        ? css`
            transform: translateY(-100px);
            transition: all 0.4s;
          `
        : css`
            transform: translate(0, 0);
            transition: all 0.4s;
          `}
  }

  &:nth-of-type(3) {
    ${({ showAction }) =>
      showAction
        ? css`
            transform: translate(80px, -60px);
            transition: all 0.6s;
          `
        : css`
            transform: translate(0, 0);
            transition: all 0.6s;
          `}
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 24px;
    &:first-of-type {
      ${({ showAction }) =>
        showAction
          ? css`
              transform: translate(-50px, -40px);
              transition: all 0.2s;
            `
          : css`
              transform: translate(0, 0);
              transition: all 0.2s;
            `}
    }

    &:nth-of-type(2) {
      ${({ showAction }) =>
        showAction
          ? css`
              transform: translateY(-70px);
              transition: all 0.4s;
            `
          : css`
              transform: translate(0, 0);
              transition: all 0.4s;
            `}
    }

    &:nth-of-type(3) {
      ${({ showAction }) =>
        showAction
          ? css`
              transform: translate(50px, -40px);
              transition: all 0.6s;
            `
          : css`
              transform: translate(0, 0);
              transition: all 0.6s;
            `}
    }
  }
`;

export default NavigationBar;
