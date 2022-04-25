import { Square } from "./Square";
import SquareConfig from "./GameConfig";
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
    static deleteSquares(tetis: Square[]): number {
        // 获取方块下面的那几行
        let result = tetis.map(it => it.point.y)
        let minY = Math.min(...result)
        let maxY = Math.max(...result)
        
        let num = 0;
        for (let y = minY; y <= maxY; y++) {
            if (this.deleteLine(tetis, y)) {
                num++;
            }
        }
        return num;
    }
    private static getLineSquare(tetis: Square[], index: number): Square[] {
        let result = tetis.filter(it => it.point.y === index)
        return result
    } /**
    * 消除一行
    * @param exists 
    * @param y 
    */
   private static deleteLine(exists: Square[], y: number): boolean {
       const squares = exists.filter(sq => sq.point.y === y);
       if (squares.length === SquareConfig.panelSize.width) {
           //这一行可以消除
           squares.forEach(sq => {
               //1. 从界面中移除
               if (sq.viewer) {
                   sq.viewer.remove();
               }
               //2. 从数组中移除
               const index = exists.indexOf(sq)
               exists.splice(index, 1);
           })
           //2. 剩下的，y坐标比当前的y小的方块，y+1
           exists.filter(sq => sq.point.y < y).forEach(sq => {
               sq.point = {
                   x: sq.point.x,
                   y: sq.point.y + 1
               }
           })

           return true;
       }
       return false;
   }
}