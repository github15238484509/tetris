import { Square } from "./core/Square"
import { IViewer, TShape, EDirection } from "./core/types"
import { SquarePagesView } from "./core/views/SquarePagesView"
import $ from "jquery"
import { SquareGroup } from "./core/SquareGroup"
import { CreateGroupSquare } from "./core/Tetris"
import { TetrisTule } from "./core/TetrisRule"
import { Game } from "./core/Game"
import { GamePageView } from "./core/views/GamePageView"

let g = new Game(new GamePageView())
$("#start").click(() => {
    g.start()

})
$("#pause").click(() => {
    g.pause()
})

$("#down").click(() => {
    g.downlineMove()

})
$("#left").click(() => {
    g.leftMove()
})
$("#right").click(() => {
    g.rightMove()
})
$("#rotate").click(() => {
    g.rotate()
})
export default {}


