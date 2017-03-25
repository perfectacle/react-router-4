if( // 배포할 때는 리액트 개발 도구를 죽여놔야함.
  process.env.NODE_ENV === 'production' &&
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ &&
  Object.keys(window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers).length
) window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers = {};

import React from 'react/lib/React';
import { render } from 'react-dom';

import App from './AppDev';

render(<App />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept('./AppDev', () => {
    render(<App />, document.getElementById('app'));
  });
}