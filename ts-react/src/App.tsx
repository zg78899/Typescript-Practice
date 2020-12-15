import React from 'react';
import logo from './logo.svg';
import './App.css';
// import Greetings from './Greetings';
import Counter from './Counter';
import MyForm from './MyForm';
import ReducerSample from './ReducerSample';
import { SampleProvider } from './SampleContext';
import Greetings from './Greetings';


function App() {
  // const onClick =(name:string)=>{
  //   console.log(name);
  // }
  
  // const onSubmit = (form:{name:string,description:string})=>{
  //   console.log(form);
  // } 

 
  return (
    // <MyForm onSubmit={onSubmit}/>
    // <Counter/>
    <SampleProvider>
      <ReducerSample/>
    </SampleProvider>
  //  <Greetings name="리액트" onClick={onClick} />
  
  );
}

export default App;
