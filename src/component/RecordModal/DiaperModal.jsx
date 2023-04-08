import styled from "@emotion/styled";
import React, { useContext, useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { getItem, getList, postItem, putItem } from "../../slices/RecordSlice";
import { select } from "../../slices/DateSlice";
import { onChange, open, selectDate, plus, minus } from "../../slices/RecordModalSlice";
import { DateContext } from "../../context/Context";
import Modal from "../common/Modal";

const DiaperModal = () => {
  const { now, setNow } = useContext(DateContext);
  const dispatch = useDispatch();

  const { volume, date, endDate, openCategory } = useSelector((state) => state.RecordModalSlice);
  const { selectValue } = useSelector((state) => state.DateSlice);

  const { data, selectData } = useSelector((state) => state.RecordSlice);
  const filterData = data?.filter((v) => v.category !== "calendar");
  console.log(filterData);

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
        calendarTitle: null,
        calendarLocation: null,
        calendarUrl: null,
        calendarMemo: null,
        vitamin: null,
        lactobacillus: null,
      })
    );
    dispatch(open(""));
    dispatch(select(new Date()));

    if (filterData[filterData?.length - 1]?.category === "sleep" && filterData[filterData?.length - 1]?.endDate === null) {
      dispatch(
        putItem({
          id: filterData[filterData?.length - 1]?.id,
          category: "sleep",
          date: dayjs(new Date(filterData[filterData?.length - 1]?.date)).format("YYYY-MM-DD HH:mm:ss"),
          recorder: localStorage.getItem("parents"),
          email: localStorage.getItem("email"),
          groupName: localStorage.getItem("group"),
          endDate: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
          volume: null,
          big: null,
          calendarTitle: null,
          calendarLocation: null,
          calendarUrl: null,
          calendarMemo: null,
          vitamin: null,
          lactobacillus: null,
        })
      );
    }

    setTimeout(() => {
      dispatch(getList());
    }, 100);
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
        calendarTitle: null,
        calendarLocation: null,
        calendarUrl: null,
        calendarMemo: null,
        vitamin: null,
        lactobacillus: null,
      })
    );

    dispatch(open(""));
    dispatch(select(new Date()));

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
          calendarTitle: null,
          calendarLocation: null,
          calendarUrl: null,
          calendarMemo: null,
          vitamin: null,
          lactobacillus: null,
        })
      );
    }
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
        calendarTitle: null,
        calendarLocation: null,
        calendarUrl: null,
        calendarMemo: null,
        vitamin: null,
        lactobacillus: null,
      })
    );

    dispatch(open(""));
    dispatch(select(new Date()));

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
          calendarTitle: null,
          calendarLocation: null,
          calendarUrl: null,
          calendarMemo: null,
          vitamin: null,
          lactobacillus: null,
        })
      );
    }
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
