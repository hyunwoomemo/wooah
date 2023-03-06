import styled from "@emotion/styled";
import React, { useContext, useRef, useState } from "react";
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

  const [milk, setMilk] = useState(0);

  const milkRef = useRef();

  const handleMilkChange = (e) => {
    setMilk(e.target.value);
  };

  const [milkOpen, setMilkOpen] = useState(false);
  const handleMilk = () => {
    setMilkOpen(!milkOpen);
    setSleepOpen(false);
  };

  const [sleepOpen, setSleepOpen] = useState(false);
  const handleSleep = () => {
    setMilkOpen(false);
    setSleepOpen(!sleepOpen);
  };

  return (
    <>
      {isOpen ? (
        <Fade bottom>
          <Portal>
            <Overlay onClick={handleClose}>sdfdsf</Overlay>
            <Contents>
              <input type="date" defaultValue={new Date().toISOString().slice(0, 10)} />
              <CategoryWrapper>
                <li onClick={handleMilk}>🍼</li>
                <li onClick={handleSleep}>💤</li>
                <li>🛁</li>
                <li>🚽</li>
              </CategoryWrapper>
              {milkOpen ? (
                <MilkWrapper>
                  <Value ref={milkRef} onChange={handleMilkChange} type="range" value={milk} step="5" name="ml" min="10" max="500" />
                  <div>{`${milk}ml`}</div>
                </MilkWrapper>
              ) : undefined}
              {sleepOpen ? (
                <SleepWrapper>
                  <Value type="time" />
                  <div></div>
                </SleepWrapper>
              ) : undefined}
            </Contents>
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
  /*   height: 60%; */
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 10px;

  > input:first-of-type {
    margin-top: 20px;
    border: none;
    border: 1px solid gray;
    padding: 1rem;
  }
`;

const CategoryWrapper = styled.ul`
  margin-top: 10px;
  padding: 1rem 0;
  display: flex;
  gap: 5px;
  justify-content: space-around;
  align-items: center;
  > li {
    font-size: 24px;
    padding: 1rem;
    border-radius: 5px;
    background-color: #f3f3f3;
  }
`;
const MilkWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
`;

const SleepWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
`;

const Value = styled.input`
  display: flex;
`;

export default AddModal;
