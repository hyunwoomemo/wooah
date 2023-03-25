import { css } from "@emotion/react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateContext, ModalContext } from "../context/Context";
import { select } from "../slices/DateSlice";
import { open, selectDate, selectEndDate, updateVolume } from "../slices/RecordModalSlice";
import BathIcon from "./categoryIcons/BathIcon";
import CalendarIcon from "./categoryIcons/CalendarIcon";
import DiaperIcon from "./categoryIcons/DiaperIcon";
import MilkIcon from "./categoryIcons/MilkIcon";
import SleepIcon from "./categoryIcons/SleepIcon";
import CalendarModal from "./Navigation/CalendarModal";
import MilkModal from "./Navigation/MilkModal";
import SleepModal from "./Navigation/SleepModal";

const RecordCategory = () => {
  const { openCategory } = useSelector((state) => state.RecordModalSlice);

  const dispatch = useDispatch();

  const { setNow } = useContext(DateContext);

  const handleRecordMilk = () => {
    setNow(dayjs(new Date()));
    dispatch(selectDate());
    dispatch(updateVolume(140));
    dispatch(open("milk"));
  };
  const handleRecordSleep = () => {
    setNow(dayjs(new Date()));
    dispatch(selectDate());
    dispatch(open("sleep"));
    dispatch(selectEndDate(""));
  };

  return (
    <Base>
      <CategoryItem onClick={handleRecordMilk}>
        <MilkIcon />
        분유
      </CategoryItem>
      <CategoryItem onClick={handleRecordSleep}>
        <SleepIcon />잠
      </CategoryItem>
      <CategoryItem>
        <DiaperIcon />
        기저귀
      </CategoryItem>
      <CategoryItem>
        <BathIcon />
        목욕
      </CategoryItem>
      <CategoryItem>
        <CalendarIcon />
        일정
      </CategoryItem>
      <MilkModal openCategory={openCategory} />
      <SleepModal />
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
`;

const CategoryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  > svg {
    width: 100px;
    height: 100px;
  }
  @media (max-width: 768px) {
    > svg {
      width: 50px;
      height: 50px;
    }
    font-size: 10px;
  }
`;

export default RecordCategory;
