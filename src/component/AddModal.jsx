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

  const handleCancel = () => {
    setIsOpen(false);
  };

  function valuetext(value) {
    return `${value}ml`;
  }

  const targetDate = `${new Date(date).getFullYear()}-${String(new Date(date).getMonth() + 1).padStart(2, 0)}-${String(new Date(date).getDate()).padStart(2, 0)}`;

  const isSameDay = (a, b) => {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  };

  const filterDb = db.filter((v) => isSameDay(new Date(v.date), new Date(date)));

  const contentsRef = useRef();

  const [elementHeight, setElementHeight] = useState(0);

  useEffect(() => {
    setElementHeight(contentsRef?.current?.getBoundingClientRect().bottom);
  }, []);

  const handleScroll = () => {
    console.log(elementHeight);
    console.log(contentsRef);
  };

  const day = ["일", "월", "화", "수", "목", "금", "토", "일"];

  return (
    <>
      {isOpen ? (
        <Portal>
          <Overlay onClick={handleClose}></Overlay>
          <Contents>
            <Day>{`${targetDate} (${day[new Date(targetDate).getDay()]})`}</Day>
            <CategoryWrapper active={active}>
              <li onClick={handleAll}>전체</li>
              <li onClick={handleMilk}>🍼 분유</li>
              <li onClick={handleSleep}>💤 잠</li>
              <li onClick={handleBath}>🛁 목욕</li>
              <li onClick={handleDiaper}>🚽 기저귀</li>
            </CategoryWrapper>
            <ContentsWrapper ref={contentsRef}>
              {filterDb.map((v) => {
                return (
                  <Record recorder={v.recorder}>
                    <ContetnsRecord>
                      <div>{v.time.slice(0, 5)}</div>
                      <div>{v.category === "milk" ? "🍼 분유" : v.category === "sleep" ? "💤 잠" : v.category}</div>
                      {v.volume ? <div>{`${v.volume}ml`}</div> : undefined}
                      {/* <div>{v.recorder === "father" ? "🧒🏻" : "👧🏻"}</div> */}
                    </ContetnsRecord>
                  </Record>
                );
              })}
            </ContentsWrapper>
            <ButtonWrapper>
              <button onClick={handleScroll}>저장</button>
              <button onClick={handleCancel}>취소</button>
            </ButtonWrapper>
          </Contents>
        </Portal>
      ) : undefined}
    </>
  );
};

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.3;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

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
  overflow: auto;

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
`;

const DateWrapper = styled.div`
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
const MilkWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
`;

const SleepWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
`;

const Value = styled.input`
  display: flex;

  border: 1px solid gray;
`;

const ContentsWrapper = styled.div`
  overflow: auto;
`;

const Record = styled.div`
  padding: 1rem;
  gap: 10px;
  /* ${({ recorder }) =>
    recorder === "father"
      ? css`
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-end;
        `
      : css`
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
        `} */

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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;

  button {
    flex: 1 1 auto;
    color: #fff;
    padding: 16px 0;
    cursor: pointer;

    &:first-of-type {
      border: 0;
      background-color: #6ae188;
    }

    &:not(:first-of-type) {
      border: 0;
      background-color: #e17e6a;
    }
  }
`;

export default AddModal;
