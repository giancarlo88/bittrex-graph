import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const awsCredentials = new AWS.CognitoIdentityCredentials({ //eslint-disable-line no-undef
  IdentityPoolId: 'eu-west-2:d852c1fc-bd19-4ce3-b8c1-1dbc837fc144'
})

AWS.config.credentials = awsCredentials  //eslint-disable-line no-undef
AWS.config.region = 'eu-west-2' //eslint-disable-line no-undef

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
