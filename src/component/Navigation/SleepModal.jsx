import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AiOutlineCheck } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { DateContext } from "../../context/Context";
import { select } from "../../slices/DateSlice";
import { selectDate, open, selectEndDate } from "../../slices/RecordModalSlice";
import { postItem } from "../../slices/RecordSlice";
import Modal from "../common/Modal";
import Overlay from "../common/Overlay";
import Portal from "../common/Portal";

const SleepModal = () => {
  const { now, setNow } = useContext(DateContext);
  const { date, endDate } = useSelector((state) => state.RecordModalSlice);
  const [endTime, setEndTime] = useState();

  const { openCategory } = useSelector((state) => state.RecordModalSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    setNow(dayjs(new Date()));
  }, []);

  const handleTimeChange = (e) => {
    dispatch(selectDate(e));
    setNow(e);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e);
    dispatch(selectEndDate(e));
  };

  const handleSleepSave = () => {
    dispatch(
      postItem({
        category: "sleep",
        date: date,
        recorder: localStorage.getItem("parents"),
        email: localStorage.getItem("email"),
        groupName: localStorage.getItem("group"),
        endDate: endTime ? dayjs(new Date(endTime)).format("YYYY-MM-DD HH:mm:ss") : null,
        volume: null,
      })
    );
    dispatch(select(new Date(date)));
    dispatch(selectDate(new Date(date)));
    dispatch(open(""));
  };

  return (
    <Modal isOpen={openCategory === "sleep"} onClose={() => dispatch(open(""))}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Base openCategory={openCategory}>
          <TimeWrapper>
            <TimePicker label="잠든 시간" defaultValue={now || ""} value={now || ""} onChange={handleTimeChange} />
            <TimePicker label="잠깬 시간" defaultValue={""} value={endTime || ""} onChange={handleEndTimeChange} onClick={() => console.log("ab")} />
          </TimeWrapper>
          <SaveBtn>
            <AiOutlineCheck onClick={handleSleepSave} />
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

const TimeWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const SaveBtn = styled.div``;

export default SleepModal;
