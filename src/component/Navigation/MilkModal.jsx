import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { StaticTimePicker } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

const Portal = (props) => {
  return createPortal(props.children, document.getElementById("portal"));
};

const MilkModal = ({ openAction, hideAction, showAction }) => {
  const [milkVolume, setMilkVolume] = useState(140);
  const [value, setValue] = useState(dayjs(new Date()));

  const handleMinus = () => {
    setMilkVolume((prev) => prev - 5);
  };
  const handlePlus = () => {
    setMilkVolume((prev) => prev + 5);
  };

  return (
    <Portal>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Base openAction={openAction} hideAction={hideAction} showAction={showAction}>
          <MilkWrapper>
            <MilkHandler>
              <button onClick={handleMinus}>-</button>
              <MilkValue>{`${milkVolume}ml`}</MilkValue>
              <button onClick={handlePlus}>+</button>
            </MilkHandler>
          </MilkWrapper>
          <TimePicker label="분유 먹은 시간" defaultValue={value || ""} value={value || ""} onChange={(newValue) => setValue(newValue)} />
        </Base>
      </LocalizationProvider>
    </Portal>
  );
};

const Base = styled.div`
  z-index: 999;
  max-width: 1200px;
  width: 90vw;
  height: 50vh;
  background-color: #fff;
  border: 1px solid #f1f1f1;
  box-shadow: 0px 0px 5px #e1e1e1;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  overflow: hidden;

  ${({ openAction, hideAction, showAction }) =>
    openAction === "milk" && hideAction && showAction
      ? css`
          transform: translate(-50%, -50%) scale(1);
        `
      : css`
          transform: translate(-50%, -50%) scale(0);
        `}
`;

const MilkWrapper = styled.div``;

const MilkValue = styled.div`
  display: flex;
  justify-content: center;
`;

const MilkHandler = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  font-size: 24px;

  > button {
    background: none;
    border: 0;
    font-size: 24px;
    border: 1px solid #f1f1f1;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 2px black;
    }
  }
`;

export default MilkModal;
