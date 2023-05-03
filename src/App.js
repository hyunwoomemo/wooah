import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import GlobalStyle from './component/common/GlobalStyle';
import Join from './component/common/Join';
import Login from './component/common//Login';
import Main from './pages/Main';
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
      <Routes>
        <Route path='/' element={<Main />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/join' element={<Join />}></Route>
        <Route path='/*' element={<NotFound />}></Route>
      </Routes>
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
