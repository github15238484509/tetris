import { SquareGroup } from "../SquareGroup";
import { GameViewer } from "../types";
import { SquarePagesView } from "./SquarePagesView";
import $ from "jquery"
import { Game } from "../Game";
import GameConfig from "../GameConfig";
import PageConfig from "./PageConfig";
export class GamePageView implements GameViewer {
    private panel = $("#panel")
    private nextPanel = $("#nextPanel")
    private score = $("#score")
    private mes = $(".mes")
    private mesp = $(".mes p")
    init(game: Game): void {
        this.panel.css({
            width: GameConfig.panelSize.width * PageConfig.square.width,
            height: GameConfig.panelSize.height * PageConfig.square.height
        })
        this.nextPanel.css({
            width: GameConfig.nextSize.width * PageConfig.square.width,
            height: GameConfig.nextSize.height * PageConfig.square.height
        })
    }
    onPause(): void {
        this.mes.css({
            display: 'flex'
        })
        this.mesp.html("游戏暂停了")
    }
    onStart(): void {
        this.mes.css({
            display: 'none'
        })
    }
    onOver(): void {
        this.mes.css({
            display: 'flex'
        })
        this.mesp.html("游戏结束了")
    }
    onScoreChange(score: number): void {
        this.score.html(score.toString())
    }
    showNext(tetris: SquareGroup): void {
        tetris.squares.forEach(it => {
            it.viewer = new SquarePagesView(it, this.nextPanel)
        })
    }
    switch(tetris: SquareGroup): void {
        tetris.squares.forEach(it => {
            it.viewer = new SquarePagesView(it, this.panel)
        })
    }
}