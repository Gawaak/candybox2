import {StatusBar} from "./StatusBar";
import {CallbackCollection} from "./CallbackCollection";
import {RenderArea} from "./RenderArea";
import {Color} from "./Color";
import {ColorType} from "./ColorType";
import {StatusBarTabType} from "./StatusBarTabType";

export class StatusBarTab {
    // The status bar
    private statusBar: StatusBar;

    // The type
    private type: StatusBarTabType;

    // The text of the tab (an array of three strings)
    private text: string[] = [];

    // Tab index to give to the status bar when we're selected by the player
    private tabIndexWhenSelected: number;

    // Callback collection to call when we're selected by the user
    private callbackCollectionWhenSelected: CallbackCollection;

    // The width of the tab (calculated from the text)
    private width: number = 0;

    // The x position of the tab
    private yPos: number;

    // Constructor
    constructor(statusBar: StatusBar, type: StatusBarTabType, yPos: number, text1: string, text2: string, text3: string, tabIndexWhenSelected: number = -1, callbackCollectionWhenSelected: CallbackCollection = new CallbackCollection()) {
        // Set the status bar
        this.statusBar = statusBar;

        // Set teh type
        this.type = type;

        // Set yPos
        this.yPos = yPos;

        // Add the three strings to our 3 strings array
        this.setText(text1, text2, text3);

        // Set the rest
        this.tabIndexWhenSelected = tabIndexWhenSelected;
        this.callbackCollectionWhenSelected = callbackCollectionWhenSelected;
    }

    // Public methods
    public clicked(): void {
        this.callbackCollectionWhenSelected.fire();
        this.statusBar.selectTab(this.tabIndexWhenSelected);
    }

    public render(renderArea: RenderArea, x: number, width: number, y: number, selected: boolean): void {
        // We draw the text
        renderArea.drawString(this.text.filter(i => i.length > 0).join(" "), x, y + this.yPos)
        if (selected) {
            renderArea.addBackgroundColor(x - 1, width + 2, y + this.yPos, new Color(ColorType.STATUS_BAR_SELECTED_TAB, false));
        }


        renderArea.drawString("+", 0, y + this.yPos - 1);
        renderArea.drawString("+", renderArea.getWidth() - 1, y + this.yPos - 1);

        renderArea.drawString("|", 0, y + this.yPos);
        renderArea.drawString("|", renderArea.getWidth() - 1, y + this.yPos);

        renderArea.drawHorizontalLine("-", 1, 0, y + this.yPos - 1);
        renderArea.drawHorizontalLine("-", 1, renderArea.getWidth() - 1, y + this.yPos - 1);


        renderArea.drawString("+", 0, y + this.yPos + 1);
        renderArea.drawString("+", renderArea.getWidth() - 1, y + this.yPos + 1);

        renderArea.drawHorizontalLine("-", 1, 0, y + this.yPos + 1);
        renderArea.drawHorizontalLine("-", 1, renderArea.getWidth() - 1, y + this.yPos + 1);

        // If the tab isn't selected, we add a button to click it !
        if (selected == false) {
            renderArea.addMultipleAsciiButtons("statusBarTabButton" + this.tabIndexWhenSelected,
                x, x + width - 1, y + this.yPos)
            renderArea.addLinkCall(".statusBarTabButton" + this.tabIndexWhenSelected, new CallbackCollection(this.clicked.bind(this)));
        }
    }

    // Public getters
    public getType(): StatusBarTabType {
        return this.type;
    }

    public getWidth(): number {
        return this.width;
    }

    // Private methods
    private calculateWidth(): void {
        this.width = 0;

        for (var i = 0; i < 3; i++) {
            if (this.text[i].length > this.width)
                this.width = this.text[i].length;
        }

        // We add two ! (because a tab has two spaces on left and right
        this.width += 2;
    }

    private setText(text1: string, text2: string, text3: string): void {
        // We empty the text array
        this.text = [];

        // We add the three strings given in parameters
        this.text.push(text1);
        this.text.push(text2);
        this.text.push(text3);

        // We re-calculate the tab's width
        this.calculateWidth();
    }
}
