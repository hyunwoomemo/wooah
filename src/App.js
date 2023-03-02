import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import GlobalStyle from './component/common/GlobalStyle';
import Header from './component/Header';
import Loading from './component/Loading';
import Navigation from './component/Navigation';
import Main from './pages/Main';
import Memo from './pages/Memo';


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
          <Header />
          <Routes>
            <Route exact path='/' element={<Main />}></Route>
            <Route path='/memo' element={<Memo />}></Route>
          </Routes>
          <Navigation />
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
