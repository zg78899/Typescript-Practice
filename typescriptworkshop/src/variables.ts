var score1 =1;
let score2=2;
const defaultScore =0;
function outer(){
  if(true){
    let score :number;
    // const score =100;
    //const는 선언과 동시에 값을 할당을 해주어야한다
    score=30;
    // score="30";
  
  }
  for(let i =0;i<3;i++){
    setTimeout(()=>{
      console.log(i);
    },100)
  }
  console.log(score);
}
outer();