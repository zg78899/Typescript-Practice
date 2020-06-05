interface Tv{
  //하나의 타입을 설정한다.
  //행위한다는 것을 기술만을 한다 
  trunOn():boolean; //타입이 boolean이면 반드시 return 값을 boolean으로 나타내주어야한다.
  trunOff():void; // 타입을 아무것도 설정을 안해주면 void타입이다
}
//interface는 실제로 구현체 바디가 없다.

const myTv :Tv ={  
trunOn(){ 
  return true; 
},
trunOff(){
 
} 
}

function tryTurnOn(tv:Tv){
  tv.trunOn();
} 
tryTurnOn(myTv); 

interface SignUp{
  email:string;
  id:string;
  password:string;
};

function ajaxSignUp(data:SignUp){
}
ajaxSignUp({
  email
})


interface Cell{
  row:number;
  col:number;
  piece?:Piece;
  //piece?:Piece; piece는 optional (?)사용 선택 사항이다 
}  



interface Piece{
  move(from:Cell,to:Cell):boolean;
} 

function createBoard (){ 
  const cells :Cell[] =[];
  for(let row =0;row<4;row++){ 
    for(let col=0;col<3;col++){
      cells.push({
        row,
        col
      })
    }
  }
  return cells;
}

const board =createBoard();
 board[0].piece ={
   move(from:Cell,to:Cell){
     return true;
   }
 }