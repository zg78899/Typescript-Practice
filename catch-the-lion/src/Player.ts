import {Piece, Griff, Lion, Elephant, Chick} from './Piece';

export enum PlayerType {// 위 쪽과 아랫쪽의 플레이어
UPPER ='UPPER',
LOWER ='LOWER'
}

export class Player{
  private pieces :Piece[];
  static type: any;

  getPieces(){
    return this.pieces;
  }

  constructor(public readonly type:PlayerType){//constuctor로 생성하면서 자신의 속성을 가진다. 
    //해당 플레이어가 자신의 타입에 맞게끔 piece를 가지도록 설정
    //if비교문을 통해서 type이 PlayerType.UPPER인지 LOWER인지 구분
    if(type === PlayerType.UPPER){
      this.pieces = [
        new Griff(PlayerType.UPPER, {row:0,col:0}),
        new Lion(PlayerType.UPPER,{row:0,col:1}),
        new Elephant(PlayerType.UPPER,{row:0,col:2}),
        new Chick(PlayerType.UPPER,{row:1,col:1})
      ]
    }else{
      this.pieces = [
        new Elephant(PlayerType.LOWER, {row:3,col:0}),
        new Lion(PlayerType.LOWER,{row:3,col:1}),
        new Griff(PlayerType.LOWER,{row:3,col:2}),
        new Chick(PlayerType.LOWER,{row:2,col:1})
      ];
    }
  }
}