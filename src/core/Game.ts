import { SquareGroup } from "./SquareGroup";
import { CreateGroupSquare } from "./Tetris";
import { EDirection, GameState, GameViewer, Point } from "./types";
import { SquarePagesView } from "./views/SquarePagesView";
import GameConfig from "./SquareConfig"
import $ from "jquery"
import { TetrisTule } from "./TetrisRule";
import { GamePageView } from "./views/GamePageView";
import { Square } from "./Square";

export class Game {

    private _state: GameState = GameState.init
    private _nextSquare: SquareGroup = CreateGroupSquare({ x: 0, y: 0 })
    private _currentSquare?: SquareGroup
    private delay: number = GameConfig.delay
    public _time: any = null
    constructor(private _views: GamePageView) {
        this._setRightPosition(this._nextSquare, GameConfig.nextSize)
        this._views.showNext(this._nextSquare)
    }
    private storeSquare: Square[] = []
    start() {
        if (this._state === GameState.playing) {
            return
        }
        this._state = GameState.playing

        if (!this._currentSquare) {
            // 将控制权给玩家
            this.switchTetris()
        }

        this._time = setInterval(() => {
            this.downMove()
        }, this.delay)
    }

    pause() {
        if (this._state === GameState.playing) {
            this._state = GameState.pause
            if (this._time) {
                clearInterval(this._time)
                this._time = null
            }
        }
    }

    private hitBottom() {
        if (this._currentSquare) {
            this.storeSquare = this.storeSquare.concat(this._currentSquare?.squares)
        }
        this.switchTetris()
    }

    private switchTetris() {
        this._currentSquare = this._nextSquare
        this._setRightPosition(this._currentSquare, GameConfig.panelSize)

        //清空另一个区域的内容
        this._nextSquare.squares.forEach((it) => {
            it.viewer?.remove()
        })

        this._nextSquare = CreateGroupSquare({ x: 0, y: 0 })
        this._setRightPosition(this._nextSquare, GameConfig.nextSize)

        this._views.showNext(this._nextSquare)
        this._views.switch(this._currentSquare)

    }

    private _setRightPosition(SquareGroup: SquareGroup, config: {
        width: number,
        height: number
    }) {
        let postion: Point = {
            x: Math.floor(
                config.width / 2
            ),
            y: 0
        }
        SquareGroup.centerPoint = postion
        while (!TetrisTule.canMove(SquareGroup.shape, postion, this.storeSquare)) {
            postion = {
                x: postion.x,
                y: postion.y + 1
            }
            SquareGroup.centerPoint = postion
        }
    }

    leftMove() {
        if (this._currentSquare && this._state === GameState.playing) {
            TetrisTule.move(this._currentSquare, EDirection.left, this.storeSquare)
        }
    }
    rightMove() {
        if (this._currentSquare && this._state === GameState.playing) {
            TetrisTule.move(this._currentSquare, EDirection.right, this.storeSquare)
        }
    }
    downlineMove() {
        if (this._currentSquare && this._state === GameState.playing) {
            if (!TetrisTule.lineMove(this._currentSquare, EDirection.down, this.storeSquare)) {
                this.hitBottom()
            }
        }
    }
    downMove() {
        if (this._currentSquare && this._state === GameState.playing) {
            if (!TetrisTule.move(this._currentSquare, EDirection.down, this.storeSquare)) {
                this.hitBottom()
            }
        }
    }
    rotate() {
        if (this._currentSquare && this._state === GameState.playing) {
            TetrisTule.rotate(this._currentSquare, this.storeSquare)
        }
    }
} 