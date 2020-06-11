import { Piece } from './Piece';
import { Player } from './Player';

export interface Position {
  row: number;
  col: number;
}

export class Cell {
  private isActive = false;
  readonly _el: HTMLElement = document.createElement('div');

  constructor(
    public readonly postion: Position, // 현재의 위치를 나타냄
    private piece: Piece
  ) { 
    this._el.classList.add('cell');
  }
  put(piece: Piece) {
    this.piece = piece;
  }
  getPiece() {
    return this.piece;
  }
  active() {
    this.isActive = true;
  }
  deactive() {
    this.isActive = false;
  }
  render() {
    if (this.isActive) {
      this._el.classList.add('active');
    } else {
      this._el.classList.remove('active');
    }
    this._el.innerHTML = (this.piece) ? this.piece.render() : '';
  }
}

export class Board {
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

        const cell = new Cell({ row, col }, piece);//null이 였다가 pieces를 받는다.

        this.map.set(cell._el, cell); // 셀의 요소에 셀을 넣어준다.
        this.cells.push(cell);
        rowEl.appendChild(cell._el);
      }
    }
  }
  render() {
    this.cells.forEach(v => v.render());
  }
}

export class DeadZone {
  private cells: Cell[] = [];
  readonly deadzoneEl = document
    .getElementById(`${this.type}_deadzone`)
    .querySelector('.card-body');

  constructor(public type: 'upper' | 'lower') {

    for (let col = 0; col < 4; col++) {
      const cell = new Cell({ col, row: 0 }, null);
      this.cells.push(cell);
      this.deadzoneEl.appendChild(cell._el);
    }
  }
  put(piece: Piece) {
    const emptyCell = this.cells.find(v => v.getPiece() == null);
    emptyCell.put(piece);
    emptyCell.render();
  }
  render() {
    this.cells.forEach(v => v.render());
  }
}