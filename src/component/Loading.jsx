import styled from "@emotion/styled";
import React from "react";
import imgLogo from "../img/logo1.png";
import imgLogo2 from "../img/logo2.png";
import imgLogo3 from "../img/logo3.png";
import TypeIt from "typeit-react";
import { css, keyframes } from "@emotion/react";

const Loading = () => {
  return (
    <Base>
      <ImageWrapper>
        <Image src={imgLogo} />
        <Image2 src={imgLogo2} />
        <Image3 src={imgLogo3} />
      </ImageWrapper>
      <Title
        getBeforeInit={(instance) => {
          instance.type(`우리 ${localStorage.getItem("baby") ? localStorage.getItem("baby").slice(1, 3) : "아가"}`);
          return instance;
        }}
      />
    </Base>
  );
};

const display1 = keyframes`
  0% {
    z-index: 3;
  }

  100% {
    z-index: -1;
  }
`;

const display2 = keyframes`
  0% {
    z-index: 2;
  }

  100% {
    z-index: -1;
  }
`;

const Base = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImageWrapper = styled.div`
  width: 200px;
  height: 200px;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  animation: ${display1} 0.6s ease both 0.3s;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Image2 = styled.img`
  width: 100%;
  animation: ${display2} 0.6s ease both 0.6s;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Image3 = styled.img`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Title = styled(TypeIt)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  span.ti-cursor {
    display: none;
  }
`;

export default Loading;
