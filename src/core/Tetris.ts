import { SquareGroup } from "./SquareGroup";
import { TShape, Point } from "./types"
import { getRandom } from "./utils";

// let TTShape: TShape = [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }];


export class TTShape extends SquareGroup {
    constructor(_centerPoint: Point, _color: string) {
        super([{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }], _centerPoint, _color)
    }
}
export class LShape extends SquareGroup {
    constructor(_centerPoint: Point, _color: string) {
        super([{ x: -2, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }], _centerPoint, _color)
    }
}
export class LMirrorShape extends SquareGroup {
    constructor(_centerPoint: Point, _color: string) {
        super([{ x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }], _centerPoint, _color)
    }
}
export class SShape extends SquareGroup {
    constructor(_centerPoint: Point, _color: string) {
        super([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }], _centerPoint, _color)
    }

    rotate(): void {
        super.rotate()
        this.isClock = !this.isClock
    }
}
export class SMirrorShape extends SquareGroup {
    constructor(_centerPoint: Point, _color: string) {
        super([{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }], _centerPoint, _color)
    }
    rotate(): void {
        super.rotate()
        this.isClock = !this.isClock
    }
}
export class SquareShape extends SquareGroup {
    constructor(_centerPoint: Point, _color: string) {
        super([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }], _centerPoint, _color)
    }
    rotate() {

    }
}
export class LineShape extends SquareGroup {
    constructor(_centerPoint: Point, _color: string) {
        super([{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }], _centerPoint, _color)
    }
    rotate(): void {
        super.rotate()
        this.isClock = !this.isClock
    }
}
export class UShape extends SquareGroup {
    constructor(_centerPoint: Point, _color: string) {
        super([{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }], _centerPoint, _color)
    }
}

const shapes = [
    TTShape,
    LShape,
    LMirrorShape,
    SShape,
    SMirrorShape,
    SquareShape,
    LineShape,
    UShape
]
const cloors: string[] = [
    "red",
    "green",
    'gray',
    "yellow",
    "blue",
    '#abcdef'
]
export function CreateGroupSquare(centerPoint: Point): SquareGroup {
    let index = getRandom(0, shapes.length)
    let shape = shapes[index]
    index = getRandom(0, cloors.length)
    let color = cloors[index]
    return new shape(centerPoint, color)
}
export { }