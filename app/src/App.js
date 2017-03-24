import React from 'react/lib/React';

// import { BrowserRouter, HashRouter, Route, Redirect, Link } from 'react-router-dom';
// 리액트 라우터를 코드 스플리팅 하려면 위 코드를 이렇게 하나씩 불러와야한다 귀찮 ㅠ
import BrowserRouter from 'react-router-dom/es/BrowserRouter';
import HashRouter from 'react-router-dom/es/HashRouter';
import Route from 'react-router-dom/es/Route';
import Redirect from 'react-router-dom/es/Redirect';
import Switch from 'react-router-dom/es/Switch';

import Container from './components/Container';
import About from './components/About';
import Home from './components/Home';
import Name from './components/Name';
import Portfolio from './components/Portfolio';


// HTML5 History API 지원여부 파악
const isBrowserHistory = history.pushState;
const Router = isBrowserHistory ? BrowserRouter : HashRouter;

// 리액트 라우터 3에서 코드 스플리팅 하기.
const loadRoute = callback => module => callback(null, module.default);

const App =
  // v3에는 Router 안에 browserRouter or hashRouter가 들어갔는데,
  // v4에는 BrowserRouter or HashRouter가 Router까지 포함한다.
  // 또한 Router 안에는 하나의 컴포넌트만 들어가야한다.
  // 따라서 div 같은 컴포넌트로 그 안을 한 번 감싸줘야한다.
  // 또한 IndexRoute는 Route 컴포넌트의 exact라는 속성으로 대체되었다.
  <Router>
    <div>
      <Container/>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/about/name" component={Name} />
      <Switch>
        <Redirect to="/portfolio/0" from="/about/redirect0"/>
        <Redirect from="/about/redirect1" to="/portfolio/1"/>
      </Switch>
      <Route exact path="/portfolio" component={Portfolio} />
      <Route path="/portfolio/:id" component={Portfolio} />
    </div>
  </Router>;

export default App;