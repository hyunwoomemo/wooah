import styled from "@emotion/styled";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { DateContext } from "../../context/Context";
import { select } from "../../slices/DateSlice";
import { selectDate, open, selectEndDate } from "../../slices/RecordModalSlice";
import { getList, postItem, putItem } from "../../slices/RecordSlice";
import Modal from "../common/Modal";

const BathModal = () => {
  const { now, setNow } = useContext(DateContext);
  const { date, endDate, openCategory } = useSelector((state) => state.RecordModalSlice);
  const [endTime, setEndTime] = useState();

  const { selectData } = useSelector((state) => state.RecordSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    setNow(dayjs(new Date()));
  }, []);

  const handleTimeChange = (e) => {
    dispatch(selectDate(e));
    setNow(e);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e);
    dispatch(selectEndDate(e));
  };

  const handleSleepSave = () => {
    if (dayjs(new Date(endTime)).diff(dayjs(new Date(date)), "minute") < 0) {
      alert("종료 시간이 시작 시간보다 빨라요 😂");
    } else {
      dispatch(
        postItem({
          category: "sleep",
          date: date,
          recorder: localStorage.getItem("parents"),
          email: localStorage.getItem("email"),
          groupName: localStorage.getItem("group"),
          endDate: endTime ? dayjs(new Date(endTime)).format("YYYY-MM-DD HH:mm:ss") : null,
          volume: null,
        })
      );
      dispatch(select(new Date(date)));
      dispatch(selectDate(new Date(date)));
      dispatch(open(""));

      if (selectData[selectData?.length - 1]?.category === "sleep" && selectData[selectData?.length - 1]?.endDate === null) {
        dispatch(
          putItem({
            id: selectData[selectData?.length - 1]?.id,
            category: "sleep",
            date: dayjs(new Date(selectData[selectData?.length - 1]?.date)).format("YYYY-MM-DD HH:mm:ss"),
            recorder: localStorage.getItem("parents"),
            email: localStorage.getItem("email"),
            groupName: localStorage.getItem("group"),
            endDate: dayjs(new Date(now)).format("YYYY-MM-DD HH:mm:ss"),
            volume: null,
            big: null,
            calendarTitle: null,
            calendarLocation: null,
            calendarUrl: null,
            calendarMemo: null,
            vitamin: null,
            lactobacillus: null,
          })
        );

        setTimeout(() => {
          dispatch(getList());
        }, 100);
      }

      setTimeout(() => {
        dispatch(getList());
      }, 100);
    }
  };

  return (
    <Modal isOpen={openCategory === "bath"} onClose={() => dispatch(open(""))}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Base openCategory={openCategory}>
          <TimeWrapper>
            <TimePicker label="잠든 시간" defaultValue={now || ""} value={now || ""} onChange={handleTimeChange} />
            <TimePicker label="잠깬 시간" defaultValue={""} value={endTime || ""} onChange={handleEndTimeChange} disablePast />
          </TimeWrapper>
          <SaveBtn>
            <AiOutlineCheck onClick={handleSleepSave} />
          </SaveBtn>
        </Base>
      </LocalizationProvider>
    </Modal>
  );
};

const Base = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 3rem;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const TimeWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const SaveBtn = styled.div``;

export default BathModal;
