import React, { ReactNode, useEffect, useRef, useState } from "react";
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
  bottom: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  max-width: 1200px;
  width: 90vw;
  min-height: 50vh;
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 3px gray;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dim = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Modal = ({ children, onClose, isOpen, selector = "#portal" }) => {
  const [screenWidth, setScreenWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", (e) => {
      setScreenWidth(e.target.innerWidth);
    });

    if (screenWidth < 769) setIsMobile(true);
    else setIsMobile(false);

    window.removeEventListener("resize", (e) => {
      setScreenWidth(e.target.innerWidth);
    });
  }, [screenWidth]);

  return (
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <Portal selector={selector}>
        <Overlay>
          <Dim onClick={onClose} />
          <Container>{children}</Container>
        </Overlay>
      </Portal>
    </CSSTransition>
  );
};

export default Modal;
