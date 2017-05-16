import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import * as ChannelActions from './actions/channel_actions';
import * as ChannelApiUtil from './util/channel_api_util';
import { selectAllPublicChannels } from './reducers/selectors/channel_selectors';
document.addEventListener('DOMContentLoaded', () => {
    let store;
    if (window.currentUser) {
      const preloadedState = { session: { currentUser: window.currentUser, errors: []} };
      store = configureStore(preloadedState);
      window.store = store;
      delete window.currentUser;
    } else {
      store = configureStore();
      window.store = store;
      const root = document.getElementById('root');
  }
  ReactDOM.render(<Root store={store} />, root);
});

window.ChannelActions = ChannelActions;
window.ChannelApiUtil = ChannelApiUtil;
window.selectAllPublicChannels = selectAllPublicChannels;
