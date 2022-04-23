import { Square } from "../Square";
import { IViewer } from "../types";
import PageConfig from "./PageConfig";
import $ from "jquery"

export class SquarePagesView implements IViewer {
    private dom?: JQuery<HTMLElement>
    private isMove = false
    constructor(private square: Square, private container: JQuery<HTMLElement>) {

    }
    show() {
        if (this.isMove) {
            return
        }
        if (!this.dom) {
            this.dom = $("<div>").css({
                position: 'absolute',
                width: PageConfig.square.width + 'px',
                height: PageConfig.square.height + 'px',
                border: '1px solid #ccc',
                boxSizing: 'border-box'
            })
        }
        this.dom.css({
            left: PageConfig.square.width * this.square.point.x + 'px',
            top: PageConfig.square.width * this.square.point.y + 'px',
            backgroundColor: this.square.color
        }).appendTo(this.container)
    }
    remove() {
        if (this.dom && !this.isMove) {
            this.dom.remove()
            this.isMove = true
        }
    }
}