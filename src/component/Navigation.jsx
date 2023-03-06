import styled from "@emotion/styled";
import React, { useContext } from "react";
import { AiOutlineHome, AiOutlinePieChart, AiOutlineUser, AiOutlinePlusCircle } from "react-icons/ai";
import { CiMemoPad } from "react-icons/ci";
import { Link, NavLink } from "react-router-dom";
import { ModalContext } from "../context/Context";

const NavigationBar = ({ main }) => {
  const activeStyle = {
    color: "#fff",
  };

  const { isOpen, setIsOpen } = useContext(ModalContext);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  return (
    <Base>
      <NavLink to="/" data-text="HOME" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        <AiOutlineHome />
      </NavLink>
      <NavLink to="/memo" data-text="MEMO" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        <CiMemoPad />
      </NavLink>
      <Button main={main} onClick={handleOpenModal}>
        <AiOutlinePlusCircle />
      </Button>
      <NavLink to="/chart" data-text="CHART" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        <AiOutlinePieChart />
      </NavLink>
      <NavLink to="/user" data-text="USER" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        <AiOutlineUser />
      </NavLink>
    </Base>
  );
};

const Base = styled.div`
  padding: 2rem 0 2rem;
  position: fixed;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  bottom: 0;
  background-color: #000000;
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
  color: #fff;
  font-size: 36px;
  display: ${({ main }) => (main ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default NavigationBar;
