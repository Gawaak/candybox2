import {Game} from "./Game";
import {MainLoadingType} from "./MainLoadingType";
import {Keyboard} from "./Keyboard";
import InitAcii from "./gen/genAscii";
import InitText from "./gen/genText";
import {Saving} from "./Saving.ts";

const Main: {
    game: Game | null,
    loadingType: MainLoadingType,
    loadingString: string,
    gameMode: string,
    documentIsReady: () => void,
    reloadEverythingFromFile: (fileContent: string) => void,
} = {
    // The game
    game: null,

    // Information about loading
    loadingType: MainLoadingType.LOCAL,
    loadingString: "",

    // Information about the game mode
    gameMode: "",

    // Public functions    
    documentIsReady(): void {
        Keyboard.execute(); // Execute the Kayboard jquery stuff
        start(); // Start the game
    },

    reloadEverythingFromFile(fileContent: string): void {
        if(fileContent !== "test_store" && fileContent.length < 100) return
        // Clear intervals for the current game
        Main.game?.clearAllIntervals();
        // Set the loading type
        Main.loadingType = MainLoadingType.FILE;
        // Set the loading string
        Main.loadingString = fileContent;
        // Set the gamemode (null so that it is set from loading)
        Main.gameMode = "";
        // We can't register anymore
        // Saving.canRegister = false;
        // Finally start (this will erase the current game)
        start();
    },
}

export default Main

function start(): void {
    Main.game = new Game(Main.gameMode);
    Keyboard.setGame(Main.game);
    Saving.load(Main.game, Main.loadingType, Main.loadingString);
    Main.game.postLoad();
}

(() => {
    document.onreadystatechange = () => {
        InitAcii()
        InitText()
        Main.documentIsReady();
    }
})()