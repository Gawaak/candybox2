///<reference path="Place.ts"/>
///<reference path="main.ts"/>

import {Place} from "./Place";
import {RenderArea} from "./RenderArea";
import {Game} from "./Game";
import {Saving} from "./Saving";
import {Color} from "./Color";
import {ColorType} from "./ColorType";
import {Database} from "./Database";
import {CallbackCollection} from "./CallbackCollection";
import {LocalSaving} from "./LocalSaving";
// @ts-ignore
import $ from "jquery"
import Main from "./main.ts";

export class Save extends Place {
    // The render area
    private renderArea: RenderArea = new RenderArea();

    // The slots array used for local saving
    private slotsArray: string[] = [];

    // The currently selected slot (slot1 by default)
    private selectedSlot: string = "slot1";

    // The last local autosave minute we drew (used to refresh the page at the right time)
    private lastLocalAutosaveMinute: number | null = null;

    // Should we show the file save warning?
    private showFileSaveWarning: boolean = false;

    // The textarea content
    private fileSaveTextareaContent: string | null = null;

    // Constructor
    constructor(game: Game) {
        super(game);

        // Resize
        this.resize();

        // Create the slots array
        this.createSlotsArray();

        // Update
        this.update();
    }

    // getRenderArea()
    public getRenderArea(): RenderArea {
        return this.renderArea;
    }

    // willBeDisplayed()
    public willBeDisplayed(): void {
        // We resize (we must do this there and not in the constructor because the size depends on the translation)
        this.resize();

        // We add a callback : we will be updated every second (in order to show the correct time for the local autosave countdown)
        this.getGame().getOneSecondCallbackCollection().addCallback(this.oneSecondCallback.bind(this));
    }


    private clickedFileLoad(): void {
        Main.reloadEverythingFromFile($(".saveFileLoadTextarea").val());
    }

    private clickedFileSave(): void {
        // Save some special variables by calling the save() methods of various objects
        this.getGame().save(); // Various variables owned by the game object
        this.getGame().getPlayer().save(); // The player

        // We now show the warning
        this.showFileSaveWarning = true;

        // Reset the textarea content
        this.fileSaveTextareaContent = "";

        // Write bools
        for (var str in Saving.getAllBools()) {
            if (this.fileSaveTextareaContent != "") this.fileSaveTextareaContent += ", "; // We add a comma if we're not adding the very first variable
            this.fileSaveTextareaContent += "bool " + str + "=" + Saving.boolToString(Saving.getAllBools()[str]);
        }

        // Write numbers
        for (var str in Saving.getAllNumbers()) {
            if (this.fileSaveTextareaContent != "") this.fileSaveTextareaContent += ", "; // We add a comma if we're not adding the very first variable
            this.fileSaveTextareaContent += "number " + str + "=" + Saving.numberToString(Saving.getAllNumbers()[str]);
        }

        // Write strings
        for (var str in Saving.getAllStrings()) {
            if (this.fileSaveTextareaContent != "") this.fileSaveTextareaContent += ", "; // We add a comma if we're not adding the very first variable
            this.fileSaveTextareaContent += "string " + str + "=" + Saving.getAllStrings()[str];
        }

        // Update
        this.update();
        this.getGame().updatePlace();
    }

    private createSlotsArray(): void {
        // Reset the array
        this.slotsArray = [];

        // Fill it
        for (var i = 1; i <= 5; i++) {
            this.slotsArray.push("slot" + i.toString());
            this.slotsArray.push("Slot " + i.toString() + " (" + LocalSaving.getSlotSummaryAsString("slot" + i.toString()) + ")");
        }
    }

    private drawResetGame(_x: number, y: number): number {
        // The y we will return (will remain 0 if there's no translation to show)
        var yAdd: number = 0;

        // Add the load button
        this.renderArea.addAsciiRealButton("Reset", 48, y + yAdd + 5, "resetGameButton");
        this.renderArea.addLinkCall(".resetGameButton", new CallbackCollection(() => {
            // @ts-ignore
            clearInterval(window.saveInterval)
            localStorage.clear()
            // @ts-ignore
            if (window.ReactNativeWebView) {
                // @ts-ignore
                window.ReactNativeWebView?.postMessage("reloadPage")
            } else {
                location.reload()
            }
        }));

        // Return yAdd
        return yAdd;
    }

    private drawFileLoad(x: number, y: number): number {
        // The y we will return (will remain 0 if there's no translation to show)
        var yAdd: number = 0;

        // Title
        this.drawTitle("saveFileLoadTitle", y + yAdd);

        // Instructions
        this.renderArea.drawString(Database.getText("saveFileLoadPaste"), x, y + yAdd + 2);
        this.renderArea.drawString(Database.getTranslatedText("saveFileLoadPaste"), x, y + yAdd + 3, true);

        // Add the text area
        this.renderArea.addTextarea(x + 2, y + yAdd + 5, 50, 6, "saveFileLoadTextarea");

        // Add the load button
        this.renderArea.addAsciiRealButton(Database.getText("saveFileLoadButton"), 48, y + yAdd + 17, "saveFileLoadButton", Database.getTranslatedText("saveFileLoadButton"), true);
        this.renderArea.addLinkCall(".saveFileLoadButton", new CallbackCollection(this.clickedFileLoad.bind(this)));

        // Return yAdd
        return yAdd;
    }

    private drawFileSave(x: number, y: number): number {
        // The y we will return (will remain 0 if there's no translation to show)
        var yAdd: number = 0;

        // The title
        this.drawTitle("saveFileSaveTitle", y + yAdd);

        // The "why"
        this.renderArea.drawString(Database.getText("saveFileSaveWhy0"), x, y + yAdd + 2);
        this.renderArea.drawString(" - " + Database.getText("saveFileSaveWhy1"), x, y + yAdd + 3);
        this.renderArea.drawString(" - " + Database.getText("saveFileSaveWhy2"), x, y + yAdd + 4);
        // this.renderArea.drawString(" - " + Database.getText("saveFileSaveWhy3"), x, y+yAdd+5);
        // this.renderArea.drawString("   " + Database.getText("saveFileSaveWhy4"), x, y+yAdd+6);

        // The translated "why" (only if there's a translation)
        if (Database.isTranslated()) {
            this.renderArea.drawString(Database.getTranslatedText("saveFileSaveWhy0"), x, y + yAdd + 8, true);
            this.renderArea.drawString(" - " + Database.getTranslatedText("saveFileSaveWhy1"), x, y + yAdd + 9, true);
            this.renderArea.drawString(" - " + Database.getTranslatedText("saveFileSaveWhy2"), x, y + yAdd + 10, true);
            // this.renderArea.drawString(" - " + Database.getTranslatedText("saveFileSaveWhy3"), x, y+yAdd+11, true);
            // this.renderArea.drawString("   " + Database.getTranslatedText("saveFileSaveWhy4"), x, y+yAdd+12, true);
            yAdd += 3; // We increase yAdd by 6 because the translations took 6 lines
        }

        // Add the button
        this.renderArea.addAsciiRealButton(Database.getText("saveFileSaveButton"), 35, y + yAdd + 8, "saveFileSaveButton", Database.getTranslatedText("saveFileSaveButton"), true);
        this.renderArea.addLinkCall(".saveFileSaveButton", new CallbackCollection(this.clickedFileSave.bind(this)));

        // Add the text area
        this.renderArea.addTextarea(x + 2, y + yAdd + 11, 84, 6, "saveFileSaveTextarea", (this.fileSaveTextareaContent != null ? this.fileSaveTextareaContent : ""));

        // Should we show the warning?
        if (this.showFileSaveWarning) {
            this.drawWarning(Database.getText("saveFileSaveWarning"), x + 2, y + yAdd + 12);
            this.drawWarning(Database.getTranslatedText("saveFileSaveWarning"), x + 2, y + yAdd + 13, true);
        }

        // We return yAdd
        return yAdd;
    }

    private drawTitle(textName: string, y: number): void {
        var x: number = 50 - Math.floor((Database.getText(textName).length / 2 + 1 + Database.getTranslatedText(textName).length / 2));
        this.renderArea.drawString(Database.getText(textName), x, y);
        this.renderArea.addBold(x, x + Database.getText(textName).length, y);
        this.renderArea.drawString(Database.getTranslatedText(textName), x + Database.getText(textName).length + 1, y, true);
    }

    private drawWarning(text: string, x: number, y: number, translated: boolean = false): void {
        if (text != "") {
            this.renderArea.drawString(text, x, y, translated);
            this.renderArea.addColor(x, x + text.length, y, new Color(ColorType.SAVE_RED));
        }
    }

    private oneSecondCallback(): void {
        // If there's no last minute or it's different from the current minute
        if (this.lastLocalAutosaveMinute == null || this.lastLocalAutosaveMinute != Math.ceil(this.getGame().getLocalAutosaveTime() / 60)) {
            // We set the minute
            this.lastLocalAutosaveMinute = Math.ceil(this.getGame().getLocalAutosaveTime() / 60);
            // We update
            this.createSlotsArray();
            this.update();
            this.getGame().updatePlace();
        }
    }

    private resize(): void {
        // The size depends on if there's a translation or not
        if (Database.isTranslated())
            this.renderArea.resize(100, 72);
        else
            this.renderArea.resize(100, 82);
    }

    private selectRightSlot(): void {
        // We select the right slot
        $("#" + this.selectedSlot).prop('selected', true);
    }

    private update(): void {
        var yPosition: number = 0; // The y position where we will add things. Can be incremented sometimes, depending on the user's language..

        // Erase everything
        this.renderArea.resetAllButSize();

        // Saving
        this.renderArea.drawArray(Database.getAscii("text/Saving"), 50 - Math.floor((Database.getAsciiWidth("text/Saving") / 2)), yPosition);
        // yPosition += this.drawLocalSave(0, yPosition+7);
        yPosition += this.drawFileSave(0, yPosition + 11);

        // Loading
        this.renderArea.drawArray(Database.getAscii("text/Loading"), 50 - Math.floor((Database.getAsciiWidth("text/Loading") / 2)), yPosition + 36);
        yPosition += this.drawFileLoad(0, yPosition + 45);


        this.renderArea.drawArray(Database.getAscii("text/DangerZone"), 50 - Math.floor((Database.getAsciiWidth("text/DangerZone") / 2)), yPosition + 70);
        yPosition += this.drawResetGame(0, yPosition + 75);

        // Add the link which will call the selectRightSlot method after the html dom is created
        this.renderArea.addLinkCallbackCollection(new CallbackCollection(this.selectRightSlot.bind(this)));
    }
}
