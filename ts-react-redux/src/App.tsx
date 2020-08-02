import React from 'react';
// import logo from './logo.svg';
import './App.css';
import TodoApp from './containers/TodoApp';
import CounterContainer from './containers/CounterContainer';


function App() {
  return (
    <div>
       <CounterContainer/>
       <TodoApp/>
    </div>
     
  );
}

export default App;
