import { Square } from "./Square";
import { Point, TShape } from "./types";

export class SquareGroup {
    private _squares: readonly Square[] = []
    get squares() {
        return this._squares
    }

    get centerPoint() {
        return this._centerPoint
    }
    set centerPoint(value: Point) {
        this._centerPoint = value
        this._shape.forEach((it, i) => {
            this._squares[i].point = {
                x: it.x + this._centerPoint.x,
                y: it.y + this._centerPoint.y,
            }
        })
    }
    get shape(){
        return this._shape
    }
    constructor(private _shape: TShape, private _centerPoint: Point, private _color: string) {
        let arr: Square[] = []
        this._shape.forEach((it) => {
            let sq = new Square()
            sq.point = {
                x: it.x + this._centerPoint.x,
                y: it.y + this._centerPoint.y,
            }
            sq.color = this._color
            arr.push(sq)
        })
        this._squares = arr
    }
}
