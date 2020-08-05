import React from 'react';
// import logo from './logo.svg';
import './App.css';
import TodoApp from './containers/TodoApp';
import CounterContainer from './containers/CounterContainer';
import GithubProfileLoader from './containers/GithubProfileLoader';


function App() {
  return (
    <div>
       {/* <CounterContainer/> */}
       {/* <TodoApp/> */}
       <GithubProfileLoader/>
    </div>
     
  );
}

export default App;
