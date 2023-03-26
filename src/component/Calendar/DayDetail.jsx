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
import UpdateDiaper from "../update/UpdateDiaper";

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

  const { openCategory, updateCategory } = useSelector((state) => state.RecordModalSlice);

  const { now, setNow } = useContext(DateContext);

  const [id, setId] = useState(0);

  const handleUpdate = (id, category, time, endTime, volume) => {
    setId(id);
    setNow(time);
    dispatch(update(category));
    dispatch(updateVolume(volume || 140));
    dispatch(selectEndDate(endTime || dayjs(new Date(time))));
  };

  const [rightClickModal, setRightClickModal] = useState(false);

  const handleRightClick = (e) => {
    e.preventDefault();
    setRightClickModal(!rightClickModal);
  };

  return (
    <Base>
      <Title open={openCategory || updateCategory}> {dayjs(new Date(selectValue)).format(`YYYY년 MM월 DD일 (${day[selectValue.getDay()]})`)}</Title>
      <RecordCategory />
      <Content dataLength={dataLength}>
        <UpdateSleep id={id} />
        <UpdateMilk id={id} />
        <UpdateDiaper id={id} />
        {/* <NewEvent>새 이벤트 추가</NewEvent> */}
        <Data dataLength={dataLength}>
          <Record>
            <RecordDateEndDate>16:45</RecordDateEndDate>
            <RecordCategoryItem>분유</RecordCategoryItem>
            <RecordDetail>테스트</RecordDetail>
          </Record>
          {selectData?.map((item, i, arr) => {
            return (
              <>
                <Record
                  key={item.date}
                  onClick={() => (item.category === "milk" || "sleep" || "diaper" ? handleUpdate(item.id, item.category, item.date, item.endDate, item.volume) : undefined)}
                  onContextMenu={handleRightClick}
                >
                  {item.endDate ? (
                    <RecordDateEndDate>
                      <div>{dayjs(new Date(item.date)).format("HH:mm")}</div>
                      <div>{dayjs(new Date(item.endDate)).format("HH:mm")}</div>
                    </RecordDateEndDate>
                  ) : (
                    <RecordDate>{dayjs(new Date(item.date)).format("HH:mm")}</RecordDate>
                  )}
                  <RecordCategoryItem>
                    {item.category === "milk"
                      ? "분유"
                      : item.category === "sleep"
                      ? "잠"
                      : item.category === "diaper"
                      ? item.big === "2"
                        ? "대변/소변"
                        : item.big === "1"
                        ? "대변"
                        : "소변"
                      : item.category === "bath"
                      ? "목욕"
                      : item.category}
                  </RecordCategoryItem>
                  <RecordDetail rightClickModal={rightClickModal}>
                    {item.category === "milk" ? (
                      `${item.volume}ml`
                    ) : item.category === "sleep" ? (
                      i === arr.length - 1 ? (
                        item.endDate ? (
                          `${dayjs(new Date(item.endDate)).diff(dayjs(new Date(item.date)), "minute")}` >= 60 ? (
                            `${Math.floor(dayjs(new Date(item.endDate)).diff(dayjs(new Date(item.date)), "minute") / 60)}시간 ${
                              Math.floor(dayjs(new Date(item.endDate)).diff(dayjs(new Date(item.date)), "minute")) -
                              Math.floor(dayjs(new Date(item.endDate)).diff(dayjs(new Date(item.date)), "minute") / 60) * 60
                            }분 잤어요!`
                          ) : `${dayjs(new Date(item.endDate)).diff(dayjs(new Date(item.date)), "minute")}` > 0 ? (
                            `${dayjs(new Date(item.endDate)).diff(dayjs(new Date(item.date)), "minute")}분 잤어요!`
                          ) : undefined
                        ) : (
                          <Moment interval={1000} date={item.date} durationFromNow></Moment>
                        )
                      ) : `${dayjs(new Date(item.endDate)).diff(dayjs(new Date(item.date)), "minute")}` >= 60 ? (
                        `${Math.floor(dayjs(new Date(item.endDate)).diff(dayjs(new Date(item.date)), "minute") / 60)}시간 ${
                          Math.floor(dayjs(new Date(item.endDate)).diff(dayjs(new Date(item.date)), "minute")) -
                          Math.floor(dayjs(new Date(item.endDate)).diff(dayjs(new Date(item.date)), "minute") / 60) * 60
                        }분 잤어요!`
                      ) : `${dayjs(new Date(item.endDate)).diff(dayjs(new Date(item.date)), "minute")}` > 0 ? (
                        `${dayjs(new Date(item.endDate)).diff(dayjs(new Date(item.date)), "minute")}분 잤어요!`
                      ) : undefined
                    ) : undefined}
                  </RecordDetail>
                  <RecordRightClickModal rightClickModal={rightClickModal}>
                    <RecordRightClickModalItem>수정</RecordRightClickModalItem>
                    <RecordRightClickModalItem>삭제</RecordRightClickModalItem>
                  </RecordRightClickModal>
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

  padding-bottom: env(safe-area-inset-bottom, 0);
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 24px;
  position: sticky;
  top: 0;
  z-index: 3;
  background-color: ${({ open }) => (open ? "unset" : "#fff")};
  padding: 1rem 0;

  @media (max-width: 768px) {
    padding: 10px 0;
    font-size: 18px;
  }
`;

const NewEvent = styled.div`
  padding: 1rem 0;
`;

const Content = styled.div`
  /* margin-top: 15px; */
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
  border-bottom: 1px solid #f2f2f2;
  padding: 10px;
  border-radius: 5px;
  align-items: center;

  > div {
    padding: 5px;
    border-radius: 5px;
  }

  &:hover {
    border: 1px solid #f2f2f2;
  }
`;

const RecordRightClickModal = styled.div`
  display: flex;
  gap: 1rem;
  position: absolute;
  transition: all 0.3s;

  ${({ rightClickModal }) =>
    rightClickModal
      ? css`
          transform: translateX(1050%);
        `
      : css`
          transform: translateX(1200%);
        `}

  @media (max-width: 768px) {
    ${({ rightClickModal }) =>
      rightClickModal
        ? css`
            transform: translateX(250%);
          `
        : css`
            transform: translateX(400%);
          `}
  }
`;

const RecordRightClickModalItem = styled.div`
  padding: 5px;
  border-radius: 5px;
  color: #fff;

  &:first-of-type {
    background-color: #7474ee;
  }

  &:last-of-type {
    background-color: #ee7474;
  }
`;

const RecordDate = styled.div``;

const RecordDateEndDate = styled.div``;

const RecordCategoryItem = styled.div``;

const RecordDetail = styled.div`
  box-shadow: 0 0 2px gray;
  margin-left: auto;
  transition: all 0.3s;

  ${({ rightClickModal }) =>
    rightClickModal
      ? css`
          opacity: 0;
        `
      : css`
          opacity: 1;
        `}
`;

export default DayDetail;
