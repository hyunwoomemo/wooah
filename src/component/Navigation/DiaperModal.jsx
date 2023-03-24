import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useContext, useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { plus, minus } from "../../slices/RecordModalSlice";
import { AiOutlineCheck } from "react-icons/ai";
import { postItem } from "../../slices/RecordSlice";
import { select } from "../../slices/DateSlice";
import { onChange, open, selectDate } from "../../slices/RecordModalSlice";
import { DateContext } from "../../context/Context";
import Portal from "../common/Portal";
import Modal from "../common/Modal";

const DiaperModal = () => {
  useEffect(() => {
    dispatch(onChange(dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")));
  }, []);

  const { now, setNow } = useContext(DateContext);
  const dispatch = useDispatch();

  const { volume, date, openCategory } = useSelector((state) => state.RecordModalSlice);

  const handleTimeChange = (e) => {
    setNow(e);
    dispatch(selectDate(e));
  };

  const handleMilkSave = () => {
    dispatch(
      postItem({
        category: "milk",
        date: date,
        recorder: localStorage.getItem("parents"),
        volume: volume,
        email: localStorage.getItem("email"),
        groupName: localStorage.getItem("group"),
        endDate: null,
      })
    );

    dispatch(select(new Date(date)));
    dispatch(selectDate(new Date(date)));
    dispatch(open(""));
  };

  return (
    <Modal isOpen={openCategory === "diaper"} onClose={() => dispatch(open(""))}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Base openCategory={openCategory}>
          <CloseBtn onClick={() => dispatch(open(""))}></CloseBtn>
          <MilkWrapper>
            <MilkHandler>
              <button onClick={(e) => dispatch(minus(5))}>-</button>
              <MilkValue>{`${volume}ml`}</MilkValue>
              <button onClick={() => dispatch(plus(5))}>+</button>
            </MilkHandler>
          </MilkWrapper>
          <TimePicker label="분유 먹은 시간" defaultValue={now || ""} value={now || ""} onChange={handleTimeChange} />
          <SaveBtn>
            <AiOutlineCheck onClick={handleMilkSave} />
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

export default DiaperModal;
