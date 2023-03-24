import React, { ReactNode, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import styled from "@emotion/styled/macro";

import "./modal.css";
import Portal from "./Portal";
import { css } from "@emotion/react";

const Overlay = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  right: 0;
  left: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 3px gray;
  display: flex;
  justify-content: center;
  ${({ distanceY }) =>
    distanceY
      ? css`
          transform: translateY(${distanceY}px);
          will-change: transform;
        `
      : css`
          transform: translateY(5%);
          will-change: auto;
        `}
`;

const CloseWrapper = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  height: 30px;
`;

const CloseBtn = styled.div`
  width: 20%;
  max-width: 60px;
  background-color: #000000b1;
  height: 5px;
  border-radius: 20px;
  top: 1rem;
`;

const Modal = ({ children, onClose, isOpen, selector = "#portal" }) => {
  const [touchPosition, setTouchPosition] = useState({});
  const [distanceY, setDistanceY] = useState(0);

  const touchMove = (e) => {
    setDistanceY(e.changedTouches[0].pageY);
  };

  const touchEnd = (e) => {
    const distanceX = Math.abs(touchPosition.x - e.changedTouches[0].pageX);
    const distanceY = Math.abs(touchPosition.y - e.changedTouches[0].pageY);

    if (distanceY + distanceX > 50 && distanceY > distanceX) {
      onClose();
    }
    setTimeout(() => {
      setDistanceY(0);
      setTouchPosition({
        x: 0,
        y: 0,
      });
    }, 50);
  };

  return (
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <Portal selector={selector}>
        <Overlay>
          <Container distanceY={distanceY}>
            <CloseWrapper
              onTouchStart={(e) => {
                setTouchPosition({
                  x: e.changedTouches[0].pageX,
                  y: e.changedTouches[0].pageY,
                });
              }}
              onTouchMove={touchMove}
              onTouchEnd={touchEnd}
            >
              <CloseBtn></CloseBtn>
            </CloseWrapper>
            {children}
          </Container>
        </Overlay>
      </Portal>
    </CSSTransition>
  );
};

export default Modal;
