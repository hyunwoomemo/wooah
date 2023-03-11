import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
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
import { ContextProvider, ModalContext } from './context/Context';
import NotFound from './component/common/NotFound';

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

        <PullWrapper onRefresh={handleRefresh} pullingContent="당겨서 새로고침" pullDownThreshold={95} resistance={5}>
          <Routes>
            <Route path='/' element={<Main />}></Route>
            <Route path='/memo' element={<Memo />}></Route>
            <Route path='/chart' element={<Chart />}></Route>
            <Route path='/user' element={<User />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/*' element={<NotFound />}></Route>
          </Routes>
        </PullWrapper>
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

const PullWrapper = styled(PullToRefresh)`
height: 100vh;

> div:first-of-type {
  display: flex;
  justify-content: center;
  padding-top: 1rem;
}
`

export default App;

{/* <Base>
      <GlobalStyle />
      {loading ? <Loading /> :
        isLogin ?

            <PullWrapper onRefresh={handleRefresh} pullingContent="당겨서 새로고침" pullDownThreshold={95} resistance={5}>
              <Routes>
                <Route path='/' element={<Main />}></Route>
                <Route path='/memo' element={<Memo />}></Route>
                <Route path='/chart' element={<Chart />}></Route>
                <Route path='/user' element={<User />}></Route>
                <Route path='/login' element={<Login />}></Route>
              </Routes>
            </PullWrapper>
          :
          <Routes>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/join' element={<Join />}></Route>
          </Routes>
      }
    </Base> */}