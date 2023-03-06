import styled from "@emotion/styled";
import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const [email, setEmail] = useState("");
  const passwordRef = useRef();
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["user"]);

  const handleEmail = () => {
    setEmail(emailRef.current.value);
    console.log(emailRef.current.value);
  };
  const handlePassword = () => {
    setPassword(passwordRef.current.value);
    console.log(passwordRef.current.value);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (emailRef.current.value === "" || emailRef.current.value === undefined) {
      alert("이메일을 입력하세요!!!");
      emailRef.current.focus();
      return false;
    }
    if (passwordRef.current.value === "" || passwordRef.current.value === undefined) {
      alert("패스워드를 입력하세요!!!");
      passwordRef.current.focus();
      return false;
    }

    axios
      .post("http://localhost:3001/login", {
        userEmail: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data.length > 0);
        if (res.data.length > 0) {
          alert("로그인에 성공했습니다.");
          localStorage.setItem("baby", res.data[0].user_baby);
          localStorage.setItem("email", res.data[0].user_email);
          localStorage.setItem("baby_birthday", res.data[0].baby_birthday);
          localStorage.setItem("isLogin", true);
          window.location.href = "/";
        } else {
          alert("로그인에 실패했습니다.");
        }
      });
  };

  return (
    <Base>
      <LoginForm>
        <label htmlFor="email">이메일 주소</label>
        <input id="email" type="email" ref={emailRef} onChange={handleEmail} />
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
