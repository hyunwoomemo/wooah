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
      </CategoryItem>
      <CategoryItem onClick={handleRecordSleep}>
        <SleepIcon />
      </CategoryItem>
      <CategoryItem>
        <DiaperIcon />
      </CategoryItem>
      <CategoryItem>
        <BathIcon />
      </CategoryItem>
      <CategoryItem>
        <CalendarIcon />
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
`;

const CategoryItem = styled.div`
  /* padding: 1rem;
  @media (max-width: 768px) {
    padding: 10px;
  }
  background-color: #eeeeee;
  border-radius: 5px; */

  > svg {
    width: 100px;
    height: 100px;
  }
`;

export default RecordCategory;
