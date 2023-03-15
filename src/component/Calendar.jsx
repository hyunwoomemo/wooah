import styled from "@emotion/styled";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { ActionContext, DateContext, ModalContext } from "../context/Context";
import db from "../data/record.json";

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]; // 요일

/* const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; // 달 */
const MONTHS = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]; // 달

export const isSameDay = (a, b) => {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
};

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date()); // 선택한 날짜
  const { isOpen, setIsOpen } = useContext(ModalContext);
  const { date, setDate } = useContext(DateContext);
  const { showAction, setShowAction } = useContext(ActionContext);

  const { year, month, firstDay, lastDay } = useMemo(() => {
    // 선택한 날을 기준으로 첫째 날, 마지막 날, 년, 월
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();

    return {
      year,
      month,
      firstDay: new Date(year, month, 1),
      lastDay: new Date(year, month + 1, 0),
    };
  }, [selectedDate]);

  const handleModal = (date) => {
    setSelectedDate(date);
    setDate(date);
    setIsOpen(true);
  };

  const selectDate = (date) => {
    // 날짜를 선택한다.
    setSelectedDate(date);
    setDate(date);
  };

  const pad = () => [...Array(firstDay.getDay()).keys()].map((p) => <TableData key={`pad_${p}`} />); // 해당 월의 첫째 날 전 pad

  const range = () =>
    [...Array(lastDay.getDate()).keys()].map((d) => {
      // 1일 부터 마지막 날까지 날짜 표기
      const thisDay = new Date(year, month, d + 1);
      const today = new Date();
      const contents = db.filter((v) => isSameDay(new Date(v.date), thisDay) && v.email === localStorage.getItem("email"));
      const milkSum = contents.reduce((acc, cur) => acc + Number(cur.volume), 0);

      return (
        <TableData key={d} onDoubleClick={() => handleModal(thisDay)}>
          <ContentsWrapper>
            <DisplayDate isSelected={isSameDay(selectedDate, thisDay)} isToday={isSameDay(today, thisDay)}>
              {new Date(year, month, d + 1).getDate()}
            </DisplayDate>
            <MilkContents>{milkSum > 0 ? `🍼 ${milkSum}` : undefined}</MilkContents>
          </ContentsWrapper>
        </TableData>
      );
    });

  const render = () => {
    // table data 를 일주일 단위로 줄바꿈한다.
    const items = [...pad(), ...range()];

    const weeks = Math.ceil(items.length / 7);

    return [...Array(weeks).keys()].map((week) => <tr key={`week_${week}`}>{items.slice(week * 7, week * 7 + 7)}</tr>);
  };

  const [touchPosition, setTouchPosition] = useState({});

  const touchEnd = (e) => {
    const distanceX = Math.abs(touchPosition.x - e.changedTouches[0].pageX);
    const distanceY = Math.abs(touchPosition.y - e.changedTouches[0].pageY);

    if (distanceY + distanceX > 30 && distanceX > distanceY) {
      if (touchPosition.x - e.changedTouches[0].pageX < 0) {
        selectDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)));
      } else if (touchPosition.x - e.changedTouches[0].pageX > 0) {
        selectDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)));
      }
    }
  };

  return (
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
      <Header>
        <ButtonContainer>
          <ArrowButton pos="left" onClick={() => selectDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)))}>
            <BiChevronLeft />
          </ArrowButton>
          <Title>{`${MONTHS[month]} ${year}`}</Title>
          <ArrowButton pos="right" onClick={() => selectDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)))}>
            <BiChevronRight />
          </ArrowButton>
        </ButtonContainer>
      </Header>
      <Table>
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
  );
};

const Base = styled.div`
  width: 100%;
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  margin: auto 0;

  pointer-events: ${({ showAction }) => (showAction ? "none" : undefined)};
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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

const Title = styled.h1`
  margin: 0;
  padding: 8px 24px;
  font-size: 24px;
  font-weight: normal;
  text-align: center;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  height: 100%;
  border-spacing: 0;
  table-layout: fixed;
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
  text-align: center;
  color: #c9c8cc;
  padding: 8px;
  position: relative;
  border: 1px solid #cfcfcf;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 4px;
  }
  cursor: pointer;

  &:hover {
    background-color: #80808011;
  }
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 5px;
`;

const MilkContents = styled.div`
  display: flex;
  justify-content: flex-start;
  white-space: nowrap;
  font-size: 14px;
  width: 100%;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const DisplayDate = styled.div`
  color: ${({ isToday }) => isToday && "#F8F7FA"};
  background-color: ${({ isToday }) => (isToday ? "#313133" : "")};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 100%;
  justify-self: flex-end;
  flex-wrap: wrap;
  width: 24px;
  height: 24px;

  @media (max-width: 768px) {
    width: 16px;
    height: 16px;
  }
`;

export default Calendar;
