import { SquareGroup } from "./SquareGroup";
import { CreateGroupSquare } from "./Tetris";
import { EDirection, GameState, GameViewer, Point } from "./types";
import { SquarePagesView } from "./views/SquarePagesView";
import GameConfig from "./GameConfig"
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
        this._views.init(this)
        this.score = 0
    }
    private _storeSquare: Square[] = []
    private _score: number = 0
    start() {
        if (this._state === GameState.playing) {
            this.pause()
            return
        }
        if (this._state === GameState.over) {
            this._overStart()
        }
        this._state = GameState.playing
        if (!this._currentSquare) {
            // 将控制权给玩家
            this.switchTetris()
        }
        this._views.onStart()
        this.autoDrop()
    }
    private autoDrop() {
        clearInterval(this._time)
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
            this._views.onPause()
        }
    }

    private hitBottom() {
        if (this._currentSquare) {
            this._storeSquare = this._storeSquare.concat(this._currentSquare?.squares)
        }
        // 看看是能够消除
        let num = TetrisTule.deleteSquares(this._storeSquare)
        this._addScore(num)
        this.switchTetris()
    }
    private _addScore(num: number) {
        this.score += num * 12
    }
    set score(value) {
        if (this._score !== value) {
            this.delay *= 0.8
            this.autoDrop()
        }
        this._score = value
        this._views.onScoreChange(this.score)


    }
    get score() {
        return this._score
    }
    private _overStart() {
        this._storeSquare.forEach(it => {
            it.viewer?.remove()
        })
        this._storeSquare = []
        this.score = 0
        this._currentSquare = undefined
    }
    private _gameOver() {
        this._nextSquare.squares.forEach((it) => {
            it.viewer?.remove()
        })
        this._state = GameState.over
        clearInterval(this._time)
        this._time = null
        this._views.onOver()
    }
    private switchTetris() {
        this._currentSquare = this._nextSquare
        this._setRightPosition(this._currentSquare, GameConfig.panelSize)

        //判断时候可以结束
        if (!TetrisTule.canMove(this._currentSquare.shape, this._currentSquare.centerPoint, this._storeSquare)) {
            this._gameOver()
            return
        }
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
        while (SquareGroup.squares.some(it => it.point.y < 0)) {
            SquareGroup.centerPoint = {
                x: SquareGroup.centerPoint.x,
                y: SquareGroup.centerPoint.y + 1
            };
        }
    }

    leftMove() {
        if (this._currentSquare && this._state === GameState.playing) {
            TetrisTule.move(this._currentSquare, EDirection.left, this._storeSquare)
        }
    }
    rightMove() {
        if (this._currentSquare && this._state === GameState.playing) {
            TetrisTule.move(this._currentSquare, EDirection.right, this._storeSquare)
        }
    }
    downlineMove() {
        if (this._currentSquare && this._state === GameState.playing) {
            if (!TetrisTule.lineMove(this._currentSquare, EDirection.down, this._storeSquare)) {
                this.hitBottom()
            }
        }
    }
    downMove() {
        if (this._currentSquare && this._state === GameState.playing) {
            if (!TetrisTule.move(this._currentSquare, EDirection.down, this._storeSquare)) {
                this.hitBottom()
            }
        }
    }
    rotate() {
        if (this._currentSquare && this._state === GameState.playing) {
            TetrisTule.rotate(this._currentSquare, this._storeSquare)
        }
    }
} 