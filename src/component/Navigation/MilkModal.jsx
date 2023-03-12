import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Slider } from "antd";
import { useNow } from "@mui/x-date-pickers/internals";

const onAfterChange = (value) => {
  console.log("onAfterChange: ", value);
};

const formatter = (value) => `${value}ml`;

dayjs.extend(customParseFormat);

const Portal = (props) => {
  return createPortal(props.children, document.getElementById("portal"));
};

const MilkModal = ({ openAction, hideAction, showAction }) => {
  const [milkValue, setMilkValue] = useState(0);

  const onChange = (value) => {
    console.log("onChange: ", value);
    setMilkValue(value);
  };

  return (
    <Portal>
      <Base openAction={openAction} hideAction={hideAction} showAction={showAction}>
        <MilkValue>{`${milkValue}ml`}</MilkValue>
        <Slider
          tooltip={{
            open: false,
          }}
          max={300}
          step={10}
          defaultValue={150}
          onChange={onChange}
          onAfterChange={onAfterChange}
          placement="bottomRight"
        />
        <TimePickerWrapper format={"HH:mm"} />
      </Base>
    </Portal>
  );
};

const Base = styled.div`
  z-index: 999;
  width: 80vw;
  height: 50vh;
  background-color: #fff;
  border: 1px solid #f1f1f1;
  box-shadow: 0px 0px 5px #e1e1e1;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transition: all 0.2s;

  ${({ openAction, hideAction, showAction }) =>
    openAction === "milk" && hideAction && showAction
      ? css`
          transform: translate(-50%, -50%) scale(1);
        `
      : css`
          transform: translate(-50%, -50%) scale(0);
        `}
`;

const MilkValue = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;

const TimePickerWrapper = styled(TimePicker)`
  padding: 1rem;
  margin: 3rem 0;
  display: flex;
  font-size: 24px;
`;

export default MilkModal;
