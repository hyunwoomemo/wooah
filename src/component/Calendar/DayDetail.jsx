import { css } from "@emotion/react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DateSlice, { select } from "../../slices/DateSlice";
import { getItem, getList } from "../../slices/RecordSlice";

const day = ["일", "월", "화", "수", "목", "금", "토"];

const DayDetail = () => {
  const dispatch = useDispatch();
  const { selectValue } = useSelector((state) => state.DateSlice);

  const { data, loading, error } = useSelector((state) => state.RecordSlice);

  useEffect(() => {
    dispatch(getList(dayjs(new Date(selectValue)).format("YYYY-MM-DD")));
  }, [selectValue, dispatch]);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Base isOpen={isOpen}>
      <Toggle onClick={handleOpen}></Toggle>
      <Title> {dayjs(new Date(selectValue)).format(`YYYY년 MM월 DD일 (${day[selectValue.getDay()]})`)}</Title>
      <Content>
        {error
          ? "조회된 데이터가 없습니다"
          : data?.map((item) => {
              return (
                <div key={item.date}>
                  <div>{item.category}</div>
                  <div>{item.volume}</div>
                  <div>{dayjs(new Date(item.date)).format("YYYY-MM-DD hh:mm:ss")}</div>
                </div>
              );
            })}
      </Content>
    </Base>
  );
};

const Base = styled.div`
  margin: 1rem 0 0;
  padding: 1rem;
  border: 1px solid gray;
  border-radius: 15px 15px 0 0;
  box-shadow: 0 0 5px;
  background-color: #fafafa;
  transition: all 0.3s;
  z-index: 999;

  ${({ isOpen }) =>
    isOpen
      ? css`
          transform: translateY(-60vh);
        `
      : css`
          transform: translateY(0);
        `}

  @media (max-width: 768px) {
    margin: 0.5rem 0;
    padding: 0.5rem;
  }
`;

const Toggle = styled.div`
  display: block;
  width: 50px;
  height: 5px;
  background-color: #7d7d7d;
  border-radius: 20px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const Content = styled.div``;

export default DayDetail;
