import { IPoint, IViewer } from "./types";

export class Square {

    private _point: IPoint = {
        x: 0,
        y: 0
    }
    get point(): IPoint {
        return this._point
    }
    set point(value: IPoint) {
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

    set viewer(value: IViewer) {
        this._viewer = value
    }
}