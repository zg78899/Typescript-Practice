// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/Board.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeadZone = exports.Board = exports.Cell = void 0; //말들은 각각 하나의 셀 위에 올라가게 된다. 

var Cell =
/** @class */
function () {
  function Cell(postion, // 현재의 위치를 나타냄(x,y의 좌표)
  piece) {
    this.postion = postion;
    this.piece = piece; //선택된 셀

    this.isActive = false; //실제 셀을 element로 나타내준다.

    this._el = document.createElement('div'); //현재의 셀에 클래스이름에 cell을 더해준다.  

    this._el.classList.add('cell');
  } //셀은 말을 올릴 수 있다. 


  Cell.prototype.put = function (piece) {
    this.piece = piece;
  }; //현재 올라가 있는 말을 가져온다. 


  Cell.prototype.getPiece = function () {
    return this.piece;
  };

  Cell.prototype.active = function () {
    this.isActive = true;
  };

  Cell.prototype.deactive = function () {
    this.isActive = false;
  }; //각 각의 셀마다 렌더링 할 수 있다 


  Cell.prototype.render = function () {
    console.log(this.getPiece());

    if (this.isActive) {
      this._el.classList.add('active', "" + (this.getPiece().ownerType === 'UPPER' ? 'UPPER' : 'LOWER'));
    } else {
      console.log(this._el.classList);

      this._el.classList.remove('active', 'UPPER', 'LOWER');
    } //el요소에 시렞 말이 올라가 있으면 말의 렌더링


    this._el.innerHTML = this.piece ? this.piece.render() : '';
  };

  return Cell;
}();

exports.Cell = Cell; //보드

var Board =
/** @class */
function () {
  // HTMLElement는 Cell은 값
  function Board(upperPlayer, lowerPlayer) {
    // 각 셀들
    this.cells = [];
    this._el = document.createElement('div'); //키가 htmlelement가 되고 거기에 Cell이 들어가게된다.

    this.map = new WeakMap(); //키를 객체로 줄수있다.여기서 map는 htmlElement가 되는것이다.

    this._el.className = 'board';

    var _loop_1 = function _loop_1(row) {
      var rowEl = document.createElement('div');
      rowEl.className = 'row';

      this_1._el.appendChild(rowEl);

      var _loop_2 = function _loop_2(col) {
        var piece = upperPlayer.getPieces().find(function (_a) {
          var currentPosition = _a.currentPosition;
          return currentPosition.col === col && currentPosition.row === row;
        }) || lowerPlayer.getPieces().find(function (_a) {
          var currentPosition = _a.currentPosition;
          return currentPosition.col === col && currentPosition.row === row;
        }); //Cell들에 대한 생성자 함수를 호출, postion(row,col)와 piece 정의 들어가게 된다.

        var cell = new Cell({
          row: row,
          col: col
        }, piece); //null이 였다가 pieces를 받는다.

        this_1.map.set(cell._el, cell); // 셀의 요소에 셀을 넣어준다.

        this_1.cells.push(cell);
        rowEl.appendChild(cell._el);
      };

      for (var col = 0; col < 3; col++) {
        _loop_2(col);
      }
    };

    var this_1 = this;

    for (var row = 0; row < 4; row++) {
      _loop_1(row);
    }
  } //Board또한 각각의 셀들에 대한 render을 해주어야한다. 그래야 셀이 그려진다. 


  Board.prototype.render = function () {
    this.cells.forEach(function (v) {
      return v.render();
    });
  };

  return Board;
}();

exports.Board = Board; // 죽은 말들을 모아 두는 곳

var DeadZone =
/** @class */
function () {
  function DeadZone(type) {
    this.type = type;
    this.cells = [];
    this.deadzoneEl = document.getElementById(this.type + "_deadzone").querySelector('.card-body'); //말의 개수가 4개 이상을 둘 수 없다. 

    for (var col = 0; col < 4; col++) {
      var cell = new Cell({
        col: col,
        row: 0
      }, null);
      this.cells.push(cell);
      this.deadzoneEl.appendChild(cell._el);
    }
  } //말들이 죽으면 들어갈수 있게 


  DeadZone.prototype.put = function (piece) {
    var emptyCell = this.cells.find(function (v) {
      return v.getPiece() == null;
    });
    emptyCell.put(piece);
    emptyCell.render();
  };

  DeadZone.prototype.render = function () {
    this.cells.forEach(function (v) {
      return v.render();
    });
  };

  return DeadZone;
}();

exports.DeadZone = DeadZone;
},{}],"src/images/lion.png":[function(require,module,exports) {
module.exports = "/lion.0a55027b.png";
},{}],"src/images/chicken.png":[function(require,module,exports) {
module.exports = "/chicken.3d0d4a2d.png";
},{}],"src/images/griff.png":[function(require,module,exports) {
module.exports = "/griff.78de84a7.png";
},{}],"src/images/elophant.png":[function(require,module,exports) {
module.exports = "/elophant.66e48f21.png";
},{}],"src/Piece.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chick = exports.Griff = exports.Elephant = exports.Lion = exports.MoveResult = void 0;

var Player_1 = require("./Player");

var lion_png_1 = __importDefault(require("./images/lion.png"));

var chicken_png_1 = __importDefault(require("./images/chicken.png"));

var griff_png_1 = __importDefault(require("./images/griff.png"));

var elophant_png_1 = __importDefault(require("./images/elophant.png")); //말을 움직였을때의 결과는 특정말을 죽이거나 안죽이거나
//타입을 클래스로 정의함


var MoveResult =
/** @class */
function () {
  function MoveResult(killedPiece) {
    this.killedPiece = killedPiece;
  } //죽인 말들을 가져올수 있게 getter로 메서드를 지정


  MoveResult.prototype.getkilled = function () {
    //있으면 killedPiece가 반환 없으면 null반환
    return this.killedPiece;
  };

  return MoveResult;
}();

exports.MoveResult = MoveResult; //추상클래스를 통해 구현

var DefaultPiece =
/** @class */
function () {
  function DefaultPiece(ownerType, currentPosition) {
    this.ownerType = ownerType;
    this.currentPosition = currentPosition;
  } //움직임에 대한 메소드 정의(공통적인 움직에 대한 로직만을 정의)- 모든 하위 타입이 재사용을 함


  DefaultPiece.prototype.move = function (from, to) {
    if (!this.canMove(to.postion)) {
      throw new Error('cannot move!');
    } //moveResult을 생성해줌 MoveResult안에는 getPiece을 받는다.
    //만약에 우리가 이동하는 곳인 to에 Piece가 있으면 걔(getPiece)를 준다. 곧 그 Piece는 죽은거다. null이면 죽인게 없다.


    var moveResult = new MoveResult(to.getPiece() !== null ? to.getPiece() : null); //현재의cell에서 다른 cell로 this자신을 옮겨주고

    to.put(this); //이전 cell에서 자신을 지운다.

    from.put(null); //그리고 움직인 곳의 좌표자 현재의 위치가 되게 만들어준다.

    this.currentPosition = to.postion;
    return moveResult;
  };

  return DefaultPiece;
}(); // 사자 말 모두 DefaultPpiece를 상속하고 있다.


var Lion =
/** @class */
function (_super) {
  __extends(Lion, _super);

  function Lion() {
    return _super !== null && _super.apply(this, arguments) || this;
  } //각각의 canMove을 통해 특정 방향 어디로 움직일수있는지
  //사자는 상하 좌우 


  Lion.prototype.canMove = function (pos) {
    var canMove = pos.row === this.currentPosition.row + 1 && pos.col === this.currentPosition.col || pos.row === this.currentPosition.row - 1 && pos.col === this.currentPosition.col || pos.col === this.currentPosition.col + 1 && pos.row === this.currentPosition.row || pos.col === this.currentPosition.col - 1 && pos.row === this.currentPosition.row || pos.row === this.currentPosition.row + 1 && pos.col === this.currentPosition.col + 1 || pos.row === this.currentPosition.row + 1 && pos.col === this.currentPosition.col - 1 || pos.row === this.currentPosition.row - 1 && pos.col === this.currentPosition.col + 1 || pos.row === this.currentPosition.row - 1 && pos.col === this.currentPosition.col - 1;
    return canMove;
  };

  Lion.prototype.render = function () {
    return "<img class ='piece " + this.ownerType + "' src=" + lion_png_1.default + " width=\"90%\" height=\"90%\"/>";
  };

  return Lion;
}(DefaultPiece);

exports.Lion = Lion; //코끼리 말

var Elephant =
/** @class */
function (_super) {
  __extends(Elephant, _super);

  function Elephant() {
    return _super !== null && _super.apply(this, arguments) || this;
  } // 대각선 이동가능


  Elephant.prototype.canMove = function (pos) {
    return pos.row === this.currentPosition.row + 1 && pos.col === this.currentPosition.col + 1 || pos.row === this.currentPosition.row + 1 && pos.col === this.currentPosition.col - 1 || pos.row === this.currentPosition.row - 1 && pos.col === this.currentPosition.col + 1 || pos.row === this.currentPosition.row - 1 && pos.col === this.currentPosition.col - 1;
  };

  Elephant.prototype.render = function () {
    return "<img class=\"piece " + this.ownerType + "\" src=" + elophant_png_1.default + " width=\"90%\" height=\"90%\"/>";
  };

  return Elephant;
}(DefaultPiece);

exports.Elephant = Elephant; //기린 말

var Griff =
/** @class */
function (_super) {
  __extends(Griff, _super);

  function Griff() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Griff.prototype.canMove = function (pos) {
    return pos.row === this.currentPosition.row + 1 && pos.col === this.currentPosition.col || pos.row === this.currentPosition.row - 1 && pos.col === this.currentPosition.col || pos.col === this.currentPosition.col + 1 && pos.row === this.currentPosition.row || pos.col === this.currentPosition.col - 1 && pos.row === this.currentPosition.row;
  };

  Griff.prototype.render = function () {
    return "<img class=\"piece " + this.ownerType + "\" src=\"" + griff_png_1.default + "\" width=\"90%\" height=\"90%\"/>";
  };

  return Griff;
}(DefaultPiece);

exports.Griff = Griff; //닭 말

var Chick =
/** @class */
function (_super) {
  __extends(Chick, _super);

  function Chick() {
    return _super !== null && _super.apply(this, arguments) || this;
  } // 앞으로만 이동가능


  Chick.prototype.canMove = function (pos) {
    //UPPER는 위로 가로 LOWER는 내려가게 설정
    return this.currentPosition.row + (this.ownerType === Player_1.PlayerType.UPPER ? +1 : -1) === pos.row;
  };

  Chick.prototype.render = function () {
    return "<img class=\"piece " + this.ownerType + "\" src =" + chicken_png_1.default + " width=\"90%\" height=\"90%\"/>";
  };

  return Chick;
}(DefaultPiece);

exports.Chick = Chick;
},{"./Player":"src/Player.ts","./images/lion.png":"src/images/lion.png","./images/chicken.png":"src/images/chicken.png","./images/griff.png":"src/images/griff.png","./images/elophant.png":"src/images/elophant.png"}],"src/Player.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = exports.PlayerType = void 0;

var Piece_1 = require("./Piece");

var PlayerType;

(function (PlayerType) {
  PlayerType["UPPER"] = "UPPER";
  PlayerType["LOWER"] = "LOWER";
})(PlayerType = exports.PlayerType || (exports.PlayerType = {}));

var Player =
/** @class */
function () {
  //Player가 생성될때 player의 종류를 전달 받는다. 
  //실제 속성으로 가지게 하기 위해서 
  function Player(type) {
    this.type = type; //해당 플레이어가 자신의 타입에 맞게끔 piece를 가지도록 설정
    //if비교문을 통해서 type이 PlayerType.UPPER인지 LOWER인지 구분

    if (type == PlayerType.UPPER) {
      this.pieces = [new Piece_1.Griff(PlayerType.UPPER, {
        row: 0,
        col: 0
      }), new Piece_1.Lion(PlayerType.UPPER, {
        row: 0,
        col: 1
      }), new Piece_1.Elephant(PlayerType.UPPER, {
        row: 0,
        col: 2
      }), new Piece_1.Chick(PlayerType.UPPER, {
        row: 1,
        col: 1
      })];
    } else {
      this.pieces = [new Piece_1.Elephant(PlayerType.LOWER, {
        row: 3,
        col: 0
      }), new Piece_1.Lion(PlayerType.LOWER, {
        row: 3,
        col: 1
      }), new Piece_1.Griff(PlayerType.LOWER, {
        row: 3,
        col: 2
      }), new Piece_1.Chick(PlayerType.LOWER, {
        row: 2,
        col: 1
      })];
    }
  }

  Player.prototype.getPieces = function () {
    return this.pieces;
  };

  return Player;
}();

exports.Player = Player;
},{"./Piece":"src/Piece.ts"}],"src/Game.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = void 0;

var Board_1 = require("./Board");

var Player_1 = require("./Player");

var Piece_1 = require("./Piece");

var Game =
/** @class */
function () {
  function Game() {
    var _this = this; // 턴처리


    this.turn = 0; //게임에 대한 정보 선택

    this.gameInfoEl = document.querySelector('.alert'); //게임의 시작과 끝

    this.state = 'STARTED'; //string union으로 처리하고 기본값은 STARTED로 설정
    //위쪽 플레이어와 아랫쪽 플레이어 생성

    this.upperPlayer = new Player_1.Player(Player_1.PlayerType.UPPER);
    this.lowerPlayer = new Player_1.Player(Player_1.PlayerType.LOWER); //game에 Board을 생성한다. 

    this.board = new Board_1.Board(this.upperPlayer, this.lowerPlayer); //game에 DeadZone을 생성한다. 

    this.upperDeadZone = new Board_1.DeadZone('upper');
    this.lowerDeadZone = new Board_1.DeadZone('lower'); //실제 Board을 board conatiainer에 넣어야한다 .

    var boardContainer = document.querySelector('.board-container');
    console.dir(boardContainer);
    boardContainer.firstChild.remove();
    boardContainer.appendChild(this.board._el); //게임의 시작은 무조건 upperPlayer가 시작하는 것으로 정의

    this.currentPlayer = this.upperPlayer; //board에 말들을 렌더를 호출해준다.

    this.board.render(); //진행 중인 게임에 대한 정보를 표시하는 함수

    this.renderInfo(); //board에 이벤트 바인딩

    this.board._el.addEventListener('click', function (e) {
      if (_this.state === 'ENDED') {
        return false;
      }

      if (e.target instanceof HTMLElement) {
        //타입 가드 e.target은 HTMLElement의  인스턴스가 된다.
        //cellElement는 화면에 그려지는 html셀 요소이다.
        //그러나 우릴가 필요한 것은 Piece타입이다. Piece타입에서 move 또는 어떤 행위를 한다 , 즉 Piece타입의 객체를 알아야한다.
        var cellEl = void 0;
        console.log(cellEl);

        if (e.target.classList.contains('cell')) {
          cellEl = e.target;
        } else if (e.target.classList.contains('piece')) {
          cellEl = e.target.parentElement; // parentElement가 cell인 것이다.
        } else {
          return false;
        }

        var cell = _this.board.map.get(cellEl);

        console.log(cell); //현재 플레이아 piece와 + 현재 선택된 셀이 있을때 움직일수있게 해준다.
        // 현재 유저일때는 내것을 계속 선택할수 있게 해준다.

        if (_this.isCurrentUserPiece(cell)) {
          //select라는 메소드를 만들어서 현재의 셀을 선택을 하게 만들어주고
          _this.select(cell);

          return false;
        } //선택된 셀이 있을때


        if (_this.selectedCell) {
          //셀을 이동시킴
          _this.move(cell); //턴을 바꿔줌;


          _this.changeTurn();
        }
      }
    });
  } //셀을 선택 할 때


  Game.prototype.select = function (cell) {
    //셀에 가져올 말이 없으면 return 
    if (cell.getPiece() == null) {
      return;
    } //자신의 말일때만 선택이 되어야한다.자신의 말이 아닌 다른 말을 선택한다면 return;


    if (cell.getPiece().ownerType !== this.currentPlayer.type) {
      return;
    } // 선택된 셀이있으면


    if (this.selectedCell) {
      // 선택된 셀을 선택 못하게 해주고 
      this.selectedCell.deactive(); //렌더를 통해서 active된것을 없애준 다음에

      this.selectedCell.render();
    } //셀에 할당을 해주고


    this.selectedCell = cell; //이 셀을 active 처리해준다.

    cell.active(); // 그리고 렌더

    cell.render();
  }; //현재 currentUser의 Piece을 알 수 있게 된다.


  Game.prototype.isCurrentUserPiece = function (cell) {
    return cell != null && cell.getPiece() != null && cell.getPiece().ownerType === this.currentPlayer.type;
  };

  Game.prototype.renderInfo = function (extraMessage) {
    //누구의 턴이 고 몇번째 인지 
    this.gameInfoEl.innerHTML = "#" + (this.turn + 1) + "\uD134 " + this.currentPlayer.type + " \uCC28\uB840 " + (extraMessage ? '| ' + extraMessage : '');
  };

  Game.prototype.move = function (cell) {
    this.selectedCell.deactive();
    var killed = this.selectedCell.getPiece().move(this.selectedCell, cell).getkilled(); // selectedCell은 우리가 클릭한 셀로 바꾼다.

    this.selectedCell = cell; //죽인 말이 있다면 

    if (killed) {
      if (killed.ownerType === Player_1.PlayerType.UPPER) {
        this.lowerDeadZone.put(killed);
      } else {
        this.upperDeadZone.put(killed);
      } //만약에 죽인 말이 사자! 게임 끝 


      if (killed instanceof Piece_1.Lion) {
        this.state = 'ENDED';
      }
    }
  };

  Game.prototype.changeTurn = function () {
    this.selectedCell.deactive(); //선택이 된 곳에 선택이 못되게 설정

    this.selectedCell = null;

    if (this.state === 'ENDED') {
      this.renderInfo("GAME " + this.currentPlayer.type + " WIN!!");
    } else {
      //턴을 하나 증가 시켜주고 
      this.turn += 1; //현재의 플레이어를 바꿔 줌;

      this.currentPlayer = this.currentPlayer === this.lowerPlayer ? this.upperPlayer : this.lowerPlayer;
      this.renderInfo();
    } //매 턴이 끝날때 마다 화면에 바뀐 turn의 positiond이 렌더 되게끔한다.
    //매 턴이 지날때 마다 화면에 다시 그려진다.


    this.board.render();
  };

  return Game;
}();

exports.Game = Game;
},{"./Board":"src/Board.ts","./Player":"src/Player.ts","./Piece":"src/Piece.ts"}],"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"node_modules/bootstrap/dist/css/bootstrap.css":[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/styles/style.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Game_1 = require("./Game");

require("bootstrap/dist/css/bootstrap");

require("./styles/style.css");

new Game_1.Game();
},{"./Game":"src/Game.ts","bootstrap/dist/css/bootstrap":"node_modules/bootstrap/dist/css/bootstrap.css","./styles/style.css":"src/styles/style.css"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62885" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map