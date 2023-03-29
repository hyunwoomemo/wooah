import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { select } from "../../slices/DateSlice";
import { open, selectDate, selectEndDate } from "../../slices/RecordModalSlice";
import { postItem } from "../../slices/RecordSlice";
import Modal from "../common/Modal";
import Portal from "../common/Portal";

const CalendarModal = ({ openAction, hideAction, showAction }) => {
  const { date, endDate } = useSelector((state) => state.RecordModalSlice);
  const [endTime, setEndTime] = useState();

  const { openCategory } = useSelector((state) => state.RecordModalSlice);
  const dispatch = useDispatch();

  const handleStartTime = (e) => {
    dispatch(selectDate(dayjs(new Date(e.target.value))));
  };

  const handleEndTime = (e) => {
    dispatch(selectEndDate(dayjs(new Date(e.target.value))));
  };

  const [end, setEnd] = useState(false);
  const handleEnd = () => {
    setEnd(true);
  };

  useEffect(() => {
    setEnd(false);

    return () => {
      setEnd(false);
    };
  }, []);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [urlValue, setUrlValue] = useState("");
  const [memo, setMemo] = useState("");

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleLocation = (e) => {
    setLocation(e.target.value);
  };
  const handleUrlValue = (e) => {
    setUrlValue(e.target.value);
  };
  const handleMemo = (e) => {
    setMemo(e.target.value);
  };

  const handleCheck = (e) => {
    setEnd(true);
  };

  const handleSave = () => {
    dispatch(
      postItem({
        category: "calendar",
        date: date,
        recorder: localStorage.getItem("parents"),
        volume: null,
        big: null,
        email: localStorage.getItem("email"),
        groupName: localStorage.getItem("group"),
        endDate: end ? endDate : null,
        calendarTitle: title || null,
        calendarLocation: location || null,
        calendarUrl: urlValue || null,
        calendarMemo: memo || null,
        vitamin: null,
        lactobacillus: null,
      })
    );

    dispatch(select(new Date(date)));
    dispatch(open(""));
  };

  const handleClose = () => {
    dispatch(open(""));
    setEnd(false);
  };

  return (
    <Modal isOpen={openCategory === "calendar"} onClose={handleClose}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Base openAction={openAction} hideAction={hideAction} showAction={showAction}>
          <InputWrapper>
            <TitleInput placeholder="제목" autofocus onChange={handleTitle}></TitleInput>
          </InputWrapper>
          <DateWrapper>
            <DateInput type="datetime-local" value={date} onChange={handleStartTime}></DateInput>
            <div>
              {end ? (
                <DateInput type="datetime-local" min={date} value={endDate} onChange={handleEndTime}></DateInput>
              ) : (
                <EndWrapper>
                  <End onClick={handleEnd}>종료 날짜</End>
                </EndWrapper>
              )}
              <input type="checkbox" onChange={handleCheck} />
            </div>
          </DateWrapper>
          <Location placeholder="위치" onChange={handleLocation}></Location>
          <Url placeholder="url" onChange={handleUrlValue}></Url>
          <Memo placeholder="메모" rows="5" onChange={handleMemo}></Memo>
          <SaveBtn title={title.length > 0} onClick={handleSave}>
            <AiFillCheckCircle />
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
  gap: 1rem;
  padding: 1rem;
  width: 100%;
  /* box-sizing: border-box; */
`;

const InputWrapper = styled.div``;

const TitleInput = styled.input`
  border: none;
  background: none;
`;

const DateWrapper = styled.div`
  /* display: flex;
  justify-content: space-between; */

  > div:nth-child(2) {
    display: flex;
  }
`;

const DateInput = styled.input`
  border: none;
  background: none;

  ${({ readOnly }) =>
    readOnly
      ? css`
          color: gray;
        `
      : css``}
`;

const EndWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const End = styled.div`
  font-size: 12px;
`;

const Location = styled.input`
  border: none;
  background: none;
`;
const Url = styled.input`
  border: none;
  background: none;
`;
const Memo = styled.textarea`
  border: none;
  background: none;
`;

const SaveBtn = styled.div`
  font-size: 40px;
  display: flex;
  justify-content: center;
  transition: all 0.3s;
  ${({ title }) =>
    title
      ? css`
          opacity: 1;
        `
      : css`
          opacity: 0;
        `}
`;

export default CalendarModal;
