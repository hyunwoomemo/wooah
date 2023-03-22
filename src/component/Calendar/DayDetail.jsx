import { css } from "@emotion/react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DateSlice, { select } from "../../slices/DateSlice";
import { getItem, getList } from "../../slices/RecordSlice";
import Moment from "react-moment";
import "moment/locale/ko";
import SleepModal from "../Navigation/SleepModal";
import { open, selectEndDate, update } from "../../slices/RecordModalSlice";
import { DateContext } from "../../context/Context";
import UpdateSleep from "../update/UpdateSleep";

const day = ["일", "월", "화", "수", "목", "금", "토"];

const DayDetail = () => {
  const dispatch = useDispatch();
  const { selectValue } = useSelector((state) => state.DateSlice);

  const { selectData, loading, error } = useSelector((state) => state.RecordSlice);

  useEffect(() => {
    dispatch(getItem(dayjs(new Date(selectValue)).format("YYYY-MM-DD")));
  }, [selectValue]);

  const [dataLength, setDataLength] = useState(0);

  useEffect(() => {
    setDataLength(selectData?.length);

    return () => {
      setDataLength(0);
    };
  }, [selectData]);

  const { now, setNow } = useContext(DateContext);

  const [id, setId] = useState(0);

  const handleUpdate = (id, category, time, endTime) => {
    setId(id);
    setNow(time);
    dispatch(update(category));
    dispatch(selectEndDate(endTime));
  };

  return (
    <Base>
      <Title> {dayjs(new Date(selectValue)).format(`YYYY년 MM월 DD일 (${day[selectValue.getDay()]})`)}</Title>
      <Content dataLength={dataLength}>
        <UpdateSleep id={id} />
        {error
          ? "조회된 데이터가 없습니다"
          : selectData?.map((item, i, arr) => {
              return (
                <>
                  <Record key={item.date} onClick={() => handleUpdate(item.id, item.category, item.date, item.endDate, item.volume)}>
                    <RecordDate>{dayjs(new Date(item.date)).format("HH:mm")}</RecordDate>
                    <RecordCategory>{item.category === "milk" ? "분유" : item.category}</RecordCategory>
                    <RecordDetail>
                      {item.category === "milk" ? (
                        `${item.volume}ml`
                      ) : item.category === "sleep" ? (
                        i === arr.length - 1 ? (
                          item.endDate ? (
                            `${dayjs(new Date(item.date)).format("HH:mm")} ~ ${item.endDate ? dayjs(new Date(item.endDate)).format("HH:mm") : ""}`
                          ) : (
                            <Moment interval={1000} date={item.date} durationFromNow></Moment>
                          )
                        ) : (
                          `${dayjs(new Date(item.date)).format("HH:mm")} ~ ${item.endDate ? dayjs(new Date(item.endDate)).format("HH:mm") : ""}`
                        )
                      ) : undefined}
                    </RecordDetail>
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
