import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { open } from "../../slices/RecordModalSlice";
import Modal from "../common/Modal";
import Portal from "../common/Portal";

const CalendarModal = ({ openAction, hideAction, showAction }) => {
  const [startTime, setStartTime] = useState(dayjs(new Date()));
  const [endTime, setEndTime] = useState();

  const { openCategory } = useSelector((state) => state.RecordModalSlice);
  const dispatch = useDispatch();

  return (
    <Modal isOpen={openCategory === "calendar"} onClose={() => dispatch(open(""))}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Base openAction={openAction} hideAction={hideAction} showAction={showAction}>
          <CloseBtn onClick={() => dispatch(open(""))}></CloseBtn>
          <TimeWrapper>
            <TimePicker label="잠든 시간" defaultValue={startTime || ""} value={startTime || ""} onChange={(newValue) => setStartTime(newValue)} />
            <TimePicker label="잠깬 시간" value={endTime || ""} onChange={(newValue) => setEndTime(newValue)} />
          </TimeWrapper>
        </Base>
      </LocalizationProvider>
    </Modal>
  );
};

const Base = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 3rem;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const CloseBtn = styled.div`
  width: 20%;
  background-color: #000000b1;
  height: 5px;
  border-radius: 20px;
  position: absolute;
  top: 1rem;
`;

const TimeWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

export default CalendarModal;
