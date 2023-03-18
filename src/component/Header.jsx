import React, { useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { AiOutlineReload, AiOutlineSearch } from "react-icons/ai";
import { css } from "@emotion/react";
import { LatestWorkContext } from "../context/Context";

import db from "../data/record.json";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const Header = () => {
  const birthDay = `${localStorage.getItem("baby_birthday")}T00:00:00`;
  const getDateDiff = (birthDay) => {
    const diffDate = new Date() - new Date(birthDay);
    return Math.floor(diffDate / (1000 * 60 * 60 * 24));
  };

  const lastWork = db[db.length - 1].category;
  const lastWorkTime = new Date(db[db.length - 1].date.concat(` ${db[db.length - 1].time}`));

  const [age, setAge] = useState(getDateDiff(birthDay) + 1);

  const [checkStart, setCheckStart] = useState("");

  const timer = () => {
    setCheckStart(`${parseInt((new Date() - new Date(lastWorkTime)) / 1000 / 60)} 분`);
  };

  useEffect(() => {
    setInterval(timer, 1000);

    return () => {
      clearInterval(timer);
    };
  });

  const { selectValue } = useSelector((state) => state.DateSlice);

  console.log(selectValue);
  return (
    <Base>
      {/* {!isLogin ? (
        <LoginNoti to="/login"> 로그인을 해야해요! 😅 </LoginNoti>
      ) : ( */}

      <Month>{selectValue.getMonth() + 1}</Month>
      <ContentsWrapper>
        <BabyInfoWrapper>
          <BabyAge>{`${age}일`}</BabyAge>
        </BabyInfoWrapper>
        <DisplayLatestWork>{lastWork === "milk" ? "🍼 분유 먹은 지" : lastWork === "sleep" ? "💤 잠자는 중" : undefined}</DisplayLatestWork>
        <DisplayLatestTime>{checkStart}</DisplayLatestTime>
      </ContentsWrapper>
      <IconsWrapper>
        <IconsItem>
          <AiOutlineSearch />
        </IconsItem>
      </IconsWrapper>
    </Base>
  );
};

const Base = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  position: sticky;
  top: 0;
  color: var(--black-text-color);
  backdrop-filter: blur(100px);
  z-index: 998;
`;

const Month = styled.div`
  font-size: 48px;
  transition: all 0.3s;
`;

const ContentsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;

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

const IconsWrapper = styled.ul``;

const IconsItem = styled.li`
  font-size: 24px;
`;

export default Header;
