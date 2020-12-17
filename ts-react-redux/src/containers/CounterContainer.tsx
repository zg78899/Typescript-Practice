import  React from 'react'
import Counter from '../components/Counter';
import { useSelector, useDispatch } from 'react-redux';
import {RootState} from '../modules/index';
import { increase, decrease, increaseBy } from '../modules/counter';

function CounterContainer(){
  const count = useSelector((state:RootState)=>state.counter.count);
  const dispatch = useDispatch();

  const onIncerase = ()=>dispatch(increase());
  const onDecrease = ()=>dispatch(decrease());
  const onIncreaseBy = (diff:number)=>dispatch(increaseBy(diff));

  return (
    <Counter 
    count={count}
     onInceraseBy={onIncreaseBy}
      onIncrease={onIncerase}
       onDecrease={onDecrease}
       />
  )
}
export default CounterContainer;



import React from 'react';

function CounterContainer(){
  const count = useSelector((state:RootState)=>state.counter.count);
  const dispatch = useDispatch();

  const onIncrease = ()=>{
    dispatch(increase());
  }
  const onDecrease = ()=>{
    dispatch(decrease());
  }
  const onIncreaseBy = (diff:number)=>{
    dispatch(increaseBy(diff))
  }

  return (
    <Counter
    count={count}
    onIncerase = {onIncrease}
    onDecerase={onDecrease}
    onIncreaseBy = {onIncreaseBy}
    />
  )
  
}
export default CounterContainer;
