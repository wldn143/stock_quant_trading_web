import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {BrowserRouter} from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    
    <App />
    
  </BrowserRouter>
  
  // React.Strict 로 감싸면, 개발자모드로서 rendering이 두번된다. 두번 Post하는 오류 해결. 하지만 근본적인 해결책은 아님
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

