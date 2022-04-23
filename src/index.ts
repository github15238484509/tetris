import { Square } from "./core/Square"
import { IViewer } from "./core/types"
import { SquarePagesView } from "./core/views/SquarePagesView"
import $ from "jquery"

var square = new Square()
square.viewer = new SquarePagesView(square, $("#app"))
console.log(new SquarePagesView(square, $("#app")));

console.log(square.viewer);

square.color = "red"
square.point = {
    x: 1,
    y: 2
}
$("#move").click(() => {
    square.point = {
        x: 1,
        y: square.point.y + 1
    }
})
$("#remove").click(() => {
    square.viewer?.remove()
})
$("#show").click(() => {
    square.viewer = new SquarePagesView(square, $("#app"))
})

export default {}