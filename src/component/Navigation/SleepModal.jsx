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
import Overlay from "../common/Overlay";

const Portal = (props) => {
  return createPortal(props.children, document.querySelector("#portal"));
};

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
    <Portal>
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
      {openCategory ? <Overlay openCategpry={openCategory} select="open"></Overlay> : undefined}
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
  position: fixed;
  top: 50%;
  left: 50%;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  overflow: hidden;

  ${({ openCategory }) =>
    openCategory === "sleep"
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

const SaveBtn = styled.div``;

export default SleepModal;
