import React from 'react';
import App from './app/index';

export default class extends React.Component {
  state = {
    isReady: false
  };

  render() {
    return <App />;
  }
}
