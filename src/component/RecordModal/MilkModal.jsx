import styled from "@emotion/styled";
import React, { useContext, useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCheck } from "react-icons/ai";
import { getItem, getList, postItem, putItem } from "../../slices/RecordSlice";
import { select } from "../../slices/DateSlice";
import { onChange, open, selectDate, plus, minus } from "../../slices/RecordModalSlice";
import { DateContext } from "../../context/Context";
import Modal from "../common/Modal";

const MilkModal = () => {
  useEffect(() => {
    dispatch(onChange(dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")));
  }, []);

  const { now, setNow } = useContext(DateContext);
  const dispatch = useDispatch();

  const { volume, date, endDate, openCategory } = useSelector((state) => state.RecordModalSlice);
  const { selectValue } = useSelector((state) => state.DateSlice);

  const { selectData } = useSelector((state) => state.RecordSlice);

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
        calendarTitle: null,
        calendarLocation: null,
        calendarUrl: null,
        calendarMemo: null,
        vitamin: null,
        lactobacillus: null,
      })
    );

    dispatch(open(""));
    dispatch(select(new Date(date)));

    if (selectData[selectData?.length - 1]?.category === "sleep" && selectData[selectData?.length - 1]?.endDate === null) {
      dispatch(
        putItem({
          id: selectData[selectData?.length - 1]?.id,
          category: "sleep",
          date: dayjs(new Date(selectData[selectData?.length - 1]?.date)).format("YYYY-MM-DD HH:mm:ss"),
          recorder: localStorage.getItem("parents"),
          email: localStorage.getItem("email"),
          groupName: localStorage.getItem("group"),
          endDate: dayjs(new Date(now)).format("YYYY-MM-DD HH:mm:ss"),
          volume: null,
          big: null,
        })
      );

      dispatch(select(new Date(date)));

      setTimeout(() => {
        dispatch(getList());
      }, 100);
    }
  };

  return (
    <Modal isOpen={openCategory === "milk"} onClose={() => dispatch(open(""))}>
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

const SaveBtn = styled.div``;

export default MilkModal;
