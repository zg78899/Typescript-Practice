import { Piece } from './Piece';
import { Player, PlayerType } from './Player';

export interface Position {
  row: number;
  col: number;
}

//말들은 각각 하나의 셀 위에 올라가게 된다. 
export class Cell {
  private currentPlayer:Player;
  //선택된 셀
  private isActive = false;
  //실제 셀을 element로 나타내준다.
  readonly _el: HTMLElement = document.createElement('div');

  constructor(
    public readonly postion: Position, // 현재의 위치를 나타냄(x,y의 좌표)
    private piece: Piece
  ) {
    //현재의 셀에 클래스이름에 cell을 더해준다.  
    this._el.classList.add('cell');
  }
  //셀은 말을 올릴 수 있다. 
  put(piece: Piece) {
    this.piece = piece;
  }
  //현재 올라가 있는 말을 가져온다. 
  getPiece() {
    return this.piece;
  }
  active() {
    this.isActive = true;
  }
  deactive() {
    this.isActive = false;
  }
  //각 각의 셀마다 렌더링 할 수 있다 
  render() {
    
    console.log(this.getPiece())
    if (this.isActive) {
      this._el.classList.add('active',`${this.getPiece().ownerType === 'UPPER' ? 'UPPER':'LOWER'}`);
    } else {
      console.log(this._el.classList)
      this._el.classList.remove('active','UPPER','LOWER');
    }
    //el요소에 시렞 말이 올라가 있으면 말의 렌더링
    this._el.innerHTML = (this.piece) ? this.piece.render() : '';
  }
}
//보드
export class Board {
  // 각 셀들
  cells: Cell[] = [];



  

  _el: HTMLElement = document.createElement('div');
  //키가 htmlelement가 되고 거기에 Cell이 들어가게된다.
  map: WeakMap<HTMLElement, Cell> = new WeakMap()//키를 객체로 줄수있다.여기서 map는 htmlElement가 되는것이다.
  // HTMLElement는 Cell은 값

  constructor(upperPlayer: Player, lowerPlayer: Player) {
    this._el.className = 'board';

    for (let row = 0; row < 4; row++) {
      const rowEl = document.createElement('div');
      rowEl.className = 'row';
      this._el.appendChild(rowEl);

      for (let col = 0; col < 3; col++) {
        const piece =
          upperPlayer.getPieces().find(({ currentPosition }) => {
            return currentPosition.col === col && currentPosition.row === row
          }) ||
          lowerPlayer.getPieces().find(({ currentPosition }) => {
            return currentPosition.col === col && currentPosition.row === row
          });

        //Cell들에 대한 생성자 함수를 호출, postion(row,col)와 piece 정의 들어가게 된다.
        const cell = new Cell({ row, col }, piece);//null이 였다가 pieces를 받는다.

        this.map.set(cell._el, cell); // 셀의 요소에 셀을 넣어준다.
        this.cells.push(cell);
        rowEl.appendChild(cell._el);
      }
    }
  }
  //Board또한 각각의 셀들에 대한 render을 해주어야한다. 그래야 셀이 그려진다. 
  render() {
    this.cells.forEach(v => v.render());
  }
}

// 죽은 말들을 모아 두는 곳
export class DeadZone {
  private cells: Cell[] = [];
  readonly deadzoneEl = document
    .getElementById(`${this.type}_deadzone`)
    .querySelector('.card-body');

  constructor(public type: 'upper' | 'lower') { //constructor에 type 유니온 타입으로 설정

    //말의 개수가 4개 이상을 둘 수 없다. 
    for (let col = 0; col < 4; col++) {
      const cell = new Cell({ col, row: 0 }, null);
      this.cells.push(cell);
      this.deadzoneEl.appendChild(cell._el);
    }
  }
  //말들이 죽으면 들어갈수 있게 
  put(piece: Piece) {
    const emptyCell = this.cells.find(v => v.getPiece() == null);
    emptyCell.put(piece);
    emptyCell.render();
  }

  render() {
    this.cells.forEach(v => v.render());
  }

}
