import React from 'react';

type CounterProps = {
  count: number,
  onIncrease: () => void;
  onDecrease: () => void;
  onInceraseBy: (diff: number) => void
};

function Counter({ onIncrease, onInceraseBy, onDecrease, count }: CounterProps) {
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
      <button onClick={() => onInceraseBy(5)}>+5</button>
    </div>
  )
}
export default Counter;