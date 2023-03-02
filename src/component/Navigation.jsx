import styled from "@emotion/styled";
import React from "react";
import { AiOutlineHome, AiOutlinePieChart, AiOutlineUser } from "react-icons/ai";
import { CiMemoPad } from "react-icons/ci";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <Base>
      <Link to="/">
        <AiOutlineHome />
      </Link>
      <Link to="/memo">
        <CiMemoPad />
      </Link>
      <Link>
        <AiOutlinePieChart />
      </Link>
      <Link>
        <AiOutlineUser />
      </Link>
    </Base>
  );
};

const Base = styled.div`
  padding: 2rem 0 2rem;
  position: fixed;
  max-width: 1200px;
  width: 95%;
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
    font-size: 36px;
    cursor: pointer;
    color: #3a3a3a;
    @media (max-width: 768px) {
      font-size: 24px;
    }
  }
`;

export default NavigationBar;
