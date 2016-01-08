Redux DevTools Log Monitor
=========================

A chart monitor for [Redux DevTools](https://github.com/gaearon/redux-devtools).  
It shows a real-time view of the store aka the current state of the app.

[Demo](http://romseguy.github.io/redux-store-visualizer/) [(Source)](https://github.com/romseguy/redux-store-visualizer)

### Installation

```
npm install --save-dev redux-devtools-chart-monitor
```

### Usage

You can use `ChartMonitor` as the only monitor in your app:

##### `containers/DevTools.js`

```js
import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';

export default createDevTools(
  <ChartMonitor />
);
```

Then you can render `<DevTools>` to any place inside app or even into a separate popup window.

Alternative, you can use it together with [`DockMonitor`](https://github.com/gaearon/redux-devtools-dock-monitor) to make it dockable.  
Consult the [`DockMonitor` README](https://github.com/gaearon/redux-devtools-dock-monitor) for details of this approach.

[Read how to start using Redux DevTools.](https://github.com/gaearon/redux-devtools)

### Features

### Props

Name                  | Description
-------------         | -------------
`theme`               | Either a string referring to one of the themes provided by [redux-devtools-themes](https://github.com/gaearon/redux-devtools-themes) (feel free to contribute!) or a custom object of the same format. Optional. By default, set to [`'nicinabox'`](https://github.com/gaearon/redux-devtools-themes/blob/master/src/nicinabox.js).
`select`              | A function that selects the slice of the state for DevTools to show. For example, `state => state.thePart.iCare.about`. Optional. By default, set to `state => state`.

### License

MIT
