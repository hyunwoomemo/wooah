import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useRef, useState } from "react";
import Header from "./Header";
import NavigationBar from "./Navigation";
import { AiOutlineReload } from "react-icons/ai";

const Layout = ({ children }) => {
  const [touchPosition, setTouchPosition] = useState({});
  const [showReload, setShowReload] = useState(false);
  const [reloadY, setReloadY] = useState(0);

  const touchEnd = (e) => {
    const distanceX = Math.abs(touchPosition.x - e.changedTouches[0].pageX);
    const distanceY = Math.abs(touchPosition.y - e.changedTouches[0].pageY);

    if (distanceY + distanceX > 150 && distanceY > distanceX) {
      if (touchPosition.y - e.changedTouches[0].pageY < 0) {
        window.location.reload(true);
      }
    }

    setTop(0);
  };

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
  height: ${({ top }) => (top > 50 ? `${top - 50}px` : 0)};
  background-color: #fff;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  position: relative;

  > svg {
    font-size: 36px;
    color: ${({ top }) => (top > 149 ? `#5abde4` : "gray")};
    opacity: ${({ top }) => (top > 50 ? `${top / 100}` : 0)};
    bottom: 50px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%) ${({ top }) => (top > 0 ? `rotate(${top * 1}deg)` : undefined)};
  }
`;

export default Layout;
