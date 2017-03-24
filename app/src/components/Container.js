import React from 'react/lib/React';

import Route from 'react-router-dom/es/Route';
import Redirect from 'react-router-dom/es/Redirect';
import Link from 'react-router-dom/es/Link';

import About from './About';
import Home from './Home';
import Name from './Name';
import Portfolio from './Portfolio';

const Container = ({children}) => (
  <div>
    <header>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/about/name">About - Name</Link></li>
        <li><Link to="/about/redirect0">About - RedirectTo: Portfolio #0</Link></li>
        <li><Link to="/about/redirect1">About - RedirectTo: Portfolio #1</Link></li>
        <li><Link to="/portfolio">Portfolio - All</Link></li>
        <li><Link to="/portfolio/0">Portfoilo - #0</Link></li>
        <li><Link to="/portfolio/1">Portfoilo - #1</Link></li>
      </ul>
    </header>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route path="/about/name" component={Name} />
    <Route path="/redirect0" onEnter={(nextState, replace) => replace('/portfolio/0')} />
    <Route path="/portfolio(/:id)" component={Portfolio} />
  </div>
);

export default Container;