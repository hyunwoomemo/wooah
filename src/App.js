import styled from '@emotion/styled';
import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import GlobalStyle from './component/common/GlobalStyle';
import Join from './component/Join';
import Loading from './component/Loading';
import Login from './component/Login';
import Chart from './pages/Chart';
import Main from './pages/Main';
import Memo from './pages/Memo';
import User from './pages/User';
import PullToRefresh from "react-simple-pull-to-refresh";
import { ActionContext, ContextProvider, ModalContext } from './context/Context';
import NotFound from './component/common/NotFound';
import { useSelector } from 'react-redux';

function App() {


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000)
  })


  const handleRefresh = () => {
    window.location.reload(true);
  };

  const isLogin = localStorage.getItem('isLogin');
  return (
    <Base>
      <GlobalStyle />
      {loading ? <Loading /> :

        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/memo' element={<Memo />}></Route>
          <Route path='/chart' element={<Chart />}></Route>
          <Route path='/user' element={<User />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/join' element={<Join />}></Route>
          <Route path='/*' element={<NotFound />}></Route>
        </Routes>
      }
    </Base>
  );
}

const Base = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
`


export default App;
