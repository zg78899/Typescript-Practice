import { Board, DeadZone, Cell } from './Board';
import { Player, PlayerType } from './Player';
import { Lion, Piece } from './Piece';


export class Game {
  ////게임내에서의 상태 관리
  //현재 선택된 셀
  private selectedCell: Cell;
  // 턴처리
  private turn = 0;
  //현재 진행중인 플레이어
  private currentPlayer: Player;
  //게임에 대한 정보 선택
  private gameInfoEl = document.querySelector('.alert');
  //게임의 시작과 끝
  private state: 'STARTED' | 'ENDED' = 'STARTED';//string union으로 처리하고 기본값은 STARTED로 설정


  //위쪽 플레이어와 아랫쪽 플레이어 생성
  readonly upperPlayer = new Player(PlayerType.UPPER);
  readonly lowerPlayer = new Player(PlayerType.LOWER);

  //game에 Board을 생성한다. 
  readonly board = new Board(this.upperPlayer, this.lowerPlayer);

  //game에 DeadZone을 생성한다. 
  readonly upperDeadZone = new DeadZone('upper');
  readonly lowerDeadZone = new DeadZone('lower');


  constructor() {
    //실제 Board을 board conatiainer에 넣어야한다 .
    const boardContainer = document.querySelector('.board-container');
    console.dir(boardContainer);
    boardContainer.firstChild.remove();
    boardContainer.appendChild(this.board._el);


    //게임의 시작은 무조건 upperPlayer가 시작하는 것으로 정의
    this.currentPlayer = this.upperPlayer;
    //board에 말들을 렌더를 호출해준다.
    this.board.render();
    //진행 중인 게임에 대한 정보를 표시하는 함수
    this.renderInfo();

    //board에 이벤트 바인딩
    this.board._el.addEventListener('click', (e) => {
      if (this.state === 'ENDED') {
        return false;
      }

      if (e.target instanceof HTMLElement) {//타입 가드 e.target은 HTMLElement의  인스턴스가 된다.
        //cellElement는 화면에 그려지는 html셀 요소이다.
        //그러나 우릴가 필요한 것은 Piece타입이다. Piece타입에서 move 또는 어떤 행위를 한다 , 즉 Piece타입의 객체를 알아야한다.
        let cellEl: HTMLElement;
        console.log('cellEL', cellEl);
        if (e.target.classList.contains('cell')) {
          cellEl = e.target;
        } else if (e.target.classList.contains('piece')) {
          cellEl = e.target.parentElement;// parentElement가 cell인 것이다.
        } else {
          return false;
        }
        const cell = this.board.map.get(cellEl);
        console.log(cell);
        //현재 플레이아 piece와 + 현재 선택된 셀이 있을때 움직일수있게 해준다.
        // 현재 유저일때는 내것을 계속 선택할수 있게 해준다.
        if (this.isCurrentUserPiece(cell)) {
          //select라는 메소드를 만들어서 현재의 셀을 선택을 하게 만들어주고
          this.select(cell);
          return false;
        }

        //선택된 셀이 있을때
        if (this.selectedCell) {
          //셀을 이동시킴
          this.move(cell);
          //턴을 바꿔줌;
          this.changeTurn();
        }
      }
    });
  }

  //셀을 선택 할 때
  select(cell: Cell) {
    //셀에 가져올 말이 없으면 return 
    if (cell.getPiece() == null) {
      return;
    }
    //자신의 말일때만 선택이 되어야한다.자신의 말이 아닌 다른 말을 선택한다면 return;
    if (cell.getPiece().ownerType !== this.currentPlayer.type) {
      return;
    }
    console.log('SELECT', this.selectedCell);
    // 선택된 셀이있으면
    if (this.selectedCell) {
      // 선택된 셀을 선택 못하게 해주고 
      this.selectedCell.deactive();
      //렌더를 통해서 active된것을 없애준 다음에
      this.selectedCell.render();
    }
    //셀에 할당을 해주고
    this.selectedCell = cell;
    console.log('SELECT', this.selectedCell);
    //이 셀을 active 처리해준다.
    cell.active();
    // 그리고 렌더
    cell.render();
  }

  //현재 currentUser의 Piece을 알 수 있게 된다.
  isCurrentUserPiece(cell: Cell) {
    return cell != null && cell.getPiece() != null && cell.getPiece().ownerType === this.currentPlayer.type;
  }

  renderInfo(extraMessage?: string) {
    //누구의 턴이 고 몇번째 인지 
    this.gameInfoEl.innerHTML = `#${this.turn + 1}턴 ${this.currentPlayer.type} 차례 ${(extraMessage) ? '| ' + extraMessage : ''}`;
  }

  move(cell: Cell) {
    console.log('MOVE', this.selectedCell);
    this.selectedCell.deactive();
    const killed = this.selectedCell.getPiece().move(this.selectedCell, cell).getkilled();
    // selectedCell은 우리가 클릭한 셀로 바꾼다.
    this.selectedCell = cell;
    console.log('MOVE', this.selectedCell);

    //죽인 말이 있다면 
    if (killed) {
      if (killed.ownerType === PlayerType.UPPER) {
        this.lowerDeadZone.put(killed);
      } else {
        this.upperDeadZone.put(killed)
      }

      //만약에 죽인 말이 사자! 게임 끝 
      if (killed instanceof Lion) {
        this.state = 'ENDED';
      }
    }
  }

  changeTurn() {
    console.log('CHANGE-TURN', this.selectedCell);
    this.selectedCell.deactive();

    //선택이 된 곳에 선택이 못되게 설정
    console.log('CHANGE-TURN', this.selectedCell)
    this.selectedCell = null;

    if (this.state === 'ENDED') {
      this.renderInfo(`GAME ${this.currentPlayer.type} WIN!!`);
    } else {
      //턴을 하나 증가 시켜주고 
      this.turn += 1;
      //현재의 플레이어를 바꿔 줌;
      this.currentPlayer = (this.currentPlayer === this.lowerPlayer) ? this.upperPlayer : this.lowerPlayer;
      this.renderInfo();
    }
    //매 턴이 끝날때 마다 화면에 바뀐 turn의 positiond이 렌더 되게끔한다.
    //매 턴이 지날때 마다 화면에 다시 그려진다.
    this.board.render();
  }
}
