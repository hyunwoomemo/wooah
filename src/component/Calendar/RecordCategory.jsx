import { css } from "@emotion/react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { select } from "../../slices/DateSlice";
import { open, selectDate, selectEndDate, updateVolume } from "../../slices/RecordModalSlice";
import { getList, postItem, putItem } from "../../slices/RecordSlice";
import BathIcon from "../categoryIcons/BathIcon";
import CalendarIcon from "../categoryIcons/CalendarIcon";
import DiaperIcon from "../categoryIcons/DiaperIcon";
import MilkIcon from "../categoryIcons/MilkIcon";
import SleepIcon from "../categoryIcons/SleepIcon";
import BathModal from "../RecordModal/BathModal";
import CalendarModal from "../RecordModal/CalendarModal";
import DiaperModal from "../RecordModal/DiaperModal";
import MilkModal from "../RecordModal/MilkModal";
import SleepModal from "../RecordModal/SleepModal";
import { isSameDay } from "../home/Calendar";

const RecordCategory = () => {
  const { openCategory, volume } = useSelector((state) => state.RecordModalSlice);
  const { data } = useSelector((state) => state.RecordSlice);
  const { selectValue } = useSelector((state) => state.DateSlice);
  const selectData = data?.filter((v) => isSameDay(new Date(v.date), selectValue) && v.email === localStorage.getItem("email"));

  const dispatch = useDispatch();

  const handleRecordMilk = () => {
    dispatch(
      postItem({
        category: "milk",
        date: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        recorder: localStorage.getItem("parents"),
        volume: volume,
        email: localStorage.getItem("email"),
        groupName: localStorage.getItem("group"),
        endDate: null,
        big: null,
        calendarTitle: null,
        calendarLocation: null,
        calendarUrl: null,
        calendarMemo: null,
        vitamin: null,
        lactobacillus: null,
      })
    );
    dispatch(select(new Date()));
    dispatch(selectDate(new Date()));

    if (selectData[selectData?.length - 1]?.category === "sleep" && selectData[selectData?.length - 1]?.endDate === null) {
      dispatch(
        putItem({
          id: selectData[selectData?.length - 1]?.id,
          category: "sleep",
          date: dayjs(new Date(selectData[selectData?.length - 1]?.date)).format("YYYY-MM-DD HH:mm:ss"),
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
  const handleRecordSleep = () => {
    dispatch(
      postItem({
        category: "sleep",
        date: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        recorder: localStorage.getItem("parents"),
        email: localStorage.getItem("email"),
        groupName: localStorage.getItem("group"),
        endDate: null,
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
    dispatch(select(new Date()));
    dispatch(selectDate(new Date()));

    if (selectData[selectData?.length - 1]?.category === "sleep" && selectData[selectData?.length - 1]?.endDate === null) {
      dispatch(
        putItem({
          id: selectData[selectData?.length - 1]?.id,
          category: "sleep",
          date: dayjs(new Date(selectData[selectData?.length - 1]?.date)).format("YYYY-MM-DD HH:mm:ss"),
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

      setTimeout(() => {
        dispatch(getList());
      }, 100);
    }

    setTimeout(() => {
      dispatch(getList());
    }, 100);
  };

  const handleRecordDiaper = () => {
    dispatch(open("diaper"));
  };

  const handleRecordBath = () => {
    dispatch(
      postItem({
        category: "bath",
        date: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        recorder: localStorage.getItem("parents"),
        email: localStorage.getItem("email"),
        groupName: localStorage.getItem("group"),
        endDate: null,
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

      setTimeout(() => {
        dispatch(getList());
      }, 100);
    }

    setTimeout(() => {
      dispatch(getList());
    }, 100);
  };

  const handleRecordCalendar = () => {
    dispatch(open("calendar"));
    dispatch(selectDate(dayjs(new Date(selectValue)).set("hour", 9).set("minute", 0).set("second", 0)));
    dispatch(selectEndDate(dayjs(new Date()).set("hour", 10).set("minute", 0).set("second", 0)));
    setTimeout(() => {
      dispatch(getList());
    }, 100);
  };

  return (
    <Base>
      <CategoryItem onClick={handleRecordMilk}>
        <MilkIcon />
      </CategoryItem>
      <CategoryItem onClick={handleRecordSleep}>
        <SleepIcon />
      </CategoryItem>
      <CategoryItem onClick={handleRecordDiaper}>
        <DiaperIcon />
      </CategoryItem>
      <CategoryItem onClick={handleRecordBath}>
        <BathIcon />
      </CategoryItem>
      <CategoryItem onClick={handleRecordCalendar}>
        <CalendarIcon />
      </CategoryItem>
      <MilkModal />
      <SleepModal />
      <DiaperModal />
      <BathModal />
      <CalendarModal />
    </Base>
  );
};

const Base = styled.div`
  padding: 1rem 1rem 1rem 0;
  @media (max-width: 768px) {
    padding: 1rem 0;
  }

  gap: 1rem;

  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-evenly;

  > div {
    cursor: pointer;
    &:first-of-type {
      background-color: #c2d8b6;
    }
    &:nth-of-type(2) {
      background-color: #b6d6d8;
    }
    &:nth-of-type(3) {
      background-color: #ceb6d8;
    }
    &:nth-of-type(4) {
      background-color: #d8b6c3;
    }
    &:nth-of-type(5) {
      background-color: #d8b6c3;
    }
  }
`;

const CategoryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;

  border-radius: 40%;
  width: 100px;
  height: 100px;
  justify-content: center;

  > svg {
    width: 80%;
    height: 80%;
  }
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 10px;
  }
`;

export default RecordCategory;
