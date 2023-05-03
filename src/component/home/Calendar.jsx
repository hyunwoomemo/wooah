import styled from "@emotion/styled";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { getList } from "../../slices/RecordSlice";
import Header from "../common/Header";
import { select } from "../../slices/DateSlice";

/* const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]; */ // 요일
const DAYS = ["일", "월", "화", "수", "목", "금", "토"]; // 요일

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
  };

  const { data } = useSelector(
    (state) => state.RecordSlice,
    (prev, next) => prev.data === next.data
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(getList());
    }, 100);
  }, [selectValue]);

  const pad = () =>
    [...Array(firstDay.getDay()).keys()]?.map((p, i, arr) => (
      <TableData key={`pad_${p}`}>
        <PadData>{dayjs(new Date(year, month, p - arr.length + 1)).format("DD")}</PadData>
      </TableData>
    )); // 해당 월의 첫째 날 전 pad

  const comparisonDatePrev = (a, b) => {
    if (isSameDay(a, b)) {
      return dayjs(new Date(a)).diff(dayjs(new Date(b)), "minute");
    } else {
      return dayjs(new Date(a))
        .set("date", new Date(b).getDate())
        .set("hour", 23)
        .set("minute", 59)
        .set("second", 59)
        .diff(dayjs(new Date(b)), "minute");
    }
  };
  const comparisonDateNext = (a, b) => {
    if (isSameDay(a, b)) {
      return dayjs(new Date(a)).diff(dayjs(new Date(b)), "minute");
    } else {
      return dayjs(new Date(a)).diff(dayjs(new Date(b)).subtract(-1, "day").set("hour", 0).set("minute", 0).set("second", 0), "minute");
    }
  };

  const range = () =>
    [...Array(lastDay.getDate()).keys()]?.map((d) => {
      // 1일 부터 마지막 날까지 날짜 표기
      const thisDay = new Date(year, month, d + 1);
      const today = new Date();
      const contents = data?.filter((v) => isSameDay(new Date(v.date), thisDay) && v.email === localStorage.getItem("email"));
      const otherDateContents = data?.filter((v) => isSameDay(new Date(v.endDate), thisDay) && v.email === localStorage.getItem("email") && !isSameDay(new Date(v.date), thisDay));
      const milkSum = contents?.reduce((acc, cur) => acc + Number(cur.volume), 0);
      const sleepSum =
        contents?.filter((v) => v.endDate && v.date).reduce((acc, cur) => acc + comparisonDatePrev(new Date(cur.endDate), new Date(cur.date)), 0) +
        otherDateContents?.filter((v) => v.endDate && v.date).reduce((acc, cur) => acc + comparisonDateNext(new Date(cur.endDate), new Date(cur.date)), 0);
      const calendarItem = contents?.filter((v) => v.category === "calendar");

      return (
        <TableData key={d} onClick={() => selectDate(thisDay)}>
          <ContentsWrapper isSelected={isSameDay(selectValue, thisDay)} isToday={isSameDay(today, thisDay)}>
            <DisplayDate>
              <DateItem>{new Date(year, month, d + 1).getDate()}</DateItem>
              <Contents>
                {calendarItem?.map((v) => {
                  return <CalendarContents>{v.calendarTitle}</CalendarContents>;
                })}
                {milkSum > 0 ? <MilkContents>{`🍼${milkSum}`}</MilkContents> : undefined}
                {sleepSum > 0 ? (
                  <SleepContents>{Math.floor(sleepSum / 60) > 0 ? `🌙 ${Math.floor(sleepSum / 60)}h ${sleepSum - Math.floor(sleepSum / 60) * 60}m` : `${sleepSum}분`}</SleepContents>
                ) : undefined}
              </Contents>
            </DisplayDate>
          </ContentsWrapper>
        </TableData>
      );
    });

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

    if (distanceY + distanceX > 100 && distanceX > distanceY) {
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
      <Header></Header>
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
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  transition: all 0.3s;
  padding: 5px;

  @media (max-width: 768px) {
    padding: 2px;
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
  table-layout: fixed;
  word-break: break-all;
  height: auto;
  transition: all 0.3s;
  box-shadow: 0.3rem 0.3rem 0.6rem var(--greyLight-2), -0.2rem -0.2rem 0.5rem var(--white);
  border-radius: 20px;
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

  @media (min-width: 769px) {
    &:hover {
      background-color: #80808011;
    }
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
  color: #8a8a8a;
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
`;

const SleepContents = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const CalendarContents = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  width: 10px;
  @media (min-width: 769px) {
    justify-content: center;
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
  font-size: 16px;

  > div {
    width: 100%;
  }
`;

const Contents = styled.div`
  display: flex;
  gap: 3px;
  flex-direction: column;
  font-size: 12px;
  margin-top: 10px;
  padding: 0 1px;
  align-items: center;
  height: 50px;
  box-sizing: border-box;
  overflow-y: scroll;

  @media (max-width: 768px) {
    font-size: 8px;
    white-space: nowrap;
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

export default Calendar;
