import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import { useDispatch } from "react-redux";
import { open, update } from "../../slices/RecordModalSlice";

const Overlay = ({ item, select }) => {
  const dispatch = useDispatch();
  return <Base item={item} onClick={select === "open" ? () => dispatch(open("")) : () => dispatch(update(""))}></Base>;
};

const Base = styled.div`
  background-color: #d7d7d7;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 998;

  ${({ item }) =>
    item
      ? css`
          opacity: 0;
        `
      : css`
          opacity: 0.6;
        `}
`;

export default Overlay;
