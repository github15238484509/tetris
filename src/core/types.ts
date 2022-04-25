import { Game } from "./Game"
import { SquareGroup } from "./SquareGroup"

export interface Point {
    readonly x: number
    readonly y: number
}
export interface IViewer {
    show: () => void
    remove: () => void
}
export interface GameViewer{
    showNext(tetris:SquareGroup):void
    switch(tetris:SquareGroup):void
    init(game:Game):void
    onPause():void
    onStart():void
    onOver():void
    onScoreChange(score:number):void
}
export type TShape = Point[]

export enum  EDirection{
    left,
    down,
    right
}
export enum GameState{
    init,
    playing,
    pause,
    over
}