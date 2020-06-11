import { Cell ,Position} from "./Board";
import { PlayerType } from "./Player";
import loinImage from './images/lion.png';
import chickenImage from './images/chicken.png';
import griffImage from './images/griff.png';
import elophantImage from './images/elophant.png';


export class MoveResult{
  constructor(private killedPiece : Piece){}
  getkilled(){
    //있으면 killedPiece가 반환 없으면 null반환
    return this.killedPiece;
  }
}

//게임을 말을 의미함
export interface Piece {
  //말의 주인이 누구인지 판단
  ownerType:PlayerType;
  //말의 현재 위치
  currentPosition:Position;
  //말 한 셀에서 다른 셀로 이동(메서드)
  //to에 해당하는 말에 다른 말이 올라오면 이전의 말은 죽은것
  move(from: Cell, to: Cell):MoveResult;
  render(): string;
}

abstract class DefaultPiece implements Piece{
  
  constructor(
    public readonly ownerType:PlayerType,
    public currentPosition:Position
  ){}
  //움직임에 대한 메소드 정의(공통적인 움직에 대한 로직만을 정의)- 모든 하위 타입이 재사용을 함
  move(from: Cell, to: Cell): MoveResult {
    if(!this.canMove(to.postion)){
      throw new Error('cannot move!');
    }

    //moveResult을 생성해줌 MoveResult안에는 getPiece을 받는다.
    //만약에 우리가 이동하는 곳인 to에 Piece가 있으면 걔(getPiece)를 준다. 곧 그 Piece는 죽은거다. null이면 죽인게 없다.
    const moveResult = new MoveResult((to.getPiece() !== null) ? to.getPiece() :null);
     //현재의cell에서 다른 cell로 this자신을 옮겨주고
    to.put(this);
    //이전 cell에서 자신을 지운다.
    from.put(null);
    //그리고 움직인 곳의 좌표자 현재의 위치가 되게 만들어준다.
    this.currentPosition = to.postion;
    return moveResult;
  }
  //하위 타입에서 positon을 받아서 각각의 움직임을 구현해준다.
  abstract canMove(postion:Position):boolean;
  //닭 호라이 코끼리 등의 렌더는 모두 다르므로 abstract 추상메소드를 사용하여 하위의 타입에서 구현하도록 강제한다. 
  abstract render();
}


// 사자 말 모두 DefaultPpiece를 상속하고 있다.
export class Lion extends DefaultPiece{
  //각각의 canMove을 통해 특정 방향 어디로 움직일수있는지
  //사자는 상하 좌우 
  canMove(pos:Position){
    const canMove = (pos.row === this.currentPosition.row +1 && pos.col === this.currentPosition.col)
    ||(pos.row === this.currentPosition.row -1 && pos.col === this.currentPosition.col)
    ||(pos.col === this.currentPosition.col +1 && pos.row === this.currentPosition.row)
    ||(pos.col === this.currentPosition.col -1 && pos.row === this.currentPosition.row)
    ||(pos.row === this.currentPosition.row +1 && pos.col === this.currentPosition.col +1)
    ||(pos.row === this.currentPosition.row +1 && pos.col === this.currentPosition.col -1)
    ||(pos.row === this.currentPosition.row -1 && pos.col === this.currentPosition.col +1)
    ||(pos.row === this.currentPosition.row -1 && pos.col === this.currentPosition.col -1);
  return canMove;
  }
  render():string{
    return `<img class ='piece ${this.ownerType}' src=${loinImage} width="90%" height="90%"/>`;
  }
}
//코끼리 말
export class Elephant extends DefaultPiece{
  // 대각선 이동가능
  canMove(pos:Position){
    return (pos.row === this.currentPosition.row+1 && pos.col ===this.currentPosition.col +1)
    ||(pos.row === this.currentPosition.row +1 && pos.col === this.currentPosition.col -1)
    ||(pos.row === this.currentPosition.row -1 && pos.col === this.currentPosition.col +1)
    ||(pos.row === this.currentPosition.row -1 && pos.col === this.currentPosition.col -1);
  }
  render():string{
    return `<img class="piece ${this.ownerType}" src=${elophantImage} width="90%" height="90%"/>`
  }
}

//기린 말
export class Griff extends DefaultPiece {
  canMove(pos: Position) {
    return (pos.row === this.currentPosition.row + 1 && pos.col === this.currentPosition.col)
      || (pos.row === this.currentPosition.row - 1 && pos.col === this.currentPosition.col)
      || (pos.col === this.currentPosition.col + 1 && pos.row === this.currentPosition.row)
      || (pos.col === this.currentPosition.col - 1 && pos.row === this.currentPosition.row);
  }

  render(): string {
    return `<img class="piece ${this.ownerType}" src="${griffImage}" width="90%" height="90%"/>`;
  }
}

//닭 말
export class Chick extends DefaultPiece{
  // 앞으로만 이동가능
  canMove(pos:Position){
    //UPPER는 위로 가로 LOWER는 내려가게 설정
    return this.currentPosition.row + ((this.ownerType === PlayerType.UPPER) ? +1 : -1) === pos.row;
  }
  render():string{
    return `<img class="piece ${this.ownerType}" src =${chickenImage} width="90%" height="90%"/>`
  }
}

