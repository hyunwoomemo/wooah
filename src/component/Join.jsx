import styled from "@emotion/styled";
import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Join = () => {
  const navigate = useNavigate();
  const groupNameRef = useRef();
  const [groupName, setGroupName] = useState("");
  const emailRef = useRef();
  const [email, setEmail] = useState("");
  const babyRef = useRef();
  const [baby, setBaby] = useState("");
  const birthdayRef = useRef();
  const [birthday, setBirthday] = useState("");
  const [parents, setParents] = useState("father");
  const passwordRef = useRef();
  const [password, setPassword] = useState("");
  const passwordCheckRef = useRef();
  const [passwordCheck, setPasswordCheck] = useState("");

  const handleGroupName = () => {
    setGroupName(groupNameRef.current.value);
  };
  const handleEmail = () => {
    setEmail(emailRef.current.value);
  };
  const handleBaby = () => {
    setBaby(babyRef.current.value);
  };
  const handleBirthday = () => {
    setBirthday(birthdayRef.current.value);
  };

  const handleParents = (e) => {
    setParents(e.target.value);
  };

  const handlePassword = () => {
    setPassword(passwordRef.current.value);
  };
  const handlePasswordCheck = () => {
    setPasswordCheck(passwordCheckRef.current.value);
  };

  const handleJoin = (e) => {
    e.preventDefault();

    axios
      .post("http://13.115.96.189:8080/join", {
        groupName: groupName,
        userEmail: email,
        userBaby: baby,
        babyBirthday: birthday,
        parents: parents,
        password: password,
        passwordCheck: passwordCheck,
      })
      .then((res) => {
        console.log("handleMember =>", res);
        // 로그인 성공여부는 res.data.affectedRows가 0인지 1인지 확인하면 됨
        if (res.data.affectedRows === 1) {
          alert("회원가입 성공!!! 로그인 페이지로 이동합니다.");
          navigate("/login");
        } else alert("회원가입 실패!!!");
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <Base>
      <JoinForm>
        <label htmlFor="userName">그룹 이름</label>
        <input id="userName" type="text" ref={groupNameRef} onChange={handleGroupName} />
        <label htmlFor="userEmail">이메일 주소</label>
        <input id="userEmail" type="email" ref={emailRef} onChange={handleEmail} />
        <label htmlFor="userBaby">아기 이름</label>
        <input id="userBaby" type="text" ref={babyRef} onChange={handleBaby} />
        <label htmlFor="babyBirthday">아기 생일</label>
        <input id="babyBirthday" type="date" ref={birthdayRef} onChange={handleBirthday} />
        <fieldset>
          <legend>관계</legend>
          <label htmlFor="father">
            <input type="radio" id="father" name="parents" value="father" checked={parents === "father" ? true : false} onChange={handleParents}></input>
            아빠
          </label>
          <label htmlFor="mother">
            <input type="radio" id="mother" name="parents" value="mother" checked={parents === "mother" ? true : false} onChange={handleParents}></input>
            엄마
          </label>
        </fieldset>
        <label htmlFor="password">비밀번호</label>
        <input id="password" type="password" ref={passwordRef} onChange={handlePassword} />
        <label htmlFor="passwordCheck">비밀번호 확인</label>
        <input id="passwordCheck" type="password" ref={passwordCheckRef} onChange={handlePasswordCheck} />
        <ButtonWrapper>
          <button onClick={handleJoin}>회원가입</button>
        </ButtonWrapper>
      </JoinForm>
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

const JoinForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 2rem;

  > label:not(:first-of-type) {
    margin-top: 1rem;
  }

  > fieldset {
    margin-top: 1rem;

    > legend {
      margin-bottom: 10px;
    }
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

export default Join;
