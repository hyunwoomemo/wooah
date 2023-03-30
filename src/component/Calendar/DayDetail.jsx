import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DateSlice, { select } from "../../slices/DateSlice";
import { deleteItem, getItem, getList, lastItem } from "../../slices/RecordSlice";
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
  const { openCategory, updateCategory } = useSelector((state) => state.RecordModalSlice);
  const { selectValue } = useSelector((state) => state.DateSlice);

  useEffect(() => {
    dispatch(getItem(dayjs(new Date(selectValue)).format("YYYY-MM-DD")));
  }, [selectValue]);

  const { selectData } = useSelector((state) => state.RecordSlice);

  console.log(selectData);

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
    dispatch(selectEndDate(endTime || dayjs(new Date(time))));
  };

  const [rightClickModal, setRightClickModal] = useState(false);

  const handleRightClick = (e) => {
    e.preventDefault();
    setRightClickModal(!rightClickModal);
  };

  let recordLi = document.querySelectorAll(".record");

  recordLi.forEach((item) => {
    item.addEventListener("contextmenu", () => {
      recordLi.forEach((e) => {
        e.classList.remove("active");
      });
      item.classList.add("active");
    });

    item.addEventListener("click", (e) => {
      recordLi.forEach((e) => {
        e.classList.remove("active");
      });
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
          {selectData?.map((item, i, arr) => {
            return (
              <>
                <Record key={item.date} onContextMenu={handleRightClick} className="record">
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
                  <RecordDetail rightClickModal={rightClickModal} className="detail" active={item.category === "sleep" && i === arr.length - 1 && !item.endDate}>
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
                  <RecordRightClickModal rightClickModal={rightClickModal} className="clickModal">
                    <RecordRightClickModalItem
                      onClick={() => (item.category === "milk" || "sleep" || "diaper" ? handleUpdate(item.id, item.category, item.date, item.endDate, item.volume) : undefined)}
                    >
                      수정
                    </RecordRightClickModalItem>
                    <RecordRightClickModalItem onClick={() => handleDelete(item.id, item.date)}>삭제</RecordRightClickModalItem>
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
  /* overflow: hidden; */
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
    /* transform: translateX(1200%);
    

    @media (max-width: 768px) {
      transform: translateX(400%);
    } */
  }

  &.active {
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

const RecordRightClickModal = styled.div`
  display: flex;
  gap: 1rem;
  position: absolute;
  transition: all 0.3s;
`;

const RecordRightClickModalItem = styled.div`
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

export default DayDetail;
