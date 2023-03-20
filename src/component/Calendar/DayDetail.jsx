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

  const isSameDay = (a, b) => {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  };

  const contents = data?.filter((v) => isSameDay(new Date(v.date), selectValue) && v.email === localStorage.getItem("email"))?.sort((a, b) => new Date(a.date) - new Date(b.date));

  useEffect(() => {
    dispatch(getList());
  }, [selectValue, dispatch]);

  const [dataLength, setDataLength] = useState(0);

  useEffect(() => {
    setDataLength(contents?.length);

    return () => {
      setDataLength(0);
    };
  }, [contents]);

  return (
    <Base>
      <Title> {dayjs(new Date(selectValue)).format(`YYYY년 MM월 DD일 (${day[selectValue.getDay()]})`)}</Title>
      <Content dataLength={dataLength}>
        {error
          ? "조회된 데이터가 없습니다"
          : contents?.map((item) => {
              return (
                <>
                  <Record key={item.date}>
                    <RecordDate>{dayjs(new Date(item.date)).format("HH:mm")}</RecordDate>
                    <RecordCategory>{item.category === "milk" ? "분유" : item.category}</RecordCategory>
                    <RecordDetail>{item.category === "milk" ? `${item.volume}ml` : undefined}</RecordDetail>
                  </Record>
                </>
              );
            })}
      </Content>
    </Base>
  );
};

const Base = styled.div`
  padding: 1rem;
  @media (max-width: 768px) {
    padding: 10px;
  }
  transition: all 0.3s;
  z-index: 999;
  background-color: #fff;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const Content = styled.div`
  margin-top: 15px;
  transition: all 0.7s;
  transform: scaleY(0);
  transform-origin: top;

  ${({ dataLength }) =>
    dataLength
      ? css`
          transform: scaleY(1);
        `
      : css``}

  @media (max-width: 768px) {
    /* padding: 0.5rem; */
  }
`;

const Record = styled.div`
  display: flex;
  margin-bottom: 7px;
  gap: 1rem;
  background-color: #f2f2f25e;
  padding: 10px;
  border-radius: 5px;

  > div {
    padding: 5px;
    border-radius: 5px;
  }
`;

const RecordDate = styled.div`
  background-color: #fff;
`;

const RecordCategory = styled.div``;

const RecordDetail = styled.div`
  box-shadow: 0 0 2px gray;
  margin-left: auto;
`;

export default DayDetail;
