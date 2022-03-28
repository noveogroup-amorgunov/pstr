import React from 'react';
import { render } from 'react-dom';
import { StoreProvider, store } from './store';

import Screen from './components/Screen';

const App = (
  <StoreProvider value={store}>
    <Screen />
  </StoreProvider>
);

render(App, document.querySelector('#app'));
