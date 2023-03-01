import styled from "@emotion/styled";
import React from "react";
import { AiOutlineHome, AiOutlinePieChart, AiOutlineUser } from "react-icons/ai";
import { CiMemoPad } from "react-icons/ci";

const NavigationBar = () => {
  return (
    <Base>
      <AiOutlineHome />
      <CiMemoPad />
      <AiOutlinePieChart />
      <AiOutlineUser />
    </Base>
  );
};

const Base = styled.div`
  padding: 1rem 0;
  background-color: #ececec5c;
  position: fixed;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  bottom: 3rem;
  display: flex;
  justify-content: space-evenly;
  align-self: center;
  border-radius: 10px;

  @media (max-width: 768px) {
    bottom: 1rem;
  }

  > svg {
    font-size: 36px;
    cursor: pointer;
    color: #3a3a3a;
    @media (max-width: 768px) {
      font-size: 24px;
    }
  }
`;

export default NavigationBar;
