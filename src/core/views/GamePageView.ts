import { SquareGroup } from "../SquareGroup";
import { GameViewer } from "../types";
import { SquarePagesView } from "./SquarePagesView";
import $ from "jquery"
export class  GamePageView implements GameViewer{
    showNext(tetris: SquareGroup): void {
        tetris.squares.forEach(it => it.viewer = new SquarePagesView(it, $("#next")))
    }
    switch(tetris: SquareGroup): void {
        tetris.squares.forEach(it => it.viewer = new SquarePagesView(it, $("#panel")))
    }
}