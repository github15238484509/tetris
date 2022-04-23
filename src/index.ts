import { Square } from "./core/Square"
import { IViewer } from "./core/types"

class ViewerConsole implements IViewer {
    constructor(private square: Square) {
    }
    show() {
        console.log(123, this.square);
    }
    remove() {

    }
}

var square = new Square()
square.viewer = new ViewerConsole(square)
square.point = {
    x: 12,
    y: 13
}



export default {}