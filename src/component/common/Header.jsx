import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";

import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { select } from "../../slices/DateSlice";

import Moment from "react-moment";
import "moment/locale/ko";

const Header = () => {
  const birthDay = `${localStorage.getItem("baby_birthday")}T00:00:00`;
  const getDateDiff = (birthDay) => {
    const diffDate = new Date() - new Date(birthDay);
    return Math.floor(diffDate / (1000 * 60 * 60 * 24));
  };

  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => state.RecordSlice);

  const [lastWork, setLastWork] = useState("");
  const [lastWorkTime, setLastWorkTime] = useState("");
  const [lastWorkEndTime, setLastWorkEndTime] = useState("");

  const filterData = data?.filter((v) => v.category !== "calendar" && v.email === localStorage.getItem("email"));

  console.log(lastWork, lastWorkTime, lastWorkEndTime);

  const contents =
    filterData &&
    Object.entries(filterData)
      ?.sort((a, b) => new Date(a[1].date) - new Date(b[1].date))
      ?.filter((v, i, arr) => i === arr.length - 1);

  useEffect(() => {
    if (!loading && contents?.length > 0) {
      setLastWork(contents[0][1]?.category);
      setLastWorkTime(dayjs(new Date(contents[0][1]?.date)).$d);
      setLastWorkEndTime(contents[0][1]?.endDate ? dayjs(new Date(contents[0][1]?.endDate)).$d : null);
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

  const baby = localStorage.getItem("baby");

  const { openCategory, updateCategory } = useSelector((state) => state.RecordModalSlice);

  return (
    <Base open={openCategory || updateCategory} id="header">
      <MainHeader>
        <Month>{selectValue.getMonth() + 1}</Month>
        <ContentsWrapper>
          <BabyInfoWrapper>{baby ? <BabyAge>{`${baby} ${age}일`}</BabyAge> : <LoginBtn to={"/login"}>로그인이 필요합니다</LoginBtn>}</BabyInfoWrapper>
        </ContentsWrapper>
        <IconsWrapper>
          <TodayBtn isToday={isSameDay(selectValue, new Date())} onClick={handleToday}>
            Today
          </TodayBtn>
          <SubHeader>
            <DisplayLatestWork>{lastWork === "milk" ? "🍼 분유" : lastWork === "sleep" && !lastWorkEndTime ? "💤 잠자는 중" : null}</DisplayLatestWork>
            {lastWork === "milk" ? (
              <Moment fromNow>{lastWorkTime}</Moment>
            ) : lastWork === "sleep" && !lastWorkEndTime ? (
              <Moment interval={1000} date={lastWorkTime} durationFromNow></Moment>
            ) : undefined}
          </SubHeader>
        </IconsWrapper>
      </MainHeader>
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
  left: 0;
  right: 0;
  ${({ open }) =>
    open
      ? css`
          background: none;
        `
      : css`
          background: #fff;
        `}
  z-index: 2;
  transition: all 0.3s;

  @media (max-width: 768px) {
    padding: 10px 10px 0;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const LoginBtn = styled(Link)`
  cursor: pointer;
`;

const MainHeader = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
`;
const SubHeader = styled.div`
  display: flex;
  margin-left: auto;
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

const BabyAge = styled.div``;

const DisplayLatestWork = styled.div``;

const IconsWrapper = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  gap: 1rem;
`;

const TodayBtn = styled.li`
  padding: 5px 10px;
  box-shadow: 0 0 2px gray;
  border-radius: 5px;
  transition: all 0.3s;
  cursor: pointer;
  list-style: none;

  @media (max-width: 768px) {
    padding: 4px 8px;
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

export default Header;
