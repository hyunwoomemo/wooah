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

const UpdateDiaper = ({ id }) => {
  const { now, setNow } = useContext(DateContext);
  const { date, endDate, updateCategory, selectDate } = useSelector((state) => state.RecordModalSlice);

  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const handleTimeChange = (e) => {
    setNow(e);
  };

  const [big, setBig] = useState(0);

  const handleDiaperUpdate = () => {
    dispatch(
      putItem({
        id: id,
        category: "diaper",
        date: dayjs(new Date(now)).format("YYYY-MM-DD HH:mm:ss"),
        recorder: localStorage.getItem("parents"),
        email: localStorage.getItem("email"),
        groupName: localStorage.getItem("group"),
        endDate: null,
        volume: null,
        big: big,
        calendarTitle: null,
        calendarLocation: null,
        calendarUrl: null,
        calendarMemo: null,
        vitamin: null,
        lactobacillus: null,
      })
    );
    dispatch(select(new Date(date)));

    dispatch(update(""));
  };

  const handleSmall = () => {
    setBig(0);
  };

  const handleBig = () => {
    setBig(1);
  };

  const handleBoth = () => {
    setBig(2);
  };

  return (
    <Modal isOpen={updateCategory === "diaper"} onClose={() => dispatch(update(""))}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Base updateCategory={updateCategory}>
          <TimeWrapper>
            <TimePicker label="시간" defaultValue={dayjs(new Date(now)) || ""} value={dayjs(new Date(now)) || ""} onChange={handleTimeChange} />
          </TimeWrapper>
          <DiaperWrapper big={big}>
            <DiaperItem onClick={handleSmall}>소변</DiaperItem>
            <DiaperItem onClick={handleBig}>대변</DiaperItem>
            <DiaperItem onClick={handleBoth}>대변 + 소변</DiaperItem>
          </DiaperWrapper>
          <SaveBtn>
            수정
            <AiOutlineCheck onClick={handleDiaperUpdate} />
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

const DiaperWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  gap: 1rem;

  > div:nth-of-type(${({ big }) => (big > -1 ? big + 1 : undefined)}) {
    background-color: #a0a0cc;
  }
`;

const DiaperItem = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  height: 50px;
  align-items: center;
  background-color: #eeeeee;
  border-radius: 15px;
  box-shadow: 0 0 5px #eee;
`;

const SaveBtn = styled.div``;

export default UpdateDiaper;
