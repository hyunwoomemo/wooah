import React, { ReactNode, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import styled from "@emotion/styled/macro";

import "./modal.css";
import Portal from "./Portal";

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
  transform: translateY(5%);
  position: relative;
  background-color: #fff;
  border-radius: 10px;
`;

const Modal = ({ children, onClose, isOpen, selector = "#portal" }) => {
  return (
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <Portal selector={selector}>
        <Overlay>
          <Container>{children}</Container>
        </Overlay>
      </Portal>
    </CSSTransition>
  );
};

export default Modal;
