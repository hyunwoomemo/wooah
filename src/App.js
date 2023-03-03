import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import GlobalStyle from './component/common/GlobalStyle';
import Header from './component/Header';
import Join from './component/Join';
import Loading from './component/Loading';
import Login from './component/Login';
import Navigation from './component/Navigation';
import Main from './pages/Main';
import Memo from './pages/Memo';
import User from './pages/User';


function App() {


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500)
  })

  return (
    <Base>
      <GlobalStyle />
      {loading ? <Loading /> :
        <>
          <Routes>
            <Route exact path='/' element={<Main />}></Route>
            <Route path='/memo' element={<Memo />}></Route>
            <Route path='/user' element={<User />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/join' element={<Join />}></Route>
          </Routes>
        </>
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
