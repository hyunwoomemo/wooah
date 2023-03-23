import { css } from "@emotion/react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateContext, ModalContext } from "../context/Context";
import { select } from "../slices/DateSlice";
import { selectDateMilk } from "../slices/MilkSlice";
import { open, selectDate, selectEndDate, updateVolume } from "../slices/RecordModalSlice";
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
      <CategoryItem onClick={handleRecordMilk}>분유</CategoryItem>
      <CategoryItem onClick={handleRecordSleep}>잠</CategoryItem>
      <CategoryItem>기저귀</CategoryItem>
      <CategoryItem>목욕</CategoryItem>
      <CategoryItem>일정 추가</CategoryItem>
      <MilkModal openCategory={openCategory} />
      <SleepModal />
      <CalendarModal />
    </Base>
  );
};

const Base = styled.div`
  padding: 1rem;
  @media (max-width: 768px) {
    padding: 10px;
  }

  gap: 1rem;

  display: flex;
`;

const CategoryItem = styled.div`
  padding: 1rem;
  @media (max-width: 768px) {
    padding: 10px;
  }
  background-color: #eeeeee;
  border-radius: 5px;
`;

export default RecordCategory;
