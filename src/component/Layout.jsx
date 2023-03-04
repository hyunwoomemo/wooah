import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useMemo, useRef, useState } from "react";
import Header from "./Header";
import NavigationBar from "./Navigation";
import { AiOutlineReload } from "react-icons/ai";

const Layout = ({ children }) => {
  const [touchPosition, setTouchPosition] = useState({});
  const [showReload, setShowReload] = useState(false);
  const [reloadY, setReloadY] = useState(0);

  const touchEnd = useMemo(
    (e) => {
      const distanceX = Math.abs(touchPosition.x - e.changedTouches[0].pageX);
      const distanceY = Math.abs(touchPosition.y - e.changedTouches[0].pageY);

      if (distanceY + distanceX > 150 && distanceY > distanceX) {
        if (touchPosition.y - e.changedTouches[0].pageY < 0) {
          window.location.reload(true);
        }
      }

      setTop(0);
    },
    [touchPosition.x, touchPosition.y]
  );

  const [top, setTop] = useState(0);

  const reloadRef = useRef();

  return (
    <Base
      onTouchStart={(e) =>
        setTouchPosition({
          x: e.changedTouches[0].pageX,
          y: e.changedTouches[0].pageY,
        })
      }
      onTouchMove={(e) => {
        setReloadY(touchPosition.y - e.changedTouches[0].pageY);
        if (reloadY < 0) {
          setTop(Math.abs(reloadY));
        }
      }}
      onTouchEnd={touchEnd}
    >
      {showReload ? <Background></Background> : undefined}
      <Reload ref={reloadRef} reloadY={reloadY} top={top}>
        <AiOutlineReload top={top} />
      </Reload>

      <Header></Header>
      {children}
      <NavigationBar></NavigationBar>
    </Base>
  );
};

const Base = styled.div`
  position: relative;
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 998;
  opacity: 0.5;
`;

const Reload = styled.div`
  padding: 3rem;
  position: absolute;
  left: 50%;
  height: 100%;
  transform: translateX(-50%);
  bottom: 100%;
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  margin: 0 auto;
  background-color: #ffffff;
  bottom: ${({ top }) => (top > 0 ? `${100 - top / 10}%` : undefined)};
  /* transform: ${({ top }) => (top > 0 ? `translate(-50%, ${top - 100}%)` : undefined)}; */
  /* transition: all 0.3s; */

  > svg {
    font-size: 36px;
    transform: ${({ top }) => (top > 0 ? `rotate(${top * 2}deg)` : undefined)};
    color: skyblue;
    opacity: ${({ top }) => (top > 50 ? `${top / 150}` : undefined)};
    position: absolute;
    bottom: 50px;
  }
`;

export default Layout;
