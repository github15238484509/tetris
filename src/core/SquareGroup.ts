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
        this._setPosition()

    }
    get shape() {
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

    /**
     * 是否是顺时针旋转
     */
    protected isClock: boolean = true
    afterRouter(): TShape {
        let shapes: TShape = []
        if (this.isClock) {
            shapes = this._shape.map((it) => {
                return {
                    x: -it.y,
                    y: it.x
                }
            })
        } else {
            shapes = this._shape.map(it => {
                return {
                    x: it.y,
                    y: -it.x
                }
            })
        }
        return shapes
    }
    rotate() {
        let shapes = this.afterRouter()
        this._shape = shapes
        this._setPosition()
    }
    private _setPosition() {
        this._shape.forEach((it, i) => {
            this._squares[i].point = {
                x: it.x + this._centerPoint.x,
                y: it.y + this._centerPoint.y,
            }
        })
    }
}
