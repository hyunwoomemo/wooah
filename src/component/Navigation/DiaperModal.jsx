import { css } from "@emotion/react";
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
import Portal from "../common/Portal";
import Modal from "../common/Modal";

const DiaperModal = () => {
  const { now, setNow } = useContext(DateContext);
  const dispatch = useDispatch();

  const { volume, date, endDate, openCategory } = useSelector((state) => state.RecordModalSlice);
  const { selectValue } = useSelector((state) => state.DateSlice);

  const { selectData } = useSelector((state) => state.RecordSlice);

  const handleSmall = () => {
    dispatch(
      postItem({
        category: "diaper",
        date: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        recorder: localStorage.getItem("parents"),
        big: false,
        volume: null,
        email: localStorage.getItem("email"),
        groupName: localStorage.getItem("group"),
        endDate: null,
      })
    );
    dispatch(open(""));
    dispatch(select(new Date()));
  };

  const handleBig = () => {
    dispatch(
      postItem({
        category: "diaper",
        date: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        recorder: localStorage.getItem("parents"),
        big: true,
        volume: null,
        email: localStorage.getItem("email"),
        groupName: localStorage.getItem("group"),
        endDate: null,
      })
    );

    dispatch(open(""));
    dispatch(select(new Date()));
  };

  const handleBoth = () => {
    dispatch(
      postItem({
        category: "diaper",
        date: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        recorder: localStorage.getItem("parents"),
        big: 2,
        volume: null,
        email: localStorage.getItem("email"),
        groupName: localStorage.getItem("group"),
        endDate: null,
      })
    );

    dispatch(open(""));
    dispatch(select(new Date()));
  };

  return (
    <Modal isOpen={openCategory === "diaper"} onClose={() => dispatch(open(""))}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Base openCategory={openCategory}>
          <DiaperWrapper>
            <DiaperItem onClick={handleSmall}>소변</DiaperItem>
            <DiaperItem onClick={handleBig}>대변</DiaperItem>
            <DiaperItem onClick={handleBoth}>대변 + 소변</DiaperItem>
          </DiaperWrapper>
        </Base>
      </LocalizationProvider>
    </Modal>
  );
};

const Base = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 3rem;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;
const DiaperWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  gap: 1rem;
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

export default DiaperModal;
