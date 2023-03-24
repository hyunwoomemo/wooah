import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { DateContext } from "../../context/Context";
import { select } from "../../slices/DateSlice";
import { selectDate, open, update, selectEndDate } from "../../slices/RecordModalSlice";
import { postItem, putItem } from "../../slices/RecordSlice";
import Modal from "../common/Modal";
import Portal from "../common/Portal";

const UpdateSleep = ({ id }) => {
  const { now, setNow } = useContext(DateContext);
  const { date, endDate, updateCategory } = useSelector((state) => state.RecordModalSlice);

  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const handleTimeChange = (e) => {
    dispatch(selectDate(e));
    setNow(e);
  };

  const handleEndTimeChange = (e) => {
    dispatch(selectEndDate(e));
  };

  const handleSleepUpdate = () => {
    dispatch(
      putItem({
        id: id,
        category: "sleep",
        date: dayjs(new Date(now)).format("YYYY-MM-DD HH:mm:ss"),
        recorder: localStorage.getItem("parents"),
        email: localStorage.getItem("email"),
        groupName: localStorage.getItem("group"),
        endDate: dayjs(new Date(endDate)).format("YYYY-MM-DD HH:mm:ss"),
        volume: null,
        big: null,
      })
    );
    dispatch(select(new Date(date)));
    dispatch(selectDate(new Date(date)));
    dispatch(update(""));
  };

  return (
    <Modal isOpen={updateCategory === "sleep"} onClose={() => dispatch(update(""))}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Base updateCategory={updateCategory}>
          <CloseBtn onClick={() => dispatch(open(""))}></CloseBtn>
          <TimeWrapper>
            <TimePicker label="잠든 시간" defaultValue={dayjs(new Date(now)) || ""} value={dayjs(new Date(now)) || ""} onChange={handleTimeChange} />
            <TimePicker label="잠깬 시간" defaultValue={dayjs(new Date(endDate)) || ""} value={dayjs(new Date(endDate)) || ""} onChange={handleEndTimeChange} />
          </TimeWrapper>
          <SaveBtn>
            수정
            <AiOutlineCheck onClick={handleSleepUpdate} />
          </SaveBtn>
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

const SaveBtn = styled.div``;

export default UpdateSleep;
