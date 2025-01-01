import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProviderWrapper } from './graphql/server/ApolloClient';
import { BrowserRouter } from 'react-router-dom';

//importar o store e o provider do redux;
import {Provider} from 'react-redux';
import {store} from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

<ApolloProviderWrapper>
  <Provider store={store}>    
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
</ApolloProviderWrapper>

);

reportWebVitals();
