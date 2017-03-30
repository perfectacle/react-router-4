import React, {Component} from 'react/lib/React';

// import { BrowserRouter, HashRouter, Route, Redirect, Switch } from 'react-router-dom';
// 리액트 라우터를 코드 스플리팅 하려면 위 코드를 이렇게 하나씩 불러와야한다 귀찮 ㅠ
import Router from 'react-router-dom/es/BrowserRouter';
import Route from 'react-router-dom/es/Route';
import Redirect from 'react-router-dom/es/Redirect';
import Switch from 'react-router-dom/es/Switch';

import Menu from './components/Menu';
import About from './components/About';
import Home from './components/Home';
import Name from './components/Name';
import Portfolio from './components/Portfolio';

export default class App extends Component {
  render() {
    return(
      <Router>
        <div>
          <Route component={Menu} />
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/about/name" component={Name} />
          <Switch>
            <Redirect to="/portfolio/0" from="/about/redirect0"/>
            <Redirect from="/about/redirect1" to="/portfolio/1"/>
          </Switch>
          <Route exact path="/portfolio" component={Portfolio} />
          <Route exact path="/portfolio/:id" component={Portfolio} />
        </div>
      </Router>
    )
  }
}