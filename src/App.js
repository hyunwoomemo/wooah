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
  let installPrompt = null;

  useEffect(() => {
    console.log('Listening for Install prompt');
    window.addEventListener('beforeinstallprompt', (e) => {
      // For older browsers
      e.preventDefault();
      console.log('Install Prompt fired');
      installPrompt = e;
      // See if the app is already installed, in that case, do nothing
      if (
        (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
        window.navigator.standalone === true
      ) {
        return false;
      }
    });
  }, []);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500)
  })

  const installApp = async () => {
    if (!installPrompt) {
      alert('이미 다운로드 했습니다')
      return false;
    }

    installPrompt.prompt();

    let outcome = await installPrompt.userChoice;

    if (outcome.outcome == 'accepted') {
      console.log('App Installed');

    } else {
      console.log('App not installed');
    }
    // Remove the event reference
    installPrompt = null;
  };

  return (
    <Base>
      <GlobalStyle />
      <button onClick={installApp}>추가</button>
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
