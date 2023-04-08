import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DateSlice, { select } from "../../slices/DateSlice";
import { deleteItem, getItem, getList, lastItem } from "../../slices/RecordSlice";
import Moment from "react-moment";
import "moment/locale/ko";
import SleepModal from "../RecordModal/SleepModal";
import { open, selectDate, selectEndDate, update, updateVolume } from "../../slices/RecordModalSlice";
import { DateContext } from "../../context/Context";
import UpdateSleep from "../UpdateRecordModal/UpdateSleep";
import UpdateMilk from "../UpdateRecordModal/UpdateMilk";
import RecordCategory from "../RecordCategory";
import UpdateDiaper from "../UpdateRecordModal/UpdateDiaper";
import { isSameDay } from "../Calendar";
import UpdateCalendar from "../UpdateRecordModal/UpdateCalendar";

const day = ["일", "월", "화", "수", "목", "금", "토"];

const DayDetail = () => {
  const dispatch = useDispatch();
  const { openCategory, updateCategory } = useSelector((state) => state.RecordModalSlice);
  const { selectValue } = useSelector((state) => state.DateSlice);
  const { data } = useSelector((state) => state.RecordSlice);
  const selectData = data?.filter((v) => isSameDay(new Date(v.date), selectValue) && v.email === localStorage.getItem("email") && v.category !== "calendar");
  const calendarData = data?.filter((v) => isSameDay(new Date(v.date), selectValue) && v.email === localStorage.getItem("email") && v.category === "calendar");

  useEffect(() => {
    dispatch(getList());
  }, [selectValue]);

  const [dataLength, setDataLength] = useState(0);

  useEffect(() => {
    setDataLength(selectData?.length + calendarData?.length);

    return () => {
      setDataLength(0);
    };
  }, [selectData, calendarData]);

  const { now, setNow } = useContext(DateContext);

  const [id, setId] = useState(0);

  const [calendarTitle, setCalendarTitle] = useState("");
  const [calendarLocation, setCalendarLocation] = useState("");
  const [calendarMemo, setCalendarMemo] = useState("");

  const handleUpdate = (id, category, time, endTime, volume, ct, cl, cm) => {
    console.log(time);
    setId(id);
    setNow(time);
    dispatch(update(category));
    dispatch(updateVolume(volume || 140));
    dispatch(selectDate(time));
    dispatch(selectEndDate(endTime || dayjs(new Date(time))));
    setCalendarTitle(ct);
    setCalendarLocation(cl);
    setCalendarMemo(cm);
  };

  const recordLi = document.querySelectorAll(".record");

  recordLi.forEach((item) => {
    item.addEventListener("click" || "touchend", () => {
      recordLi.forEach((e) => {
        e.classList.remove("activeUtil");
      });
      item.classList.toggle("activeUtil");
    });
  });

  const handleDelete = (id, date) => {
    dispatch(
      deleteItem({
        id: id,
      })
    );
    dispatch(open(""));
    dispatch(select(new Date(date)));
    dispatch(getList());
  };

  return (
    <Base dataLength={dataLength}>
      <RecordCategory />
      <Title open={openCategory || updateCategory}> {dayjs(new Date(selectValue)).format(`YYYY년 MM월 DD일 (${day[selectValue.getDay()]})`)}</Title>
      <Content dataLength={dataLength}>
        <UpdateSleep id={id} />
        <UpdateMilk id={id} />
        <UpdateDiaper id={id} />
        <UpdateCalendar id={id} time={now} ct={calendarTitle} cl={calendarLocation} cm={calendarMemo} />
        {/* <NewEvent>새 이벤트 추가</NewEvent> */}
        <Data dataLength={dataLength}>
          {calendarData?.map((item, i, arr) => {
            return (
              <>
                <Record key={item.date} className="record">
                  <RecordDate>{dayjs(new Date(item.date)).format("HH:mm")}</RecordDate>
                  <RecordCategoryItem>{item.calendarTitle}</RecordCategoryItem>
                  <RecordCalendarDetail className="detail" active={item.category === "sleep" && i === arr.length - 1 && !item.endDate}>
                    <div length={item.calendarLocation}>{item.calendarLocation}</div>
                    {item.calendarMemo ? <div>🔸</div> : null}
                    <div length={item.calendarMemo}>{item.calendarMemo}</div>
                  </RecordCalendarDetail>
                  <RecordClickModal className="clickModal">
                    <RecordClickModalItem
                      onClick={() =>
                        item.category === "milk" || "sleep" || "diaper" || "calendar"
                          ? handleUpdate(item.id, item.category, item.date, item.endDate, item.volume, item.calendarTitle, item.calendarLocation, item.calendarMemo)
                          : undefined
                      }
                    >
                      수정
                    </RecordClickModalItem>
                    <RecordClickModalItem onClick={() => handleDelete(item.id, item.date)}>삭제</RecordClickModalItem>
                  </RecordClickModal>
                </Record>
              </>
            );
          })}
          {selectData?.map((item, i, arr) => {
            return (
              <>
                <Record key={item.date} className="record">
                  {item.endDate ? (
                    <RecordDateEndDate>
                      <div>{dayjs(new Date(item.date)).format("HH:mm")}</div>
                      <div>{dayjs(new Date(item.endDate)).format("HH:mm")}</div>
                    </RecordDateEndDate>
                  ) : (
                    <RecordDate>{dayjs(new Date(item.date)).format("HH:mm")}</RecordDate>
                  )}
                  <RecordCategoryItem>
                    {item.category === "milk" ? "분유" : item.category === "sleep" ? "잠" : item.category === "diaper" ? "기저귀" : item.category === "bath" ? "목욕" : item.category}
                  </RecordCategoryItem>
                  {item.vitamin && <RecordTag1>비타민</RecordTag1>}
                  {item.lactobacillus && <RecordTag2>유산균</RecordTag2>}
                  <RecordDetail className="detail" active={item.category === "sleep" && i === arr.length - 1 && !item.endDate}>
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
                    ) : item.category === "diaper" ? (
                      item.big === "2" ? (
                        "대변/소변"
                      ) : item.big === "1" ? (
                        "대변"
                      ) : (
                        "소변"
                      )
                    ) : undefined}
                  </RecordDetail>
                  <RecordClickModal className="clickModal">
                    <RecordClickModalItem onClick={() => (item.category === "milk" || "sleep" || "diaper" ? handleUpdate(item.id, item.category, item.date, item.endDate, item.volume) : undefined)}>
                      수정
                    </RecordClickModalItem>
                    <RecordClickModalItem onClick={() => handleDelete(item.id, item.date)}>삭제</RecordClickModalItem>
                  </RecordClickModal>
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

  ${({ dataLength }) =>
    dataLength
      ? css`
          margin-bottom: env(safe-area-inset-bottom);
        `
      : css``}
  @media (max-width: 768px) {
    padding: 10px;
  }
  transition: all 0.3s;
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

const Content = styled.div``;

const Data = styled.div`
  transition: all 0.7s;
  transform-origin: top;
  margin-top: 1rem;
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
  margin-bottom: 1rem;
  gap: 1rem;
  border-bottom: 1px solid #f2f2f2;
  padding: 10px;
  border-radius: 5px;
  align-items: center;
  transition: all 0.3s;

  > div {
    padding: 5px;
    border-radius: 5px;
  }

  .clickModal {
    left: 120%;
    opacity: 0;
    transition: all 0.3s;
    white-space: nowrap;
  }

  &.activeUtil {
    .detail {
      opacity: 0;
    }

    .clickModal {
      left: 90%;
      opacity: 1;
      > div:first-of-type {
        background-color: #7474ee;
      }

      > div:last-of-type {
        background-color: #ee7474;
      }

      @media (max-width: 768px) {
        left: 70%;
      }
    }
  }
`;

const RecordClickModal = styled.div`
  display: flex;
  gap: 1rem;
  position: absolute;
  transition: all 0.3s;
`;

const RecordClickModalItem = styled.div`
  padding: 5px;
  border-radius: 5px;
  color: #fff;
`;

const RecordDate = styled.div``;

const RecordDateEndDate = styled.div``;

const RecordCategoryItem = styled.div``;

const RecordTag1 = styled.div`
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 4px;
  background-color: #6eb66e;
  color: #fff;
  border-radius: 5px;
`;
const RecordTag2 = styled.div`
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 4px;
  background-color: #6ea6b6;
  color: #fff;
  border-radius: 5px;
`;

const moveGradient = keyframes`
 50% {
    background-position: 100% 50%;
  }
`;

const RecordDetail = styled.div`
  box-shadow: 0 0 2px gray;
  margin-left: auto;
  transition: all 0.3s;

  ${({ active }) =>
    active
      ? css`
          box-shadow: none;
          --border-width: 3px;

          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          /* font-family: Lato, sans-serif; */
          text-transform: uppercase;
          color: #000;
          background: #fff;
          border-radius: var(--border-width);

          &::after {
            position: absolute;
            content: "";
            top: calc(-1 * var(--border-width));
            left: calc(-1 * var(--border-width));
            z-index: -1;
            width: calc(100% + var(--border-width) * 2);
            height: calc(100% + var(--border-width) * 2);
            background: linear-gradient(
              60deg,
              hsl(224, 85%, 66%),
              hsl(269, 85%, 66%),
              hsl(314, 85%, 66%),
              hsl(359, 85%, 66%),
              hsl(44, 85%, 66%),
              hsl(89, 85%, 66%),
              hsl(134, 85%, 66%),
              hsl(179, 85%, 66%)
            );
            background-size: 300% 300%;
            background-position: 0 50%;
            border-radius: calc(2 * var(--border-width));
            animation: ${moveGradient} 3s alternate infinite;
          }
        `
      : css``}
`;

const RecordCalendarDetail = styled.div`
  display: flex;
  margin-left: auto;
  font-size: 14px;
  gap: 10px;
  justify-content: center;
`;

export default DayDetail;
