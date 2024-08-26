import {Game} from "./Game";
import {RenderArea} from "./RenderArea";
import {CallbackCollection} from "./CallbackCollection";
import {Database} from "./Database";
import {Pos} from "./Pos.ts";
// @ts-ignore
import $ from "jquery"

export class Place {
    private game: Game;

    public questLogOpened: boolean = false

    // Constructor
    constructor(game: Game) {
        this.game = game;
    }

    // Public methods
    public addBackToButton(renderArea: RenderArea, callbackCollection: CallbackCollection, text: string, translated: string, otherClass: string, y: number = 0, x: number = -1): void {
        // If the x position is under zero, we set it so that the button will be centered
        if (x < 0) {
            x = renderArea.getWidth() / 2 - text.length / 2;
        }

        renderArea.addAsciiRealButton(text, x, y + 1, otherClass, translated, true, -1, undefined, false, false, true);
        renderArea.addLinkCall("." + otherClass, callbackCollection);
    }

    public addBackToMainMapButton(renderArea: RenderArea, otherClass: string, textName: string = "buttonBackToTheMap"): void {
        this.addBackToButton(renderArea,
            new CallbackCollection(this.getGame().goToMainMap.bind(this.getGame())),
            Database.getText(textName),
            Database.getTranslatedText(textName),
            otherClass);
    }

    // Public getters
    public getDefaultScroll(): Pos {
        return new Pos(0, 0);
    }

    public getGame(): Game {
        return this.game;
    }

    public getGap(): number {
        return 0;
    }

    public getRenderArea(): RenderArea {
        return new RenderArea(); // We return a new render area, but this should not happen, since our daughter class should override this function
    }

    public getScrolling(): boolean {
        return false; // By default, we disable scrolling on the place
    }

    public willBeClosed(): void {
        this.hideSpellBar()
        this.hideQuestLog()
    }

    public willBeDisplayed(): void {
        this.hideSpellBar()
        this.hideQuestLog()
    }

    public willStopBeingDisplayed(): void {
    }

    public showSpellBar(): void {
        $("body").addClass("showSpells")
        $("body").removeClass("hideSpells")
    }

    public hideSpellBar(): void {
        $("body").addClass("hideSpells")
        $("body").removeClass("showSpells")
    }

    public showQuestLog(): void {
        $("#questLogContainer").css("display", "block")
        $("#questLogContainer").css("height", this.questLogOpened ? "18svh" : "3svh")
    }

    public hideQuestLog(): void {
        $("#questLogContainer").css("display", "none")
    }

}
