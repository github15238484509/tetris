import { Square } from "./core/Square"
import { IViewer, TShape } from "./core/types"
import { SquarePagesView } from "./core/views/SquarePagesView"
import $ from "jquery"
import { SquareGroup } from "./core/SquareGroup"


let shapArr: TShape = [{
    x: 0,
    y: -1
}, {
    x: -1,
    y: 0
}, {
    x: 0,
    y: 0
}, {
    x: 0,
    y: 1
}]
let centerPoints = {
    x: 6,
    y: 5
}
let groups = new SquareGroup(shapArr, centerPoints, "red")
groups.squares.forEach(it => it.viewer = new SquarePagesView(it, $("#app")))


$("#down").click(() => {
    groups.centerPoint = {
        x: groups.centerPoint.x,
        y: groups.centerPoint.y + 1
    }
})
$("#up").click(() => {
    groups.centerPoint = {
        x: groups.centerPoint.x,
        y: groups.centerPoint.y - 1
    }
})
$("#left").click(() => {
    groups.centerPoint = {
        x: groups.centerPoint.x - 1,
        y: groups.centerPoint.y
    }
})
$("#right").click(() => {
    groups.centerPoint = {
        x: groups.centerPoint.x + 1,
        y: groups.centerPoint.y
    }
})
export default {}