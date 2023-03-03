import styled from "@emotion/styled";
import React from "react";
import { AiOutlineHome, AiOutlinePieChart, AiOutlineUser } from "react-icons/ai";
import { CiMemoPad } from "react-icons/ci";
import { Link, NavLink } from "react-router-dom";

const NavigationBar = () => {
  const activeStyle = {
    color: "#5552ff",
  };
  return (
    <Base>
      <NavLink to="/" data-text="HOME" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        <AiOutlineHome />
      </NavLink>
      <NavLink to="/memo" data-text="MEMO" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        <CiMemoPad />
      </NavLink>
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
  background-color: #80808011;
  display: flex;
  justify-content: space-evenly;
  align-self: center;
  border-radius: 30px 30px 0 0;

  @media (max-width: 768px) {
    bottom: 0;
    padding: 1rem 0 3rem;
  }

  > a {
    font-size: 32px;
    font-weight: bold;
    cursor: pointer;
    color: #3a3a3a;
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
      font-size: 20px;
    }
  }
`;

export default NavigationBar;
