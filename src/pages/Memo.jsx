import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import axois from "axios";

const Memo = () => {
  const [contents, setContents] = useState("");
  const [todolist, setTodolist] = useState([]);

  const handleContents = (e) => {
    setContents(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axois
      .post("http://localhost:3001/create", {
        contents: contents,
      })
      .then(() => {
        setTodolist([
          ...todolist,
          {
            contents: contents,
          },
        ]);
      });
    e.target[0].value = "";
  };

  useEffect(() => {
    axois.get("http://localhost:3001/todos").then((response) => {
      setTodolist(response.data);
    });
  }, []);
  return (
    <Base className="App">
      <h1>오늘의 할 일</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="할 일 추가" onChange={handleContents} />
        <button>추가</button>
      </form>
      <hr />
      <h2>할 일 리스트</h2>
      {todolist.map((todo) => {
        return <li>{todo.contents}</li>;
      })}
    </Base>
  );
};

const Base = styled.div``;

export default Memo;
