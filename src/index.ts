import { Square } from "./core/Square"
import { IViewer, TShape } from "./core/types"
import { SquarePagesView } from "./core/views/SquarePagesView"
import $ from "jquery"
import { SquareGroup } from "./core/SquareGroup"
import { CreateGroupSquare } from "./core/Tetris"



let centerPoints = {
    x: 6,
    y: 5
}
let tetris = CreateGroupSquare(centerPoints)

tetris.squares.forEach(it => it.viewer = new SquarePagesView(it, $("#app")))

$("#down").click(() => {
    tetris.centerPoint = {
        x: tetris.centerPoint.x,
        y: tetris.centerPoint.y + 1
    }
})
$("#up").click(() => {
    tetris.centerPoint = {
        x: tetris.centerPoint.x,
        y: tetris.centerPoint.y - 1
    }
})
$("#left").click(() => {
    tetris.centerPoint = {
        x: tetris.centerPoint.x - 1,
        y: tetris.centerPoint.y
    }
})
$("#right").click(() => {
    tetris.centerPoint = {
        x: tetris.centerPoint.x + 1,
        y: tetris.centerPoint.y
    }
})
export default {}