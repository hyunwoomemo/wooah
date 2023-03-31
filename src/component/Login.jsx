import styled from "@emotion/styled";
import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Login = () => {
  const navigate = useNavigate();
  const groupRef = useRef();
  const [group, setGroup] = useState("");
  const passwordRef = useRef();
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["user"]);

  const handleGroup = () => {
    setGroup(groupRef.current.value);
  };
  const handlePassword = () => {
    setPassword(passwordRef.current.value);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (groupRef.current.value === "" || groupRef.current.value === undefined) {
      alert("그룹 이름을 입력하세요!!!");
      groupRef.current.focus();
      return false;
    }
    if (passwordRef.current.value === "" || passwordRef.current.value === undefined) {
      alert("패스워드를 입력하세요!!!");
      passwordRef.current.focus();
      return false;
    }

    axios
      .post("http://13.115.96.189:8080/login", {
        groupName: group,
        password: password,
      })
      .then((res) => {
        if (res.data.length > 0) {
          alert("로그인에 성공했습니다.");
          localStorage.setItem("baby", res.data[0].user_baby);
          localStorage.setItem("group", res.data[0].group_name);
          localStorage.setItem("parents", res.data[0].parents);
          localStorage.setItem("baby_birthday", res.data[0].baby_birthday);
          localStorage.setItem("isLogin", true);
          localStorage.setItem("email", res.data[0].user_email);
          window.location.href = "/";
        } else {
          alert("로그인에 실패했습니다.");
        }
      });
  };

  return (
    <Base>
      <LoginForm>
        <label htmlFor="groupName">그룹 이름</label>
        <input id="groupName" type="text" ref={groupRef} onChange={handleGroup} />
        <label htmlFor="password">비밀번호</label>
        <input id="password" type="password" ref={passwordRef} onChange={handlePassword} />
        <ButtonWrapper>
          <button type="submit" onClick={handleLogin}>
            로그인
          </button>
          <Link to="/join">회원가입</Link>
        </ButtonWrapper>
      </LoginForm>
    </Base>
  );
};

const Base = styled.div`
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;

  > label:not(:first-of-type) {
    margin-top: 1rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;

  > button,
  a {
    border: 0;
    background: none;
    padding: 1rem;
    background-color: #80808022;
    text-decoration: none;
    color: #000;
    font-size: 16px;
    font-weight: normal;
  }
`;

export default Login;
