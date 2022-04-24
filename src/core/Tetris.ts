import { SquareGroup } from "./SquareGroup";
import { TShape, Point } from "./types"
import { getRandom } from "./utils";

let TTShape: TShape = [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }];
let LShape: TShape = [{ x: -2, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }];
let LMirrorShape: TShape = [{ x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }];
let SShape: TShape = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }];
let SMirrorShape: TShape = [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }];
let SquareShape: TShape = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }];
let LineShape: TShape = [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }];
let UShape: TShape = [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: -1, y: -1 }, { x: 1, y: -1 }];

const shapes: TShape[] = [
    LShape,
    TTShape,
    LMirrorShape,
    SMirrorShape,
    SShape,
    SquareShape,
    LineShape,
    UShape,
]
const cloors: string[] = [
    "red",
    "green",
    'gray',
    "yellow",
    "blue",
    '#abcdef'
]
export function CreateGroupSquare(centerPoint: Point) {
    let index = getRandom(0, shapes.length)
    let shape = shapes[index]
    index = getRandom(0, cloors.length)
    let color = cloors[index]
    return new SquareGroup(shape, centerPoint, color)
}
export { }