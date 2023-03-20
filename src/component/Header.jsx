import React, { useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { AiOutlineReload, AiOutlineSearch } from "react-icons/ai";
import { css } from "@emotion/react";
import { LatestWorkContext } from "../context/Context";

import db from "../data/record.json";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { select } from "../slices/DateSlice";
import { getList, lastItem } from "../slices/RecordSlice";

import Moment from "react-moment";
import "moment/locale/ko";

const Header = () => {
  const birthDay = `${localStorage.getItem("baby_birthday")}T00:00:00`;
  const getDateDiff = (birthDay) => {
    const diffDate = new Date() - new Date(birthDay);
    return Math.floor(diffDate / (1000 * 60 * 60 * 24));
  };

  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.RecordSlice);

  const [lastWork, setLastWork] = useState("");
  const [lastWorkTime, setLastWorkTime] = useState("");

  const contents =
    data &&
    Object.entries(data)
      ?.sort((a, b) => new Date(a.date) - new Date(b.date))
      ?.filter((v, i, arr) => i === arr.length - 1);

  useEffect(() => {
    if (!loading && contents?.length > 0) {
      setLastWork(contents[0][1]?.category);
      setLastWorkTime(dayjs(new Date(contents[0][1]?.date)).$d);
    }
  }, [data]);

  const [age, setAge] = useState(getDateDiff(birthDay) + 1);

  const { selectValue } = useSelector((state) => state.DateSlice);

  const isSameDay = (a, b) => {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  };

  const handleToday = () => {
    dispatch(select(new Date()));
  };

  return (
    <Base>
      <MainHeader>
        <Month>{selectValue.getMonth() + 1}</Month>
        <ContentsWrapper>
          <BabyInfoWrapper>
            <BabyAge>{`${localStorage.getItem("baby")} ${age}일`}</BabyAge>
          </BabyInfoWrapper>
        </ContentsWrapper>
        <IconsWrapper>
          <TodayBtn isToday={isSameDay(selectValue, new Date())} onClick={handleToday}>
            Today
          </TodayBtn>
          <IconsItem>
            <AiOutlineSearch />
          </IconsItem>
        </IconsWrapper>
      </MainHeader>
      <SubHeader>
        <DisplayLatestWork>{lastWork === "milk" ? "🍼 분유" : lastWork === "sleep" ? "💤 잠자는 중" : undefined}</DisplayLatestWork>
        {lastWork === "milk" ? <Moment fromNow>{lastWorkTime}</Moment> : lastWork === "sleep" ? <Moment interval={1000} date={lastWorkTime} durationFromNow></Moment> : undefined}
      </SubHeader>
    </Base>
  );
};

const Base = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 1rem 1rem 0;
  position: sticky;
  top: 0;
  color: var(--black-text-color);
  background-color: #fffffff5;
  z-index: 998;

  @media (max-width: 768px) {
    padding: 10px 10px 0;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const MainHeader = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
`;
const SubHeader = styled.div`
  display: flex;
  margin: 0 auto;
  gap: 10px;
`;

const Month = styled.div`
  font-size: 36px;
  transition: all 0.3s;
`;

const ContentsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  > svg {
    cursor: pointer;
  }
`;

const BabyInfoWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
`;

const BabyName = styled.div``;

const BabyAge = styled.div`
  /* font-size: 14px; */
`;

const DisplayLatestWork = styled.div``;

const DisplayLatestTime = styled.div``;

const IconsWrapper = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  gap: 1rem;
`;

const TodayBtn = styled.li`
  padding: 5px 10px;
  background-color: #000;
  color: #fff;
  border-radius: 20px;
  transition: all 0.3s;
  cursor: pointer;
  list-style: none;

  @media (max-width: 768px) {
    padding: 4px 6px;
  }

  ${({ isToday }) =>
    isToday
      ? css`
          opacity: 0;
          pointer-events: none;
        `
      : css`
          opacity: 1;
          pointer-events: all;
        `}
`;

const IconsItem = styled.li`
  font-size: 24px;
`;

export default Header;
