import styled from "@emotion/styled";
import { css, display } from "@mui/system";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { ActionContext, DateContext, ModalContext } from "../context/Context";
import db from "../data/record.json";
import { minusMonth, plusMonth, select } from "../slices/DateSlice";
import Slide from "react-reveal/Slide";
import { transform } from "lodash";
import dayjs from "dayjs";
import { getCurrentData, getList } from "../slices/RecordSlice";
import { selectDateMilk } from "../slices/MilkSlice";

/* const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]; */ // 요일
const DAYS = ["일", "월", "화", "수", "목", "금", "토"]; // 요일

/* const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; // 달 */
const MONTHS = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]; // 달

export const isSameDay = (a, b) => {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
};

const Calendar = () => {
  const { selectValue } = useSelector((state) => state.DateSlice);
  const { showAction } = useSelector((state) => state.ActionModalSlice);

  const { year, month, firstDay, lastDay } = useMemo(() => {
    // 선택한 날을 기준으로 첫째 날, 마지막 날, 년, 월
    const year = selectValue.getFullYear();
    const month = selectValue.getMonth();

    return {
      year,
      month,
      firstDay: new Date(year, month, 1),
      lastDay: new Date(year, month + 1, 0),
    };
  }, [selectValue]);

  const selectDate = (date) => {
    dispatch(select(date));
    /* dispatch(selectDateMilk()); */
    /* setTimeout(() => {
      window.scrollTo({ top: 1000, behavior: "smooth" });
    }, 100); */
  };

  const { data, selectData, loading, error } = useSelector((state) => state.RecordSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getList());
  }, [selectValue, dispatch]);

  const pad = () =>
    [...Array(firstDay.getDay()).keys()]?.map((p, i, arr) => (
      <TableData key={`pad_${p}`}>
        <PadData>{dayjs(new Date(year, month, p - arr.length + 1)).format("DD")}</PadData>
      </TableData>
    )); // 해당 월의 첫째 날 전 pad

  const range = () =>
    [...Array(lastDay.getDate()).keys()]?.map((d) => {
      // 1일 부터 마지막 날까지 날짜 표기
      const thisDay = new Date(year, month, d + 1);
      const today = new Date();
      const contents = data?.filter((v) => isSameDay(new Date(v.date), thisDay) && v.email === localStorage.getItem("email"));
      const milkSum = contents?.reduce((acc, cur) => acc + Number(cur.volume), 0);

      return (
        <TableData key={d} onClick={() => selectDate(thisDay)}>
          <ContentsWrapper isSelected={isSameDay(selectValue, thisDay)} isToday={isSameDay(today, thisDay)}>
            <DisplayDate>
              <DateItem>{new Date(year, month, d + 1).getDate()}</DateItem>
              <Contents>
                {milkSum > 0 ? <MilkContents>{`🍼${milkSum}`}</MilkContents> : undefined}
                {/* <CalendarItem>일정</CalendarItem>
                <CalendarItem>일정</CalendarItem> */}
              </Contents>
            </DisplayDate>
          </ContentsWrapper>
        </TableData>
      );
    });

  const arrLength = [...pad(), ...range()].length;

  const fillNum = Math.ceil(arrLength / 7) * 7 - arrLength;

  const fill = () => {
    [...Array(fillNum)]?.map((f, i) => {
      return (
        <TableData key={`fill${f}`}>
          <FillData>{i + 1}</FillData>
        </TableData>
      );
    });
  };

  const render = () => {
    // table data 를 일주일 단위로 줄바꿈한다.
    const items = [...pad(), ...range()];

    const weeks = Math.ceil(items.length / 7);

    return [...Array(weeks).keys()]?.map((week, i, arr) => <tr key={`week_${week}`}>{items.slice(week * 7, week * 7 + 7)}</tr>);
  };

  const [touchPosition, setTouchPosition] = useState({});

  const touchEnd = (e) => {
    const distanceX = Math.abs(touchPosition.x - e.changedTouches[0].pageX);
    const distanceY = Math.abs(touchPosition.y - e.changedTouches[0].pageY);

    if (distanceY + distanceX > 30 && distanceX > distanceY) {
      if (touchPosition.x - e.changedTouches[0].pageX < 0) {
        previousMonth();
      } else if (touchPosition.x - e.changedTouches[0].pageX > 0) {
        nextMonth();
      }
    }
  };

  const [moveLeft, setMoveLeft] = useState(false);
  const [moveRight, setMoveRight] = useState(false);

  const previousMonth = () => {
    dispatch(select(new Date(selectValue.setMonth(selectValue.getMonth() - 1))));
    selectDate(new Date(selectValue.setDate(1)));
    setMoveLeft(true);
    setTimeout(() => {
      setMoveLeft(false);
    }, 300);
  };
  const nextMonth = () => {
    dispatch(select(new Date(selectValue.setMonth(selectValue.getMonth() + 1))));
    selectDate(new Date(selectValue.setDate(1)));
    setMoveRight(true);
    setTimeout(() => {
      setMoveRight(false);
    }, 300);
  };

  return (
    <Container>
      <Base
        onTouchStart={(e) =>
          setTouchPosition({
            x: e.changedTouches[0].pageX,
            y: e.changedTouches[0].pageY,
          })
        }
        onTouchEnd={touchEnd}
        showAction={showAction}
      >
        <ButtonContainer>
          <ArrowButton pos="left" onClick={previousMonth}>
            <BiChevronLeft />
          </ArrowButton>
          <ArrowButton pos="right" onClick={nextMonth}>
            <BiChevronRight />
          </ArrowButton>
        </ButtonContainer>
        <Table moveLeft={moveLeft} moveRight={moveRight}>
          <TableHeader>
            <tr>
              {DAYS.map((day, index) => (
                <th key={day} align="center">
                  {day}
                </th>
              ))}
            </tr>
          </TableHeader>
          <TableBody>{render()}</TableBody>
        </Table>
      </Base>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const Base = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  transition: all 0.3s;
  padding: 1rem;
  @media (max-width: 768px) {
    padding: 10px;
  }

  pointer-events: ${({ showAction }) => (showAction ? "none" : undefined)};
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const ArrowButton = styled.button`
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  background-color: transparent;
  font-size: 18px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  height: 100%;
  table-layout: fixed;
  word-break: break-all;
  height: auto;
  transition: all 0.3s;
  box-shadow: 0.3rem 0.3rem 0.6rem var(--greyLight-2), -0.2rem -0.2rem 0.5rem var(--white);
  border-radius: 20px;

  ${({ moveLeft, moveRight }) =>
    moveLeft
      ? css`
          transform: translateX(-5%);
          opacity: 0;
        `
      : moveRight
      ? css`
          transform: translateX(5%);
          opacity: 0;
        `
      : css`
          transform: translateX(0);
          opacity: 1;
        `}
`;

const TableHeader = styled.thead`
  padding-block: 12px;
  > tr {
    > th {
      padding-block: 12px;
      font-weight: normal;

      @media (max-width: 768px) {
        font-size: 12px;
      }
    }
  }
`;

const TableBody = styled.tbody`
  > tr > td:nth-of-type(1) {
    color: #e28d8d;
  }

  > tr > td:nth-of-type(7) {
    color: #8d9de2;
  }
`;

const TableData = styled.td`
  color: #434343;
  border-radius: 5px;
  transition: all 0.3s;

  @media (max-width: 768px) {
    font-size: 12px;
  }
  cursor: pointer;

  &:hover {
    background-color: #80808011;
  }

  > div {
    > div {
      width: 100%;
    }
  }
`;

const PadData = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  color: #c1c1c1;
`;

const FillData = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  color: #c1c1c1;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  background-color: ${({ isToday, isSelected }) => (isSelected ? "#313133" : isToday ? "#ebebeb" : undefined)};

  color: ${({ isToday, isSelected }) => (isSelected ? "#fff" : isToday ? "#000" : "#000")};

  border-radius: 5px;
  padding: 5px 0;
  box-sizing: border-box;
  transition: all 0.3s;
  position: relative;
`;

const MilkContents = styled.div`
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 3px;

  &::before {
    content: ".";
    text-indent: -99em;
    display: block;
    height: 100%;
    width: 4px;
    margin-right: 4px;
    background-color: #bed790;
    border-radius: 10px;

    @media (max-width: 768px) {
      width: 2px;
    }
  }
`;

const DisplayDate = styled.div`
  @media (max-width: 768px) {
  }
`;

const DateItem = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  > div {
    width: 100%;
  }
`;

const Contents = styled.div`
  display: flex;
  gap: 3px;
  flex-direction: column;
  font-size: 14px;
  margin-top: 10px;
  padding: 0 5px;
  align-items: center;
  height: 50px;
  box-sizing: border-box;
  overflow-y: hidden;

  @media (max-width: 768px) {
    font-size: 6px;
    height: 40px;
  }

  > div {
    width: 100%;
    position: relative;
    display: flex;
    padding: 2px 0;

    @media (max-width: 768px) {
      padding: 1px 0;
    }
  }
`;

const CalendarItem = styled.div`
  &:before {
    content: ".";
    text-indent: -99em;
    height: 100%;
    width: 4px;
    background-color: #d79090;
    border-radius: 10px;
    margin-right: 4px;

    @media (max-width: 768px) {
      width: 2px;
    }
  }
`;

export default Calendar;
