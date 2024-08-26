///<reference path="TheCavePattern.ts"/>

import {Saving} from "./Saving";
import {TheCave} from "./TheCave";
import {RenderArea} from "./RenderArea";
import {Database} from "./Database";
import {CallbackCollection} from "./CallbackCollection";
import {TheCavePattern} from "./TheCavePattern";

Saving.registerBool("TheCavePattern_ChocolateBarNowGotTheBar", false);

export class TheCavePattern_ChocolateBarNow extends TheCavePattern {
    // Did we clicked to get the bar?
    private gotTheBar: boolean = false;

    // Constructor
    constructor(theCave: TheCave) {
        super(theCave);
    }

    // Public methods
    public draw(renderArea: RenderArea, x: number, y: number): void {
        // If we didn't pick the bar yet
        if (this.gotTheBar == false) {
            // Draw the bar ascii art
            renderArea.drawArray(Database.getAscii("places/theCave/chocolateBar"), x + 40, y + 25);
            // Draw the button over the plug
            renderArea.addMultipleAsciiButtons("theCavePattern_ChocolateBarNowButton", x + 40, x + 57, y + 26, x + 40, x + 57, y + 27);
            // Add the button link
            renderArea.addLinkCall(".theCavePattern_ChocolateBarNowButton", new CallbackCollection(this.getTheBar.bind(this)));
        }
    }

    public ended(): boolean {
        return true;
    }

    public getSentence(): string {
        // If we didn't pick the bar yet, we return the sentence
        if (this.gotTheBar == false) {
            return "theCavePattern_ChocolateBarNowSeeChocolateBar";
        }

        // Else, we return null
        return "";
    }

    // Private methods
    private getTheBar(): void {
        if (this.gotTheBar) return

        // Get the bar
        this.getTheCave().getGame().getChocolateBars().add(1);
        this.gotTheBar = true;

        // We can't get the bar anymore (we can't start this pattern)
        Saving.saveBool("TheCavePattern_ChocolateBarNowGotTheBar", true);

        // Ask the cave for an update
        this.getTheCave().aPatternNeedsUpdating();
    }
}