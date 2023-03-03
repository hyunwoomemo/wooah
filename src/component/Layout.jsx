import styled from "@emotion/styled";
import React, { useState } from "react";
import Header from "./Header";
import NavigationBar from "./Navigation";

const Layout = ({ children }) => {
  const [touchPosition, setTouchPosition] = useState({});
  const [showReload, setShowReload] = useState(false);
  const [reloadY, setReloadY] = useState(0);

  const touchEnd = (e) => {
    const distanceX = Math.abs(touchPosition.x - e.changedTouches[0].pageX);
    const distanceY = Math.abs(touchPosition.y - e.changedTouches[0].pageY);

    if (distanceY + distanceX > 200 && distanceY > distanceX) {
      if (touchPosition.y - e.changedTouches[0].pageY < 0) {
        window.location.reload(true);
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
      onTouchMove={(e) => {
        setReloadY(touchPosition.y - e.changedTouches[0].pageY);
        if (reloadY < -200) {
          setShowReload(true);
        } else {
          setShowReload(false);
        }
      }}
      onTouchEnd={touchEnd}
    >
      {showReload ? <Background></Background> : undefined}
      {showReload ? (
        <Reload reloadY={reloadY}>
          <p>새로고침</p>
        </Reload>
      ) : undefined}

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
  background-color: #bebebe;
  position: absolute;
  z-index: 998;
  opacity: 0.5;
`;

const Reload = styled.div`
  padding: 3rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 50%;

  > p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
  }
`;

export default Layout;
