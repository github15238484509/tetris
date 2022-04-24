import { Square } from "./core/Square"
import { IViewer, TShape, EDirection } from "./core/types"
import { SquarePagesView } from "./core/views/SquarePagesView"
import $ from "jquery"
import { SquareGroup } from "./core/SquareGroup"
import { CreateGroupSquare } from "./core/Tetris"
import { TetrisTule } from "./core/TetrisRule"



let centerPoints = {
    x: 4,
    y: 6
}
let tetris = CreateGroupSquare(centerPoints)

tetris.squares.forEach(it => it.viewer = new SquarePagesView(it, $("#app")))

$("#down").click(() => {

    // let tart = {
    //     x: tetris.centerPoint.x,
    //     y: tetris.centerPoint.y + 1
    // }

    TetrisTule.move(tetris, EDirection.down)

    // tetris.centerPoint = {
    //     x: tetris.centerPoint.x,
    //     y: tetris.centerPoint.y + 1
    // }
})
$("#up").click(() => {
    tetris.centerPoint = {
        x: tetris.centerPoint.x,
        y: tetris.centerPoint.y - 1
    }
})
$("#left").click(() => {
    TetrisTule.move(tetris, EDirection.left)
    // tetris.centerPoint = {
    //     x: tetris.centerPoint.x - 1,
    //     y: tetris.centerPoint.y
    // }
})
$("#right").click(() => {
    TetrisTule.move(tetris, EDirection.right)
    // tetris.centerPoint = {
    //     x: tetris.centerPoint.x + 1,
    //     y: tetris.centerPoint.y
    // }
})
export default {}

function DEirection(tetris: SquareGroup, DEirection: any) {
    throw new Error("Function not implemented.")
}
