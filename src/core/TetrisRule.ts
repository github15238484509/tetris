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
    static canMove(shape: TShape, centerPoint: Point, storeSquare: Square[]): boolean {
        let Newlocation: Point[] = shape.map((it, i) => {
            return {
                x: it.x + centerPoint.x,
                y: it.y + centerPoint.y
            }
        })
        let result = Newlocation.some(it => {
            return (it.x < 0 ||
                it.x > SquareConfig.panelSize.width - 1 ||
                it.y < 0 ||
                it.y > SquareConfig.panelSize.height - 1)
        })

        if (result) {
            return false
        }

        result = storeSquare.some((one) => {
            return Newlocation.some((tow) => {
                return tow.x === one.point.x && tow.y === one.point.y
            })
        })
        if (result) {
            return false
        }

        return true
    }
    static move(tetis: SquareGroup, PointOrEDirection: Point | EDirection, storeSquare: Square[]): boolean {
        if (isPoint(PointOrEDirection)) {

            if (this.canMove(tetis.shape, PointOrEDirection, storeSquare)) {
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
            return this.move(tetis, newPoint, storeSquare)
        }
    }
    static lineMove(tetis: SquareGroup, driection: EDirection, storeSquare: Square[]) {
        while (this.move(tetis, driection, storeSquare)) {
        }
        return true
    }
    static rotate(tetis: SquareGroup, storeSquare: Square[]) {
        let newShapePosition = tetis.afterRouter()
        if (this.canMove(newShapePosition, tetis.centerPoint, storeSquare)) {
            tetis.rotate()
        }
    }
}