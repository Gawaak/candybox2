///<reference path="EnigmaAnswer.ts"/>

import {EnigmaAnswer} from "./EnigmaAnswer";
import {Algo} from "./Algo";
import {RenderArea} from "./RenderArea.ts";

export class EnigmaAnswerStrings extends EnigmaAnswer {
    // The array of valid strings for answering
    private validStrings: string[];
    private invalidStrings: string[];

    private maxDisplayed: number

    // Constructor
    constructor(validStrings: string[] = [], invalidStrings: string[] = [], maxDisplayed = 6) {
        super();

        this.validStrings = validStrings
        this.invalidStrings = invalidStrings

        this.maxDisplayed = maxDisplayed
    }

    public isRight(answer: string): boolean {
        for (var i = 0; i < this.validStrings.length; i++) {
            if (Algo.simplifyString(answer) == this.validStrings[i]) {
                // The answer is correct
                return true;
            }
        }
        // The answer isn't correct
        return false;
    }

    public display(renderArea: RenderArea, x: number, y: number, correctClass: string, wrongClass: string) {
        let added = true
        let displayed: string[] = []
        const correctCopy = [...this.validStrings]
        const incorrectCopy = [...this.invalidStrings]

        Algo.shuffleArray(correctCopy)
        Algo.shuffleArray(incorrectCopy)

        while (added && displayed.length < this.maxDisplayed * 0.5) {
            added = false
            if (correctCopy.length > 0) {
                added = true
                const i = correctCopy.shift()
                if (i) displayed.push(i)
            }
        }
        added = true

        while (added && displayed.length < this.maxDisplayed) {
            added = false
            if (incorrectCopy.length > 0) {
                added = true
                const i = incorrectCopy.shift()
                if(i) displayed.push(i)
            }
        }

        Algo.shuffleArray(displayed)

        let offset = 0
        for (let i = 0; i < displayed.length; i++) {
            const elem = displayed[i]

            renderArea.addAsciiRealButton(` ${elem} `, x + offset, y, this.validStrings.includes(elem) ? correctClass : wrongClass)

            if(i % 3 == 2) {
                offset = 0
                y += 3
            } else {
                offset += elem.length + 4
            }
        }
    }
}
