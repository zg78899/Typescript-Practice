var score1 =1;
let score2=2;
const defaultScore =0;
function outer(){
  if(true){
    var score=0;
  }
  for(var i =0;i<3;i++){
    setTimeout(()=>{
      console.log(i);
    },100)
  }
  console.log(score);
}
outer();