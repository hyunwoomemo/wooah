import { css } from "@emotion/react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DateSlice, { select } from "../../slices/DateSlice";
import { getItem, getList, lastItem } from "../../slices/RecordSlice";
import Moment from "react-moment";
import "moment/locale/ko";
import SleepModal from "../Navigation/SleepModal";
import { open, selectEndDate, update, updateVolume } from "../../slices/RecordModalSlice";
import { DateContext } from "../../context/Context";
import UpdateSleep from "../update/UpdateSleep";
import UpdateMilk from "../update/UpdateMilk";
import RecordCategory from "../RecordCategory";

const day = ["일", "월", "화", "수", "목", "금", "토"];

const DayDetail = () => {
  const dispatch = useDispatch();
  const { selectValue } = useSelector((state) => state.DateSlice);

  const { selectData, loading, error, lastData } = useSelector((state) => state.RecordSlice);

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

  const handleUpdate = (id, category, time, endTime, volume) => {
    setId(id);
    setNow(time);
    dispatch(update(category));
    dispatch(updateVolume(volume || 140));
    dispatch(selectEndDate(endTime || dayjs(new Date(time)).add(1, "hour")));
  };

  return (
    <Base>
      <Title> {dayjs(new Date(selectValue)).format(`YYYY년 MM월 DD일 (${day[selectValue.getDay()]})`)}</Title>
      <Content dataLength={dataLength}>
        <UpdateSleep id={id} />
        <UpdateMilk id={id} />
        {/* <NewEvent>새 이벤트 추가</NewEvent> */}
        <RecordCategory />
        <Data dataLength={dataLength}>
          {selectData?.map((item, i, arr) => {
            return (
              <>
                <Record key={item.date} onClick={() => handleUpdate(item.id, item.category, item.date, item.endDate, item.volume)}>
                  {item.endDate ? (
                    <RecordDateEndDate>
                      <div>{dayjs(new Date(item.date)).format("HH:mm")}</div>
                      <div>{dayjs(new Date(item.endDate)).format("HH:mm")}</div>
                    </RecordDateEndDate>
                  ) : (
                    <RecordDate>{dayjs(new Date(item.date)).format("HH:mm")}</RecordDate>
                  )}
                  <RecordCategoryItem>{item.category === "milk" ? "분유" : item.category}</RecordCategoryItem>
                  <RecordDetail>
                    {item.category === "milk" ? (
                      `${item.volume}ml`
                    ) : item.category === "sleep" ? (
                      i === arr.length - 1 ? (
                        item.endDate ? (
                          `${dayjs(new Date(item.endDate)).diff(dayjs(new Date(item.date)), "minute")}`
                        ) : (
                          <Moment interval={1000} date={item.date} durationFromNow></Moment>
                        )
                      ) : (
                        `${dayjs(new Date(item.endDate)).diff(dayjs(new Date(item.date)), "minute")}`
                      )
                    ) : undefined}
                  </RecordDetail>
                </Record>
              </>
            );
          })}
        </Data>
      </Content>
    </Base>
  );
};

const Base = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    padding: 10px;
  }
  transition: all 0.3s;
  height: 100vh;

  padding-bottom: env(safe-area-inset-bottom, 0);
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const NewEvent = styled.div`
  padding: 1rem 0;
`;

const Content = styled.div`
  margin-top: 15px;
`;

const Data = styled.div`
  transition: all 0.7s;
  transform-origin: top;
  ${({ dataLength }) =>
    dataLength
      ? css`
          transform: scaleY(1);
        `
      : css`
          transform: scaleY(0);
        `}
`;

const Record = styled.div`
  display: flex;
  margin-bottom: 7px;
  gap: 1rem;
  background-color: #f2f2f25e;
  padding: 10px;
  border-radius: 5px;
  align-items: center;

  > div {
    padding: 5px;
    border-radius: 5px;
  }
`;

const RecordDate = styled.div``;

const RecordDateEndDate = styled.div``;

const RecordCategoryItem = styled.div``;

const RecordDetail = styled.div`
  box-shadow: 0 0 2px gray;
  margin-left: auto;
`;

export default DayDetail;
