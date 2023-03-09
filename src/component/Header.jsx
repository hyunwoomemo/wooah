import React, { useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { AiOutlineReload } from "react-icons/ai";
import { css } from "@emotion/react";
import { LatestWorkContext } from "../context/Context";

import db from "../data/record.json";

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

  const handleReload = () => {
    window.location.reload(true);
  };

  const isLogin = localStorage.getItem("isLogin");

  return (
    <Base>
      {!isLogin ? (
        <LoginNoti to="/login"> 로그인을 해야해요! 😅 </LoginNoti>
      ) : (
        <ContentsWrapper>
          <ProfileImgWrapper>
            <ProfileImg src={`${process.env.PUBLIC_URL}/upload/profile.png`}></ProfileImg>
          </ProfileImgWrapper>
          <BabyInfoWrapper>
            <BabyName>{localStorage.getItem("baby")}</BabyName>
            <BabyAge>{`${age}일`}</BabyAge>
          </BabyInfoWrapper>
          <DisplayLatestWork>{lastWork === "milk" ? "🍼 분유 먹은 지" : lastWork === "sleep" ? "💤 잠자는 중" : undefined}</DisplayLatestWork>
          <DisplayLatestTime>{checkStart /*  ? checkStart : `${parseInt((new Date() - new Date(lastWorkTime)) / 1000 / 60)} 분` */}</DisplayLatestTime>
          <ReloadIcon>
            <AiOutlineReload onClick={handleReload} />
          </ReloadIcon>
        </ContentsWrapper>
      )}
    </Base>
  );
};

const Base = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 2rem;
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

const LoginNoti = styled(Link)`
  background-color: #e5e6aa;
  padding: 2rem;
  border-radius: 10px;

  text-decoration: none;
  color: #000000;
  cursor: pointer;
`;

const ProfileImgWrapper = styled.div``;

const ProfileImg = styled.img`
  width: 75px;
  height: 75px;

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const BabyInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-wrap: wrap;
`;

const BabyName = styled.div`
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const BabyAge = styled.div`
  font-size: 14px;
`;

const DisplayLatestWork = styled.div`
  flex: 1 1 auto;
  text-align: end;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const DisplayLatestTime = styled.div``;

const ReloadIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @media (max-width: 768px) {
    display: none;
  }
`;

export default Header;
