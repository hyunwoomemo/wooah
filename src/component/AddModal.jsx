import styled from "@emotion/styled";
import React, { useContext } from "react";
import { createPortal } from "react-dom";
import { ModalContext } from "../context/Context";
import Fade from "react-reveal/Fade";

const Portal = (props) => {
  return createPortal(props.children, document.getElementById("portal"));
};

const AddModal = () => {
  const { isOpen, setIsOpen } = useContext(ModalContext);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen ? (
        <Fade bottom>
          <Portal>
            <Overlay onClick={handleClose}>sdfdsf</Overlay>
            <Contents>추가하기</Contents>
          </Portal>
        </Fade>
      ) : undefined}
    </>
  );
};

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.3;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Contents = styled.div`
  width: 70%;
  height: 60%;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default AddModal;
