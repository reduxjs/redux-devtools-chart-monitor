import 'babel-core/polyfill';

import React from 'react';
import { Provider } from 'react-redux';
import ChartMonitor from 'redux-devtools-chart-monitor';
import { DevTools, DebugPanel } from 'redux-devtools/lib/react';
import App from './containers/App';
import configureStore from './store/configureStore';
import 'todomvc-app-css/index.css';

const store = configureStore();

React.render(
  <div>
    <DebugPanel top right bottom>
      <DevTools store={store}
                monitor={ChartMonitor}
                visibleOnLoad={true}/>
    </DebugPanel>
    <Provider store={store}>
      {() => <App />}
    </Provider>
  </div>,
  document.getElementById('root')
);
