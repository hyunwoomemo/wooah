import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
import PortalComponent from "../common/PortalComponent";

const Portal = (props) => {
  return createPortal(props.children, document.getElementById("portal"));
};

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
    <PortalComponent>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Base openCategory={openCategory}>
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
    </PortalComponent>
  );
};

const Base = styled.div`
  z-index: 999;
  max-width: 1200px;
  width: 90vw;
  height: 90vh;
  background-color: #fff;
  border: 1px solid #f1f1f1;
  box-shadow: 0px 0px 5px #e1e1e1;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;

  ${({ openCategory }) =>
    openCategory === "milk"
      ? css`
          transform: translate(-50%, -50%) scale(1);
        `
      : css`
          transform: translate(-50%, 50%) scale(0);
        `}
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
