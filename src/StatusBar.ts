// Saving stuff related to the status bar itself
import {Saving} from "./Saving";
import {Bar} from "./Bar";
import {RenderArea} from "./RenderArea";
import {Game} from "./Game";
import {BarType} from "./BarType";
import {CallbackCollection} from "./CallbackCollection";
import {StatusBarTab} from "./StatusBarTab";
import {StatusBarTabType} from "./StatusBarTabType";
import StringMethods from "./StringMethods.ts";

const formatter = Intl.NumberFormat('en', {notation: 'compact'})

Saving.registerBool("statusBarUnlocked", false);

// Saving stuff related to unlocked tabs
Saving.registerBool("statusBarUnlockedCfg", false);
Saving.registerBool("statusBarUnlockedSave", false);
Saving.registerBool("statusBarUnlockedMap", false);
Saving.registerBool("statusBarUnlockedInventory", false);
Saving.registerBool("statusBarUnlockedLollipopFarm", false);
Saving.registerBool("statusBarUnlockedCauldron", false);
Saving.registerBool("statusBarUnlockedInsideYourBox", false);
Saving.registerBool("statusBarUnlockedTheComputer", false);
Saving.registerBool("statusBarUnlockedTheArena", false);

// Saving stuff for the unlocked health bar
Saving.registerBool("statusBarUnlockedHealthBar", false);

// The corner step
Saving.registerNumber("statusBarCornerStep", 0);

export class StatusBar {
    // Render areas
    private playerHealthBar: Bar | null = null;
    private renderArea: RenderArea = new RenderArea(16, 29, " ");

    // The game
    private game: Game;

    // Tabs
    private tabs: StatusBarTab[] = [];

    // The selected tab
    private selectedTabIndex: number; // -1 if not tab selected

    // Constructor
    constructor(game: Game, selectedTabIndex: number) {
        // Se the game
        this.game = game;

        // Set the default selected tab index
        this.selectedTabIndex = selectedTabIndex;

        // Add everything for the first time
        this.deleteAndReAddEverything();
    }

    // Public methods
    public deleteAndReAddEverything(): void {
        // Delete tabs
        this.tabs = [];

        // Reset special hotkeys
        this.game.resetSpecialHotkeys();

        // Delete the player health bar
        this.playerHealthBar = null;

        // Add the player health bar
        if (Saving.loadBool("statusBarUnlockedHealthBar")) {
            this.playerHealthBar = new Bar(BarType.HEALTH);
            this.playerHealthBar.resize(16, 1);
        }

        // Add tabs
        if (Saving.loadBool("statusBarUnlocked")) this.addTab(StatusBarTabType.CANDY_BOX, 13, "", "   CANDY", "BOX", new CallbackCollection(this.game.goToCandyBox.bind(this.game)));
        if (Saving.loadBool("statusBarUnlockedInventory")) this.addTab(StatusBarTabType.INVENTORY, 15, "   INVENTORY", "", "", new CallbackCollection(this.game.goToInventory.bind(this.game)));
        if (Saving.loadBool("statusBarUnlockedMap")) this.addTab(StatusBarTabType.MAP, 17, "", "      MAP", "", new CallbackCollection(this.game.goToMap.bind(this.game)));
        if (Saving.loadBool("statusBarUnlockedLollipopFarm")) this.addTab(StatusBarTabType.FARM, 19, "LOLLIPOP", "FARM", "", new CallbackCollection(this.game.goToLollipopFarm.bind(this.game)));
        if (Saving.loadBool("statusBarUnlockedCauldron")) this.addTab(StatusBarTabType.CAULDRON, 21, "", "  CAULDRON", "", new CallbackCollection(this.game.goToCauldron.bind(this.game)));
        if (Saving.loadBool("statusBarUnlockedInsideYourBox")) this.addTab(StatusBarTabType.INSIDE_YOUR_BOX, 23, " ", "YOUR", " BOX!", new CallbackCollection(this.game.goToInsideYourBox.bind(this.game)));
        // if (Saving.loadBool("statusBarUnlockedTheComputer")) this.addTab(StatusBarTabType.THE_COMPUTER,0, "THE", " COMPUTER", "", new CallbackCollection(this.game.goToTheComputer.bind(this.game)));
        // if(Saving.loadBool("statusBarUnlockedTheArena")) this.addTab(StatusBarTabType.THE_ARENA,0, " THE", "ARENA", " /!\\", new CallbackCollection(this.game.goToTheArena.bind(this.game)));
        if (Saving.loadBool("statusBarUnlockedSave")) this.addTab(StatusBarTabType.SAVE, 25, "", "     SAVE", "", new CallbackCollection(this.game.goToSave.bind(this.game)));
        if (Saving.loadBool("statusBarUnlockedCfg")) this.addTab(StatusBarTabType.CFG, 27, "    CONFIG", "", "", new CallbackCollection(this.game.goToCfg.bind(this.game)));
    }

    public selectTab(index: number): void {
        this.selectedTabIndex = index;
        this.game.updateStatusBar();
    }

    public selectTabByType(type: StatusBarTabType): void {
        for (var i = 0; i < this.tabs.length; i++) {
            // If this is the tab we're searching for
            if (this.tabs[i].getType() == type) {
                // We select it and we break
                this.selectedTabIndex = i;
                this.game.updateStatusBar();
            }
        }
    }

    private drawLine(y: number, edge: string = "+", line: string = "-") {
        this.renderArea.drawString(edge, 0, y);
        this.renderArea.drawString(edge, this.renderArea.getWidth() - 1, y);

        this.renderArea.drawHorizontalLine(line, 1, this.renderArea.getWidth() - 1, y);
    }

    private drawAround(y: number) {
        this.drawLine(y - 1)
        this.renderArea.drawString("|", 0, y)
        this.renderArea.drawString("|", this.renderArea.getWidth() - 1, y)
        this.drawLine(y + 1)
    }

    public updateAll() {
        // We erase
        this.renderArea.resetAllButSize();

        // We draw the borders
        if (Saving.loadBool("statusBarUnlocked")) {
            this.drawLine(0)
            this.drawLine(this.renderArea.getHeight() - 1)
        }

        // We draw the candies we have
        this.drawAround(1)
        this.renderArea.drawString(StringMethods.pad(this.game.getCandies().getCurrentAsString(), this.renderArea.getWidth()), 1, 1)

        // We draw the lollipops we have, if we had at least one at some point
        if (this.game.getLollipops().getMax() > 0) {
            this.drawAround(3)
            this.renderArea.drawString(StringMethods.pad(this.game.getLollipops().getCurrentAsString(), this.renderArea.getWidth()), 1, 3)
        }

        // We draw the chocolate bars we have, if we had at least one at some point
        if (this.game.getChocolateBars().getMax() > 0) {
            this.drawAround(5)
            this.renderArea.drawString(StringMethods.pad(this.game.getChocolateBars().getCurrentAsString(), this.renderArea.getWidth()), 1, 5)
        }

        // We draw the pains au chocolat we have, if we had at least one at some point
        if (this.game.getPainsAuChocolat().getMax() > 0) {
            this.drawAround(7)
            this.renderArea.drawString(StringMethods.pad(this.game.getPainsAuChocolat().getCurrentAsString(), this.renderArea.getWidth()), 1, 7)
        }

        // We draw the health bar
        this.updateHealthBar(9);
        // We draw tabs
        this.drawTabs();

    }

    public updateHealthBar(n: number): void {
        // We update the health bar if it isn't null
        if (this.playerHealthBar != null) {
            // We update the bar from the player's health
            this.playerHealthBar.update(this.game.getPlayer().getHp() / this.game.getPlayer().getMaxHp(), formatter.format(this.game.getPlayer().getHp()) + "/" + formatter.format(this.game.getPlayer().getMaxHp()));

            // We draw the bar
            this.renderArea.drawArea(this.playerHealthBar, 0, n + 1);
        }
    }

    // Public getters
    public getRenderArea(): RenderArea {
        return this.renderArea;
    }

    // Private methods
    private addTab(type: StatusBarTabType, yPos: number, text1: string, text2: string, text3: string, callbackCollection: CallbackCollection): void {
        // We add the tab
        this.tabs.push(new StatusBarTab(this, type, yPos, text1, text2, text3, this.tabs.length, callbackCollection));
    }

    private drawTabs(): void {
        if (Saving.loadBool("statusBarUnlocked")) {
            for (var i = this.tabs.length - 1; i >= 0; i--) {
                this.tabs[i].render(this.renderArea, 1, this.renderArea.getWidth() - 2, 0, (this.selectedTabIndex == i ? true : false));
            }
        }
    }
}