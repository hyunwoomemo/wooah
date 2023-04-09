import styled from "@emotion/styled";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AiFillCloseCircle, AiOutlineCheck } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { DateContext } from "../../context/Context";
import { select } from "../../slices/DateSlice";
import { selectDate, open, update, selectEndDate } from "../../slices/RecordModalSlice";
import { getList, postItem, putItem } from "../../slices/RecordSlice";
import Modal from "../common/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const UpdateSleep = ({ id }) => {
  const { now, setNow } = useContext(DateContext);
  const { date, endDate, updateCategory, selectDate } = useSelector((state) => state.RecordModalSlice);

  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const handleTimeChange = (e) => {
    setNow(e);
    /* dispatch(selectDate(e)); */
  };

  const handleEndTimeChange = (e) => {
    dispatch(selectEndDate(e));
  };

  const handleSleepUpdate = () => {
    /* if (dayjs(new Date(endDate)).diff(dayjs(new Date(now)), "minute") < 0) {
      alert("종료 시간이 시작 시간보다 빨라요 😂");
    } else { */
    dispatch(
      putItem({
        id: id,
        category: "sleep",
        date: dayjs(new Date(now)).add(updateDate, "day").format("YYYY-MM-DD HH:mm:ss"),
        recorder: localStorage.getItem("parents"),
        email: localStorage.getItem("email"),
        groupName: localStorage.getItem("group"),
        endDate: endState
          ? null
          : endDate
          ? dayjs(new Date(endDate)).diff(dayjs(new Date(now)), "minute") < 0
            ? dayjs(new Date(endDate)).add(1, "day").add(updateDate, "day").format("YYYY-MM-DD HH:mm:ss")
            : dayjs(new Date(endDate)).add(updateDate, "day").format("YYYY-MM-DD HH:mm:ss")
          : null,
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
    dispatch(select(new Date(now)));
    setEndState(false);
    setTimeout(() => {
      dispatch(getList())
    }, 100)
    dispatch(update(""));
  };

  const [updateDate, setUpdateDate] = useState(0);
  const [checked, setChecked] = useState(true);

  const handleChange = (e) => {
    setUpdateDate(e.target.value);
    if (parseInt(e.target.value) !== 0) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  };

  const isSameDay = (a, b) => {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  };

  const [endState, setEndState] = useState(false);

  return (
    <Modal isOpen={updateCategory === "sleep"} onClose={() => dispatch(update(""))}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Base updateCategory={updateCategory}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">날짜</FormLabel>
            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" onChange={handleChange}>
              <FormControlLabel value="-2" control={<Radio />} label={dayjs(new Date(now)).add(-2, "day").format("MM-DD")} />
              <FormControlLabel value="-1" control={<Radio />} label={dayjs(new Date(now)).subtract(1, "day").format("MM-DD")} />
              <FormControlLabel value="0" control={<Radio />} label={isSameDay(new Date(), new Date(now)) ? "오늘" : dayjs(new Date(now)).format("MM-DD")} checked={checked} />
            </RadioGroup>
          </FormControl>
          <TimeWrapper>
            <TimePicker label="잠든 시간" defaultValue={dayjs(new Date(now)) || ""} value={dayjs(new Date(now)) || ""} onChange={handleTimeChange} />
            <EndWrapper>
              <TimePicker
                label="잠깬 시간"
                defaultValue={dayjs(new Date(endDate)) || ""}
                value={endState ? "" : dayjs(new Date(endDate)) || ""}
                onChange={handleEndTimeChange} /* minTime={dayjs(new Date(date))} */
              />
              <AiFillCloseCircle onClick={() => setEndState(true)}></AiFillCloseCircle>
            </EndWrapper>
          </TimeWrapper>
          <SaveBtn>
            수정
            <AiOutlineCheck onClick={handleSleepUpdate} />
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

const EndWrapper = styled.div`
  position: relative;
  > svg {
    padding: 10px;
    font-size: 30px;
    position: absolute;
    top: -25px;
    right: -20px;
    &:hover {
      color: #c05454;
    }
  }
`;

export default UpdateSleep;
