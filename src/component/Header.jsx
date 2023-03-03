import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const Header = () => {
  const birthDay = "2023-01-16T00:00:00";
  const getDateDiff = (birthDay) => {
    const diffDate = new Date() - new Date(birthDay);
    console.log(new Date(birthDay));
    return Math.floor(diffDate / (1000 * 60 * 60 * 24));
  };

  const [isLogin, setIsLogin] = useState(false);
  const [age, setAge] = useState(getDateDiff(birthDay) + 1);

  const [checkStart, setCheckStart] = useState("");

  const timer = () => {
    const hours = String(new Date().getHours()).padStart(2, "0");
    const minutes = String(new Date().getMinutes()).padStart(2, "0");
    const seconds = String(new Date().getSeconds()).padStart(2, "0");
    setCheckStart(`${hours} : ${minutes} : ${seconds}`);

    if (checkStart === "0:0:0") {
      setAge(getDateDiff(birthDay) + 1);
    }
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

  return (
    <Base>
      {/*       {!isLogin ? (
        <LoginNoti to="/login"> 로그인을 해야해요! 😅 </LoginNoti>
      ) : ( */}
      <ContentsWrapper>
        <ProfileImgWrapper>
          <ProfileImg src={`${process.env.PUBLIC_URL}/upload/profile.png`}></ProfileImg>
        </ProfileImgWrapper>
        <BabyInfoWrapper>
          <BabyName>우리 지안</BabyName>
          <BabyAge>{`${age}일`}</BabyAge>
        </BabyInfoWrapper>
        <DisplayTime>
          {checkStart ? checkStart : `${String(new Date().getHours()).padStart(2, "0")} : ${String(new Date().getMinutes()).padStart(2, "0")} : ${String(new Date().getSeconds()).padStart(2, "0")}`}
        </DisplayTime>
        <button onClick={handleReload}>새로고침</button>
      </ContentsWrapper>
    </Base>
  );
};

const Base = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1rem 0;
`;

const ContentsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
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
    font-size: 16px;
  }
`;

const BabyAge = styled.div`
  font-size: 14px;
`;

const DisplayTime = styled.div`
  flex: 1 1 auto;
  text-align: end;
  font-size: 24px;
`;
export default Header;
