import styled from "@emotion/styled";
import React from "react";
import Layout from "../component/Layout";

const User = () => {
  const handleLogout = () => {
    localStorage.clear();
    alert("로그아웃 되었습니다.");
    window.location.href = "/login";
  };
  return (
    <Layout>
      <Base>
        <button onClick={handleLogout}>로그아웃</button>
      </Base>
    </Layout>
  );
};

const Base = styled.div`
  padding: 1rem;
`;

export default User;
