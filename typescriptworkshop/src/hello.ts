var hello ='hello';
let hell2 = 'hlllo2';


let timeout = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    resolve('1 sec')
  },1000); 
})
timeout.then(console.log);
import add from './utils.js';
const returnValue =add(1,2);
console.log(returnValue);