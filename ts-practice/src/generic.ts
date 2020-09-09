//generics을 사용하면 실제 파라미터에 넣는 타입이 유추가 된다.
function merge<T1,T2>(a: T1, b: T2) {
  return {
    ...a,
    ...b
  }
}
const merged = merge({foo:1},{bar:2,foobar:3});

function wrap<T>(param:T){
  return {
    param
  };
}
//타입을 any을 사용하는 것과 비슷하지만 타입이 값에 따라 달라지는 차이가 있다.
const wrapped = wrap('aa');//generics을 사용하면 파라미터에 어떠한 값도 넣어서 사용할 수 있게 된다.
wrapped.param //string


interface Items<T>{
  list:T[]
};
const items:Items<string>={
  list:['a','b','c']
}
//type-aliase 사용하는 방법
type Items<T,V> = {
  list:T[],
  value:V
};
const items:Items<number,string> = {
  list:[1,2,3,4],
  value:'hey kim hihi'
};

//class에서 generic을 사용
class Queue <T>{
  list:T[] = [];
  get length(){
    return this.list.length;
  }

  enQueue(item:T){
    this.list.push(item);
  }
  deQueue(){
    return this.list.shift();
  }
}

const queue = new Queue<number>();
queue.enQueue(0);
queue.enQueue(1);
queue.enQueue(2);
queue.enQueue(3);
queue.enQueue(4);

while(queue.length >0){
  console.log(queue.deQueue());
}
