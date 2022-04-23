import { Point, IViewer } from "./types";

export class Square {

    private _point: Point = {
        x: 0,
        y: 0
    }
    get point(): Point {
        return this._point
    }
    set point(value: Point) {
        this._point = value
        if (this._viewer) {
            this._viewer.show()
        }
    }

    private _colot: string = ""
    get color() {
        return this._colot
    }
    set color(value: string) {
        this._colot = value
    }

    private _viewer?: IViewer

    get viewer() {
        return this._viewer
    }
    set viewer(value) {
        this._viewer = value
        if (value?.show) {
            value.show()
        }
    }
}