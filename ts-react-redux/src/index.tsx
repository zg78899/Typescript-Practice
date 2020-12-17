import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import rootReducer,{rootSaga} from './modules/index';
import Thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga';

//1. {Provider} from 'react-redux'
//2 {createStore} from 'redux'
//3. const store = createStore(rootReducer);
//4.App 컴포넌트 Provider로 감싸준다. 그 후 store = {store} 넣어줌


const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer,applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
);




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
