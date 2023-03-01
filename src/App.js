import styled from '@emotion/styled';
import React from 'react';
import { Routes, Route } from 'react-router-dom'
import GlobalStyle from './component/common/GlobalStyle';
import Header from './component/Header';
import Navigation from './component/Navigation';
import Main from './pages/Main';


function App() {
  return (
    <Base>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route exact path='/' element={<Main />}></Route>
      </Routes>
      <Navigation />
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
