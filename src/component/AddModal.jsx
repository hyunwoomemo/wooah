import styled from "@emotion/styled";
import React, { useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { DateContext, ModalContext } from "../context/Context";

import db from "../data/record.json";
import { css } from "@emotion/react";

const Portal = (props) => {
  return createPortal(props.children, document.getElementById("portal"));
};

const AddModal = () => {
  const { isOpen, setIsOpen } = useContext(ModalContext);
  const { date, setDate } = useContext(DateContext);

  const handleClose = () => {
    setIsOpen(false);
  };

  const [milk, setMilk] = useState(0);

  const [category, setCategory] = useState("");
  const [active, setActive] = useState(0);

  const handleAll = () => {
    setActive(1);
  };

  const handleMilk = () => {
    setActive(2);
  };

  const handleSleep = () => {
    setActive(3);
  };

  const handleBath = () => {
    setActive(4);
  };

  const handleDiaper = () => {
    setActive(5);
  };

  const targetDate = `${new Date(date).getFullYear()}-${String(new Date(date).getMonth() + 1).padStart(2, 0)}-${String(new Date(date).getDate()).padStart(2, 0)}`;

  const isSameDay = (a, b) => {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  };

  const filterDb = db.filter((v) => isSameDay(new Date(v.date), new Date(date)));

  const day = ["일", "월", "화", "수", "목", "금", "토", "일"];

  useEffect(() => {
    const myElement = document.querySelector("#ContentsWrapper");
    const scroll = document.querySelector("#ContentsWrapper")?.scrollHeight - document.querySelector("#ContentsWrapper")?.offsetHeight;
    if (myElement) {
      myElement.scrollTo({ top: scroll, behavior: "smooth" });
    }
  }, [isOpen]);

  return (
    <>
      <Portal>
        <Contents isOpen={isOpen}>
          <Day>
            <div>{`${targetDate} (${day[new Date(targetDate).getDay()]})`}</div>
            <div onClick={() => setIsOpen(false)}>X</div>
          </Day>
          <Memo>등록된 일정이 없습니다.</Memo>
          <CategoryWrapper active={active}>
            <li onClick={handleAll}>전체</li>
            <li onClick={handleMilk}>🍼 분유</li>
            <li onClick={handleSleep}>💤 잠</li>
            <li onClick={handleBath}>🛁 목욕</li>
            <li onClick={handleDiaper}>🚽 기저귀</li>
          </CategoryWrapper>
          <ContentsWrapper id="ContentsWrapper">
            {filterDb.map((v) => {
              return (
                <Record recorder={v.recorder}>
                  <ContetnsRecord>
                    <div>{v.time.slice(0, 5)}</div>
                    <div>{v.category === "milk" ? "🍼 분유" : v.category === "sleep" ? "💤 잠" : v.category}</div>
                    {v.volume ? <div>{`${v.volume}ml`}</div> : undefined}
                  </ContetnsRecord>
                </Record>
              );
            })}
          </ContentsWrapper>
          <Dashboard>
            <DbItem>분유 :</DbItem>
            <DbItem>잠 : </DbItem>
          </Dashboard>
        </Contents>
      </Portal>
    </>
  );
};

const Contents = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: scroll;
  transition: all 0.3s;

  ${({ isOpen }) =>
    isOpen
      ? css`
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        `
      : css`
          transform: translate(-50%, -50%) scale(0);
          opacity: 0;
        `}

  > input:first-of-type {
    margin-top: 20px;
    border: none;
    border: 1px solid gray;
    padding: 1rem;
  }
`;

const Day = styled.div`
  font-size: 20px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;

  > div:last-of-type {
    padding: 5px;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    cursor: pointer;

    background-color: #e3e3e3;
    border-radius: 50%;
  }
`;

const Memo = styled.div`
  padding: 1rem;
`;

const CategoryWrapper = styled.ul`
  margin-top: 10px;
  padding: 1rem;
  display: flex;
  gap: 5px;
  align-items: center;
  flex-wrap: wrap;

  > li {
    font-size: 16px;
    padding: 1rem;
    border-radius: 5px;
    background-color: #f1f1f18f;
    cursor: pointer;

    @media screen and (max-width: 768px) {
      padding: 7px;
      font-size: 14px;
    }
  }

  > li:nth-of-type(${({ active }) => (active > 0 ? active : "1")}) {
    background-color: #6a92e1;
    color: #fff;
  }
`;

const ContentsWrapper = styled.div`
  overflow: auto;
`;

const Record = styled.div`
  padding: 1rem;
  gap: 10px;

  > div:first-of-type {
    margin-bottom: 10px;
  }
`;

const ContetnsRecord = styled.div`
  display: flex;
  position: relative;
  gap: 20px;

  > div {
    display: flex;
    align-items: center;
    &:first-of-type {
      background-color: #f1f1f1;
      padding: 10px;
      border-radius: 3px;
    }
    &:nth-of-type(3) {
      background-color: #f6e5e5;
      padding: 0 3px;
      border-radius: 15px;
      font-size: 14px;
    }
  }
`;

const Dashboard = styled.ul`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: #c39595;
  color: #fff;
`;

const DbItem = styled.li`
  flex: 1 1 auto;
`;

export default AddModal;
