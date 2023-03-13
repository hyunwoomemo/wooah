import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Portal = (props) => {
  return createPortal(props.children, document.querySelector("#portal"));
};

const SleepModal = ({ openAction, hideAction, showAction }) => {
  const [startTime, setStartTime] = useState(dayjs(new Date()));
  const [endTime, setEndTime] = useState();

  return (
    <Portal>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Base openAction={openAction} hideAction={hideAction} showAction={showAction}>
          <TimeWrapper>
            <TimePicker label="잠든 시간" defaultValue={startTime || ""} value={startTime || ""} onChange={(newValue) => setStartTime(newValue)} />
            <TimePicker label="잠깬 시간" value={endTime || ""} onChange={(newValue) => setEndTime(newValue)} />
          </TimeWrapper>
        </Base>
      </LocalizationProvider>
    </Portal>
  );
};

const Base = styled.div`
  z-index: 999;
  width: 80vw;
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
  overflow-y: hidden;

  ${({ openAction, hideAction, showAction }) =>
    openAction === "sleep" && hideAction && showAction
      ? css`
          transform: translate(-50%, -50%) scale(1);
        `
      : css`
          transform: translate(-50%, -50%) scale(0);
        `}
`;

const TimeWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

export default SleepModal;
