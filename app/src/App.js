import React, {Component} from 'react/lib/React';

// import { BrowserRouter, HashRouter, Route, Redirect, Switch } from 'react-router-dom';
// 리액트 라우터를 코드 스플리팅 하려면 위 코드를 이렇게 하나씩 불러와야한다 귀찮 ㅠ
import BrowserRouter from 'react-router-dom/es/BrowserRouter';
import HashRouter from 'react-router-dom/es/HashRouter';
import Route from 'react-router-dom/es/Route';
import Redirect from 'react-router-dom/es/Redirect';
import Switch from 'react-router-dom/es/Switch';

// HTML5 History API 지원여부 파악
const isBrowserHistory = history.pushState;
const Router = isBrowserHistory ? BrowserRouter : HashRouter;

// 리액트 라우터 4에서 코드 스플리팅 하기.
// getComponent is a function that returns a promise for a component
// It will not be called until the first mount
const asyncComponent = getComponent => (
  class AsyncComponent extends Component {
    constructor() {
      super();
      this.state = {Component: AsyncComponent.Component};
    }

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(Component => {
          AsyncComponent.Component = Component;
          this.setState({Component});
        });
      }
    }
    render() {
      const {Component} = this.state;
      if(Component) {
        return <Component {...this.props} />;
      }
      return null;
    }
  }
);

const Menu = asyncComponent(() => import('./components/Menu').then(module => module.default));
const About = asyncComponent(() => import('./components/About').then(module => module.default));
const Home = asyncComponent(() => import('./components/Home').then(module => module.default));
const Name = asyncComponent(() => import('./components/Name').then(module => module.default));
const Portfolio = asyncComponent(() => import('./components/Portfolio').then(module => module.default));

const App = () => (
  // v3에는 Router 속성에 browserRouter or hashRouter가 들어갔는데,
  // v4에는 BrowserRouter or HashRouter가 Router까지 포함한다.
  // 또한 Router 안에는 하나의 컴포넌트만 들어가야한다.
  // 따라서 div 같은 컴포넌트로 그 안을 한 번 감싸줘야한다.
  // Redirect 컴포넌트는 Switch 컴포넌트로 감싸줘야 정상 작동한다.
  // 또한 파라미터는 괄호를 써서 생략 가능하던 것이 불가능해졌다.
  // 따라서 두 가지 경우 모두 적어줘야한다.
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
      <Route path="/portfolio/:id" component={Portfolio} />
    </div>
  </Router>
);

export default App;