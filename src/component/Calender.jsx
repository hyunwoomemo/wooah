import styled from "@emotion/styled";
import React, { useMemo, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]; // 요일

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; // 달

export const isSameDay = (a, b) => {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
};

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date()); // 선택한 날짜

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

  const selectDate = (date) => {
    // 날짜를 선택한다.
    setSelectedDate(date);
  };

  const pad = () => [...Array(firstDay.getDay()).keys()].map((p) => <TableData key={`pad_${p}`} />); // 해당 월의 첫째 날 전 pad

  const range = () =>
    [...Array(lastDay.getDate()).keys()].map((d) => {
      // 1일 부터 마지막 날까지 날짜 표기
      const thisDay = new Date(year, month, d + 1);
      const today = new Date();

      return (
        <TableData key={d} onClick={() => selectDate(thisDay)}>
          <DisplayDate isSelected={isSameDay(selectedDate, thisDay)} isToday={isSameDay(today, thisDay)}>
            {new Date(year, month, d + 1).getDate()}
          </DisplayDate>
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
  }
`;

const DisplayDate = styled.div`
  color: ${({ isToday }) => isToday && "#F8F7FA"};
  background-color: ${({ isToday, isSelected }) => (isSelected ? "#5e5b68" : isToday ? "#313133" : "")};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  align-self: flex-end;
  position: absolute;
  top: 8px;
  right: 8px;
  width: 36px;
  height: 36px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 16px;
    height: 16px;
  }
`;

export default Calendar;
