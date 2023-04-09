import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { AiFillCheckCircle, AiOutlineCheck } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { DateContext } from "../../context/Context";
import { select } from "../../slices/DateSlice";
import { selectDate, open, update, selectEndDate, minus, plus } from "../../slices/RecordModalSlice";
import { getList, postItem, putItem } from "../../slices/RecordSlice";
import Modal from "../common/Modal";

const UpdateMilk = ({ id }) => {
  const { now, setNow } = useContext(DateContext);
  const { volume, date, endDate, updateCategory } = useSelector((state) => state.RecordModalSlice);

  const dispatch = useDispatch();

  const handleTimeChange = (e) => {
    dispatch(selectDate(e));
    setNow(e);
  };

  const handleMilkUpdate = () => {
    dispatch(
      putItem({
        id: id,
        category: "milk",
        date: dayjs(new Date(now)).format("YYYY-MM-DD HH:mm:ss"),
        recorder: localStorage.getItem("parents"),
        email: localStorage.getItem("email"),
        groupName: localStorage.getItem("group"),
        endDate: null,
        volume: volume,
        big: null,
        calendarTitle: null,
        calendarLocation: null,
        calendarUrl: null,
        calendarMemo: null,
        vitamin: vitamin ? 1 : null,
        lactobacillus: lactobacillus ? 1 : null,
      })
    );
    dispatch(select(new Date(date)));
    dispatch(selectDate(new Date(date)));
    setTimeout(() => {
      dispatch(getList());
    }, 100);
    dispatch(update(""));
  };

  const [vitamin, setVitamin] = useState(false);
  const [lactobacillus, setLactobacillus] = useState(false);

  const handleOption1 = () => {
    setVitamin(!vitamin);
  };
  const handleOption2 = () => {
    setLactobacillus(!lactobacillus);
  };

  return (
    <Modal isOpen={updateCategory === "milk"} onClose={() => dispatch(update(""))}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Base updateCategory={updateCategory}>
          <MilkWrapper>
            <MilkHandler>
              <button onClick={(e) => dispatch(minus(5))}>-</button>
              <MilkValue>{`${volume}ml`}</MilkValue>
              <button onClick={() => dispatch(plus(5))}>+</button>
            </MilkHandler>
          </MilkWrapper>
          <TimePicker label="분유 먹은 시간" defaultValue={dayjs(new Date(now)) || ""} value={dayjs(new Date(now)) || ""} onChange={handleTimeChange} />
          <AddOptionWrapper>
            <AddOption onClick={handleOption1} active={vitamin}>
              비타민
            </AddOption>
            <AddOption onClick={handleOption2} active={lactobacillus}>
              유산균
            </AddOption>
          </AddOptionWrapper>
          <SaveBtn>
            <AiFillCheckCircle onClick={handleMilkUpdate} />
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

const AddOptionWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
`;

const AddOption = styled.div`
  padding: 1rem;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;

  ${({ active }) =>
    active
      ? css`
          box-shadow: 0 0 1px 3px #bed45e;
        `
      : css`
          box-shadow: 0 0 1px 1px gray;
        `}
`;

const SaveBtn = styled.div`
  font-size: 40px;
`;

export default UpdateMilk;
