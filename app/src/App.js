import React from 'react/lib/React';

// import { Router, Route, IndexRoute, Redirect, browserHistory, hashHistory } from 'react-router';
// 리액트 라우터를 코드 스플리팅 하려면 위 코드를 이렇게 하나씩 불러와야한다 귀찮 ㅠ
import Router from 'react-router/es/Router';
import Route from 'react-router/es/Route';
import IndexRoute from 'react-router/es/IndexRoute';
import Redirect from 'react-router/es/Redirect';
import browserHistory from 'react-router/es/browserHistory';
import hashHistory from 'react-router/es/hashHistory';

// HTML5 History API 지원여부 파악
const isBrowserHistory = history.pushState;

// 리액트 라우터 3에서 코드 스플리팅 하기.
const loadRoute = callback => module => callback(null, module.default);

const App = () => (
  <Router history={isBrowserHistory ? browserHistory : hashHistory}>
    <Route path="/" getComponent={ // component 대신에 getComponent를 써야 코드 스플리팅이 됨.
      (loaction, callback) => {
        import('./components/Container').then(loadRoute(callback))
      }}>
      <IndexRoute getComponent={
        (loaction, callback) => {
          import('./components/Home').then(loadRoute(callback))
        }}/>
      <Route path="about" getComponent={
        (loaction, callback) => {
          import('./components/About').then(loadRoute(callback))
        }}>
        <Route path="name" getComponent={
          (loaction, callback) => {
            import('./components/Name').then(loadRoute(callback))
          }}/>
        <Route path="redirect0"
               onEnter={(nextState, replace) => replace('/portfolio/0')}
        />
        <Redirect from="redirect1" to="/portfolio/1" />
      </Route>
      <Route path="portfolio(/:id)" getComponent={
        (loaction, callback) => {
          import('./components/Portfolio').then(loadRoute(callback))
        }}/>
    </Route>
  </Router>
);

export default App;