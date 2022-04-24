export interface Point {
    readonly x: number
    readonly y: number
}
export interface IViewer {
    show: () => void
    remove: () => void
}

export type TShape = Point[]

export enum  EDirection{
    left,
    down,
    right
}
