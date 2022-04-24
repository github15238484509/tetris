import { Square } from "./Square";
import SquareConfig from "./SquareConfig";
import { SquareGroup } from "./SquareGroup";
import { Point, TShape, EDirection } from "./types";



function isPoint(item: any): item is Point {
    if (typeof item.x === "undefined") {
        return false
    }
    return true
}

export class TetrisTule {
    private static canMove(shape: TShape, centerPoint: Point): boolean {
        let Newlocation: Point[] = shape.map((it, i) => {
            return {
                x: it.x + centerPoint.x,
                y: it.y + centerPoint.y
            }
        })
        return !Newlocation.some(it => {
            return (it.x < 0 ||
                it.x > SquareConfig.chessSize.width - 1 ||
                it.y < 0 ||
                it.y > SquareConfig.chessSize.height - 1)
        })
    }
    static move(tetis: SquareGroup, PointOrEDirection: Point | EDirection): boolean {
        if (isPoint(PointOrEDirection)) {

            if (this.canMove(tetis.shape, PointOrEDirection)) {
                tetis.centerPoint = PointOrEDirection
                return true
            } else {
                return false
            }
        } else {
            let newPoint = null
            if (PointOrEDirection === EDirection.left) {
                newPoint = {
                    x: tetis.centerPoint.x - 1,
                    y: tetis.centerPoint.y,
                }
            } else if (PointOrEDirection === EDirection.right) {
                newPoint = {
                    x: tetis.centerPoint.x + 1,
                    y: tetis.centerPoint.y,
                }
            } else {
                newPoint = {
                    x: tetis.centerPoint.x,
                    y: tetis.centerPoint.y + 1,
                }
            }
            return this.move(tetis, newPoint)
        }
    }
    static lineMove(tetis: SquareGroup, driection: EDirection) {
        while (this.move(tetis, driection)) {

        }
    }
    static rotate(tetis: SquareGroup) {
        let newShapePosition = tetis.afterRouter()
        if (this.canMove(newShapePosition, tetis.centerPoint)) {
            tetis.rotate()
        }
    }
}