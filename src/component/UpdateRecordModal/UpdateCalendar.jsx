import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { AiFillCheckCircle, AiOutlineCheck } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { select } from "../../slices/DateSlice";
import { open, selectDate, selectEndDate, update } from "../../slices/RecordModalSlice";
import { getList, postItem, putItem } from "../../slices/RecordSlice";
import Modal from "../common/Modal";

const UpdateCalendar = ({ id, time, ct, cl, cm }) => {
  const { date, endDate } = useSelector((state) => state.RecordModalSlice);
  const { openCategory, updateCategory } = useSelector((state) => state.RecordModalSlice);
  const { selectValue } = useSelector((state) => state.DateSlice);
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

  const handleCalendarUpdate = () => {
    dispatch(
      putItem({
        id: id,
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
    dispatch(getList());
  };

  return (
    <Modal isOpen={updateCategory === "calendar"} onClose={() => dispatch(update(""))}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Base>
          <InputWrapper>
            <TitleInput placeholder="제목" autofocus onChange={handleTitle} defaultValue={ct ? ct : null}></TitleInput>
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
          <Location placeholder="위치" onChange={handleLocation} defaultValue={cl ? cl : null}></Location>
          <Url placeholder="url" onChange={handleUrlValue}></Url>
          <Memo placeholder="메모" onChange={handleMemo} defaultValue={cm ? cm : null}></Memo>
          <SaveBtn title={title.length > 0}>
            수정
            <AiOutlineCheck onClick={handleCalendarUpdate} />
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
  font-size: 24px;
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
  font-size: 18px;

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

const End = styled.div``;

const Location = styled.input`
  border: none;
  background: none;
  font-size: 18px;
`;
const Url = styled.input`
  border: none;
  background: none;
  font-size: 18px;
`;
const Memo = styled.textarea`
  border: none;
  background: none;
  font-size: 18px;
`;

const SaveBtn = styled.div`
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

export default UpdateCalendar;
