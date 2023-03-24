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
import { selectDate, open, update, selectEndDate, minus, plus } from "../../slices/RecordModalSlice";
import { postItem, putItem } from "../../slices/RecordSlice";
import Modal from "../common/Modal";
import Portal from "../common/Portal";

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
      })
    );
    dispatch(select(new Date(date)));
    dispatch(selectDate(new Date(date)));
    dispatch(update(""));
  };

  return (
    <Modal isOpen={updateCategory === "milk"} onClose={() => dispatch(update(""))}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Base updateCategory={updateCategory}>
          <CloseBtn onClick={() => dispatch(update(""))}></CloseBtn>
          <MilkWrapper>
            <MilkHandler>
              <button onClick={(e) => dispatch(minus(5))}>-</button>
              <MilkValue>{`${volume}ml`}</MilkValue>
              <button onClick={() => dispatch(plus(5))}>+</button>
            </MilkHandler>
          </MilkWrapper>
          <TimePicker label="분유 먹은 시간" defaultValue={dayjs(new Date(now)) || ""} value={dayjs(new Date(now)) || ""} onChange={handleTimeChange} />
          <SaveBtn>
            <AiOutlineCheck onClick={handleMilkUpdate} />
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

const SaveBtn = styled.div``;

export default UpdateMilk;
